import os
import json
import pickle
import numpy as np
import pandas as pd

class KrishiSarathiPredictionEngine:
    def __init__(self, model_dir=None):
        if model_dir is None:
            model_dir = os.path.dirname(os.path.abspath(__file__))
            # Fallback path if loaded locally inside inference
            if not os.path.exists(os.path.join(model_dir, "model.pkl")):
                model_dir = os.path.join(os.path.dirname(model_dir), "models", "production")
                
        self.model_path = os.path.join(model_dir, "model.pkl")
        self.prep_path = os.path.join(model_dir, "preprocessor.pkl")
        
        with open(self.model_path, "rb") as f:
            self.model = pickle.load(f)
        with open(self.prep_path, "rb") as f:
            self.preprocessor = pickle.load(f)
            
        with open(os.path.join(model_dir, "feature_order.json"), "r") as f:
            self.feature_order = json.load(f)
            
    def get_confidence_band(self, prob):
        if prob >= 0.80:
            return "Very High"
        elif prob >= 0.65:
            return "High"
        elif prob >= 0.50:
            return "Moderate"
        elif prob >= 0.30:
            return "Low"
        else:
            return "Very Low"
            
    def predict(self, query: dict):
        warnings = []
        
        # 1. Bounds checks and input validation
        pH = query.get("pH", 7.0)
        if pH < 0 or pH > 14:
            warnings.append(f"Invalid soil pH value '{pH}' corrected to default neutral 7.0.")
            pH = 7.0
            
        # Nutrients non-negative check
        for n in ["N", "P", "K"]:
            val = query.get(n, 50.0)
            if val < 0:
                warnings.append(f"Negative nutrient value '{n}' corrected to baseline median.")
                query[n] = float(self.preprocessor.medians[n])
                
        # Unknown location fallback
        district = query.get("District", "Pune").strip().title()
        if district not in self.preprocessor.district_categories:
            warnings.append(f"Location district '{district}' is outside Pune Division. Recommendations default to state average medians.")
            district = "Pune"
            
        # Fill in missing query fields with preprocessor medians
        for col in self.preprocessor.numeric_cols:
            if col not in query:
                # Add default median
                query[col] = float(self.preprocessor.medians.get(col, 0.0))
                
        # Add categoricals if missing
        if "Soil_Color" not in query:
            query["Soil_Color"] = "Black"
        if "Growing_Season" not in query:
            query["Growing_Season"] = "Kharif"
        if "OC_Class" not in query:
            query["OC_Class"] = "High"
            
        query["District"] = district
        
        # 2. Preprocess
        df_query = pd.DataFrame([query])
        X_query = self.preprocessor.transform(df_query)
        
        # 3. Model Predict Proba
        proba = self.model.predict_proba(X_query)[0]
        top_classes = np.argsort(proba)[::-1][:3]
        
        predictions = []
        for rank, idx in enumerate(top_classes):
            crop_name = self.preprocessor.crop_decoder[idx]
            confidence = proba[idx]
            predictions.append({
                "rank": rank + 1,
                "crop": crop_name,
                "confidence_score": round(float(confidence), 4),
                "confidence_band": self.get_confidence_band(confidence),
                "suggested_season": "Rabi" if crop_name in ["Wheat", "Chickpea", "Gram"] else "Kharif",
                "water_requirement": "High" if crop_name in ["Sugarcane", "Rice"] else "Medium" if crop_name in ["Wheat", "Cotton"] else "Low"
            })
            
        # 4. Heuristic explainability based on numeric boundaries
        top_crop = predictions[0]["crop"]
        reasons = []
        # Check pH
        if 6.0 <= query["pH"] <= 7.5:
            reasons.append("soil pH is in the optimal neutral range")
        elif query["pH"] < 6.0:
            reasons.append("soil exhibits acidic properties suitable for tuber growth")
        else:
            reasons.append("alkalinity level is tolerable for this crop type")
            
        # Check nutrients
        if query["N"] > 70:
            reasons.append("available nitrogen is highly adequate for green leafy development")
        if query["P"] > 40:
            reasons.append("phosphorus matches root structure propagation guidelines")
        if query["Rainfall"] > 800:
            reasons.append("seasonal monsoon rainfall meets heavy water absorption footprints")
        else:
            reasons.append("precipitation averages support low-moisture drought tolerance")
            
        explanation = f"{top_crop} is recommended because " + ", ".join(reasons) + "."
        
        return {
            "predictions": predictions,
            "explanation": explanation,
            "warnings": warnings,
            "alternative_crops": [p["crop"] for p in predictions[1:]]
        }
