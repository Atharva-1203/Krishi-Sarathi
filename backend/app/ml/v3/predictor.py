"""Version 3.1 crop predictor with OOD detection, profile matching, and explainability."""

import os
import pickle
import json
import numpy as np
import pandas as pd
from backend.app.ml.v3.feature_builder import V3FeatureBuilder
from backend.app.ml.v3.feature_contract import FEATURES
from backend.app.ml.v3.profile_matcher import profile_matcher
from backend.app.ml.v3.validator import validate_inputs

EXPECTED_FEATURES = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall"
]
assert FEATURES == EXPECTED_FEATURES, f"Feature contract ordering mismatch! Got {FEATURES}, expected {EXPECTED_FEATURES}"

class V3Predictor:
    def __init__(self, model_dir=r"d:\Techrush\ml\models\v3"):
        self.model_dir = model_dir
        self.model = None
        self.preprocessor = None
        self.metadata = None
        self.classes = None

    def load(self):
        """Loads model, preprocessor, and metadata from the V3 directory."""
        model_path = os.path.join(self.model_dir, "model.pkl")
        prep_path = os.path.join(self.model_dir, "preprocessor.pkl")
        meta_path = os.path.join(self.model_dir, "metadata.json")

        if not (os.path.exists(model_path) and os.path.exists(prep_path) and os.path.exists(meta_path)):
            raise FileNotFoundError(f"V3 model artifacts not found under {self.model_dir}. Please run the training pipeline first.")

        with open(model_path, "rb") as f:
            self.model = pickle.load(f)

        with open(prep_path, "rb") as f:
            self.preprocessor = pickle.load(f)

        with open(meta_path, "r", encoding="utf-8") as f:
            self.metadata = json.load(f)

        if hasattr(self.model, "feature_importances_"):
            self.metadata["feature_importances"] = {
                feat: float(imp) for feat, imp in zip(FEATURES, self.model.feature_importances_)
            }

        self.classes = self.metadata["classes"]

    def check_ood(self, features_dict: dict) -> tuple:
        """
        Inspects inputs against training bounds.
        Returns:
            ood_status (str): "NORMAL", "CAUTION", or "OUT_OF_DISTRIBUTION"
            warnings (list): list of string warnings
        """
        ood_status = "NORMAL"
        warnings = []
        bounds = self.metadata.get("feature_bounds", {})

        for feat in FEATURES:
            val = features_dict[feat]
            feat_bounds = bounds.get(feat, {})
            if not feat_bounds:
                continue

            f_min = feat_bounds["min"]
            f_max = feat_bounds["max"]
            f_p01 = feat_bounds["p01"]
            f_p99 = feat_bounds["p99"]

            # Out of distribution checks
            if val < f_min or val > f_max:
                ood_status = "OUT_OF_DISTRIBUTION"
                warnings.append(f"Feature '{feat}' value {val:.2f} is outside the validated training range [{f_min:.2f}, {f_max:.2f}].")
            elif val < f_p01 or val > f_p99:
                if ood_status != "OUT_OF_DISTRIBUTION":
                    ood_status = "CAUTION"
                warnings.append(f"Feature '{feat}' value {val:.2f} is in the extreme tail of the training distribution [p01: {f_p01:.2f}, p99: {f_p99:.2f}].")

        return ood_status, warnings

    def calculate_sensitivity(self, clean_features: dict, top_crop: str) -> list:
        """
        Perturbs each feature independently by +/- 10% and measures average absolute change in top crop probability.
        Uses vectorized batch predictions to minimize DataFrame construction overhead.
        """
        batch = [clean_features.copy()]
        feat_order = []
        
        for feat in FEATURES:
            val = clean_features[feat]
            perturbations = [val * 0.9, val * 1.1] if val != 0 else [-1.0, 1.0]
            
            for p_val in perturbations:
                p_feat = clean_features.copy()
                p_feat[feat] = p_val
                batch.append(p_feat)
                feat_order.append((feat, p_val))
                
        # Run batch prediction in a single vectorized step
        batch_df = pd.DataFrame(batch)[FEATURES]
        batch_scaled = self.preprocessor.transform(batch_df)
        batch_proba = self.model.predict_proba(batch_scaled)
        
        crop_idx = self.classes.index(top_crop.lower())
        base_prob = batch_proba[0][crop_idx]
        
        # Parse results
        deltas = {}
        for idx, (feat, p_val) in enumerate(feat_order):
            p_prob = batch_proba[idx + 1][crop_idx]
            delta = abs(p_prob - base_prob)
            if feat not in deltas:
                deltas[feat] = []
            deltas[feat].append(delta)
            
        sensitivity_results = []
        for feat in FEATURES:
            avg_delta = float(np.mean(deltas[feat]))
            sensitivity_results.append({
                "feature": feat,
                "impact": round(avg_delta, 4)
            })
            
        return sorted(sensitivity_results, key=lambda x: x["impact"], reverse=True)

    def get_why_not_explanation(self, clean_features: dict, top_crop: str, alternative_crops: list) -> list:
        """
        Compares alternative crops with the top crop and highlights the primary limiting factor for each.
        """
        why_not_list = []
        
        for alt_crop in alternative_crops:
            alt_match = profile_matcher.match_field(clean_features, alt_crop)
            if not alt_match:
                continue
                
            compatibilities = alt_match["feature_compatibilities"]
            # Find the feature with the lowest compatibility
            limiting_feat = min(compatibilities.keys(), key=lambda k: compatibilities[k]["compatibility"])
            limiting_details = compatibilities[limiting_feat]
            
            why_not_list.append({
                "crop": alt_crop,
                "overall_compatibility": alt_match["overall_compatibility"],
                "limiting_feature": limiting_feat,
                "limiting_feature_compatibility": limiting_details["compatibility"],
                "limiting_feature_median": limiting_details["crop_median"],
                "limiting_feature_input": limiting_details["input"],
                "reason": f"Although other parameters fit, the {limiting_feat} level (input: {limiting_details['input']:.1f}, crop median: {limiting_details['crop_median']:.1f}) is a significant limiting factor."
            })
            
        return why_not_list

    def generate_natural_explanation(self, clean_features: dict, top_crop: str, prob: float, scorecard: dict) -> str:
        """
        Dynamically generates natural language reasoning based on statistical features.
        """
        features_detail = scorecard["feature_compatibilities"]
        
        # Sort features by compatibility
        sorted_feats = sorted(FEATURES, key=lambda f: features_detail[f]["compatibility"])
        weakest = sorted_feats[0]
        strongest = sorted_feats[-1]
        
        prob_pct = int(prob * 100)
        overall_comp = int(scorecard["overall_compatibility"] * 100)
        
        explanation = (
            f"{top_crop} ranks #1 with a {prob_pct}% model probability and {overall_comp}% overall statistical profile similarity. "
            f"The strongest supporting parameter is {strongest} (compatibility: {int(features_detail[strongest]['compatibility'] * 100)}%). "
            f"The main limiting parameter is {weakest} (compatibility: {int(features_detail[weakest]['compatibility'] * 100)}%), "
            f"which deviates from the typical historical crop median of {features_detail[weakest]['crop_median']:.1f}."
        )
        return explanation

    def predict(self, query: dict) -> dict:
        """Runs the upgraded prediction pipeline end-to-end on a query payload."""
        if self.model is None or self.preprocessor is None:
            self.load()

        # Parse inputs
        clean_features = V3FeatureBuilder.build_features(query)
        
        # Validate inputs
        bounds = self.metadata.get("feature_bounds", {})
        val_res = validate_inputs(clean_features, bounds)
        if not val_res["valid"]:
            return val_res
        
        # Check OOD status
        ood_status, warnings = self.check_ood(clean_features)

        # Scale features
        df_query = pd.DataFrame([clean_features])[FEATURES]
        df_scaled = self.preprocessor.transform(df_query)

        # Run inference
        proba = self.model.predict_proba(df_scaled)[0]

        # Assert probability validation
        prob_sum = float(np.sum(proba))
        if abs(prob_sum - 1.0) >= 1e-6:
            raise ValueError(f"Inference error: Probability sum violation ({prob_sum:.8f}).")
        if any(p < -1e-9 or p > 1.00000001 for p in proba):
            raise ValueError(f"Inference error: Probability boundary violation (probabilities must be between 0 and 1).")
        proba = np.clip(proba, 0.0, 1.0)
        proba = proba / np.sum(proba) # Re-normalize just in case of tiny float offsets

        # Class predictions
        sorted_indices = np.argsort(proba)[::-1]
        top_recommendations = []
        seen_crops = set()

        # Return Top-5
        for rank, idx in enumerate(sorted_indices[:5]):
            crop_name = self.classes[idx].capitalize()
            prob = float(proba[idx])
            if crop_name in seen_crops:
                raise ValueError(f"Inference error: Duplicate crop '{crop_name}' recommended.")
            seen_crops.add(crop_name)
            top_recommendations.append({
                "rank": rank + 1,
                "crop": crop_name,
                "probability": round(prob, 4)
            })

        # Top crop details
        top_crop = top_recommendations[0]["crop"]
        top_prob = top_recommendations[0]["probability"]

        # 1. Compute robust scorecard for the top crop
        scorecard = profile_matcher.match_field(clean_features, top_crop)

        # 2. Local sensitivity analysis
        sensitivity = self.calculate_sensitivity(clean_features, top_crop)

        # 3. Why Not Alternative crops explanation
        alternatives = [rec["crop"] for rec in top_recommendations[1:5]]
        why_not = self.get_why_not_explanation(clean_features, top_crop, alternatives)

        # 4. Uncertainty & Entropy Calculation
        eps = 1e-15
        entropy = -float(np.sum(proba * np.log2(proba + eps)))
        if entropy < 1.0:
            entropy_status = "Very high prediction concentration (Strong model consensus)"
        elif entropy < 2.0:
            entropy_status = "Moderate prediction concentration (Clear preference)"
        else:
            entropy_status = "Low prediction concentration (Distributed model uncertainty)"

        if top_prob >= 0.75:
            confidence_level = "VERY HIGH CONFIDENCE"
        elif top_prob >= 0.50:
            confidence_level = "HIGH CONFIDENCE"
        elif top_prob >= 0.30:
            confidence_level = "MODERATE CONFIDENCE"
        else:
            confidence_level = "LOW CONFIDENCE"

        # 5. Dynamic text explanation
        natural_exp = self.generate_natural_explanation(clean_features, top_crop, top_prob, scorecard)

        # 6. Generate comparison matrix table for all top 5 crops
        comparison_matrix = {}
        for rec in top_recommendations:
            crop_name = rec["crop"]
            match = profile_matcher.match_field(clean_features, crop_name)
            if match:
                comparison_matrix[crop_name] = {
                    "overall": match["overall_compatibility"],
                    "features": {f: match["feature_compatibilities"][f]["compatibility"] for f in FEATURES}
                }

        # Determine limiting parameters: features where compatibility is less than 0.70
        limiting_params = [
            feat for feat in FEATURES 
            if scorecard["feature_compatibilities"][feat]["compatibility"] < 0.70
        ]

        return {
            "status": "success",
            "model_version": "V3.1",
            "top_recommendations": top_recommendations,
            "ood": ood_status != "NORMAL",
            "ood_status": ood_status,
            "warnings": warnings,
            "scorecard": scorecard,
            "sensitivity": sensitivity,
            "why_not": why_not,
            "entropy": round(entropy, 4),
            "entropy_status": entropy_status,
            "confidence_level": confidence_level,
            "explanation": {
                "natural_text": natural_exp,
                "supporting_parameters": scorecard["feature_compatibilities"],
                "limiting_parameters": limiting_params,
            },
            "comparison_matrix": comparison_matrix
        }

# Global predictor instance
v3_predictor = V3Predictor()
