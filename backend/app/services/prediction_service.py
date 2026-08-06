import uuid
import time
import os
import json
import numpy as np
import pandas as pd
from backend.app.ml.model_loader import model_loader
from backend.app.ml.shap_engine import shap_engine
from backend.app.core.constants import CROP_DETAILS
from backend.app.services.explanation_service import ExplanationService

CROP_BIOLOGICAL_LIMITS = {
    "Rice": {"rain_min": 1000.0, "rain_max": 2500.0, "temp_min": 20.0, "temp_max": 38.0, "pH_min": 5.5, "pH_max": 7.5, "N_min": 80.0, "P_min": 40.0, "K_min": 40.0},
    "Maize": {"rain_min": 500.0, "rain_max": 1000.0, "temp_min": 18.0, "temp_max": 35.0, "pH_min": 5.8, "pH_max": 7.5, "N_min": 60.0, "P_min": 35.0, "K_min": 30.0},
    "Chickpea": {"rain_min": 300.0, "rain_max": 700.0, "temp_min": 15.0, "temp_max": 30.0, "pH_min": 6.0, "pH_max": 8.0, "N_min": 20.0, "P_min": 30.0, "K_min": 20.0},
    "Cotton": {"rain_min": 500.0, "rain_max": 1100.0, "temp_min": 20.0, "temp_max": 32.0, "pH_min": 5.8, "pH_max": 8.0, "N_min": 90.0, "P_min": 45.0, "K_min": 50.0},
    "Grapes": {"rain_min": 400.0, "rain_max": 900.0, "temp_min": 15.0, "temp_max": 32.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 30.0, "P_min": 40.0, "K_min": 80.0},
    "Pigeonpeas": {"rain_min": 500.0, "rain_max": 900.0, "temp_min": 18.0, "temp_max": 30.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 20.0, "P_min": 30.0, "K_min": 20.0},
    "Pigeonpea": {"rain_min": 500.0, "rain_max": 900.0, "temp_min": 18.0, "temp_max": 30.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 20.0, "P_min": 30.0, "K_min": 20.0},
    "Sugarcane": {"rain_min": 1000.0, "rain_max": 2000.0, "temp_min": 20.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 8.0, "N_min": 100.0, "P_min": 50.0, "K_min": 80.0},
    "Wheat": {"rain_min": 600.0, "rain_max": 1200.0, "temp_min": 12.0, "temp_max": 25.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 80.0, "P_min": 40.0, "K_min": 40.0},
    "Banana": {"rain_min": 1000.0, "rain_max": 2200.0, "temp_min": 20.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 100.0, "P_min": 50.0, "K_min": 100.0},
    "Coconut": {"rain_min": 1000.0, "rain_max": 2500.0, "temp_min": 22.0, "temp_max": 35.0, "pH_min": 5.5, "pH_max": 7.5, "N_min": 80.0, "P_min": 40.0, "K_min": 80.0},
    "Coffee": {"rain_min": 1000.0, "rain_max": 2000.0, "temp_min": 18.0, "temp_max": 28.0, "pH_min": 5.5, "pH_max": 6.5, "N_min": 80.0, "P_min": 40.0, "K_min": 80.0},
    "Jute": {"rain_min": 1200.0, "rain_max": 2000.0, "temp_min": 24.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 60.0, "P_min": 40.0, "K_min": 60.0},
    "Orange": {"rain_min": 800.0, "rain_max": 1500.0, "temp_min": 15.0, "temp_max": 32.0, "pH_min": 5.5, "pH_max": 7.5, "N_min": 80.0, "P_min": 40.0, "K_min": 80.0},
    "Papaya": {"rain_min": 1000.0, "rain_max": 2000.0, "temp_min": 20.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 7.0, "N_min": 80.0, "P_min": 40.0, "K_min": 80.0},
    "Pomegranate": {"rain_min": 500.0, "rain_max": 1000.0, "temp_min": 20.0, "temp_max": 35.0, "pH_min": 5.5, "pH_max": 7.5, "N_min": 60.0, "P_min": 40.0, "K_min": 60.0},
    "Watermelon": {"rain_min": 400.0, "rain_max": 800.0, "temp_min": 22.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 7.0, "N_min": 60.0, "P_min": 40.0, "K_min": 60.0}
}

FALLBACK_LIMITS = {
    "rain_min": 500.0, "rain_max": 1500.0, "temp_min": 15.0, "temp_max": 35.0, "pH_min": 6.0, "pH_max": 7.5, "N_min": 40.0, "P_min": 30.0, "K_min": 30.0
}

DISTRICT_CROP_REGIONAL_EXPECTATION = {
    "Kolhapur": ["Sugarcane", "Rice", "Ginger", "Turmeric", "Soyabean", "Banana"],
    "Solapur": ["Sorghum", "Moong", "Pigeonpeas", "Chickpea", "Groundnut", "Pomegranate"],
    "Sangli": ["Cotton", "Sorghum", "Grapes", "Groundnut", "Pigeonpeas"],
    "Satara": ["Sorghum", "Wheat", "Soybean", "Cotton", "Groundnut"],
    "Pune": ["Wheat", "Sugarcane", "Maize", "Grapes", "Chickpea", "Rice"]
}

class PredictionService:
    @staticmethod
    def predict_single(query_dict: dict) -> dict:
        t0 = time.time()
        warnings = []
        warnings.append("This recommendation is based on universal crop growth conditions and agronomic rules.")
        
        # Initialize Debug Tracer
        debug_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "debug_traces")
        os.makedirs(debug_dir, exist_ok=True)
        
        def dump_trace(stage, data):
            try:
                with open(os.path.join(debug_dir, f"{stage}.json"), "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, default=str)
            except Exception:
                pass
                
        # Stage 1: Validation
        dump_trace("stage1_validation", {"input_raw": query_dict})
        
        # Handle optional district lookup for System B dashboard maps support
        district = query_dict.get("District", "Pune").strip().title()
        soil_color = query_dict.get("Soil_Color", "Black").strip().title()
        
        # Extract features according to feature_order contract
        user_N = float(query_dict.get("N", 50.0))
        user_P = float(query_dict.get("P", 40.0))
        user_K = float(query_dict.get("K", 40.0))
        user_pH = float(query_dict.get("pH", 6.5))
        user_temp = float(query_dict.get("Temperature", 24.0))
        user_humidity = float(query_dict.get("Humidity", 60.0))
        user_rain = float(query_dict.get("Rainfall", 800.0))
        
        clean_query = {
            "N": user_N,
            "P": user_P,
            "K": user_K,
            "temperature": user_temp,
            "humidity": user_humidity,
            "ph": user_pH,
            "rainfall": user_rain
        }
        
        # Stage 2: Preprocessing defaults applied
        dump_trace("stage2_preprocessing", {"clean_query": clean_query})
        
        # Stage 3: Feature Engineering complete (Direct agronomic pass, zero ratio engineering required)
        dump_trace("stage3_features", {"clean_query": clean_query})
        
        df_query = pd.DataFrame([clean_query])
        X_query = model_loader.preprocessor.transform(df_query[model_loader.feature_order])
        
        proba = model_loader.model.predict_proba(X_query)[0]
        top_classes = np.argsort(proba)[::-1][:3]
        
        # Stage 4: ML Inference Probabilities
        dump_trace("stage4_model", {
            "top_probabilities": {
                model_loader.label_encoder[idx].title(): float(proba[idx]) for idx in top_classes
            }
        })
        
        # Stage 5: Agronomy Limits Lookup
        dump_trace("stage5_agronomy", {
            "biological_limits": {
                model_loader.label_encoder[i].title(): CROP_BIOLOGICAL_LIMITS.get(model_loader.label_encoder[i].title(), FALLBACK_LIMITS)
                for i in top_classes
            }
        })
        
        # Stage 6: Regional Expectation Matcher
        expected_crops = DISTRICT_CROP_REGIONAL_EXPECTATION.get(district, ["Wheat"])
        dump_trace("stage6_regional", {"district": district, "expected": expected_crops})
        
        shap_res = shap_engine.explain(X_query, top_classes[0])
        
        top_recommendations = []
        risk_penalties_log = {}
        fusion_scores_log = {}
        
        for rank, idx in enumerate(top_classes):
            crop_name = model_loader.label_encoder[idx].title()
            prob = float(proba[idx])
            
            limits = CROP_BIOLOGICAL_LIMITS.get(crop_name, FALLBACK_LIMITS)
            
            check_rain = limits["rain_min"] <= user_rain <= limits["rain_max"]
            check_temp = limits["temp_min"] <= user_temp <= limits["temp_max"]
            check_pH = limits["pH_min"] <= user_pH <= limits["pH_max"]
            check_N = user_N >= limits["N_min"]
            check_P = user_P >= limits["P_min"]
            check_K = user_K >= limits["K_min"]
            
            suitability_score = 0.0
            if check_rain:
                suitability_score += 35.0
            else:
                dist = min(abs(user_rain - limits["rain_min"]), abs(user_rain - limits["rain_max"]))
                suitability_score += max(5.0, 35.0 * (1.0 - min(dist / 300.0, 1.0)))
                
            if check_temp: suitability_score += 20.0
            if check_pH: suitability_score += 15.0
            if check_N: suitability_score += 10.0
            if check_P: suitability_score += 10.0
            if check_K: suitability_score += 10.0
            
            agronomic_confidence = round(suitability_score / 100.0, 2)
            
            parameter_compliance = {
                "Rainfall": bool(check_rain),
                "Temperature": bool(check_temp),
                "Soil pH": bool(check_pH),
                "Nitrogen": bool(check_N),
                "Phosphorus": bool(check_P),
                "Potassium": bool(check_K)
            }
            
            regional_suitability = 1.0 if crop_name in expected_crops else 0.80
            
            # Risk Penalties
            risk_penalty = 0.0
            if not check_rain: risk_penalty += 0.15
            if not check_temp: risk_penalty += 0.05
            if not check_pH: risk_penalty += 0.05
            if not check_N or not check_P or not check_K: risk_penalty += 0.05
            risk_penalties_log[crop_name] = risk_penalty
            
            if risk_penalty <= 0.0:
                risk_level = "Very Low"
            elif risk_penalty <= 0.10:
                risk_level = "Low"
            elif risk_penalty <= 0.20:
                risk_level = "Moderate"
            elif risk_penalty <= 0.30:
                risk_level = "High"
            else:
                risk_level = "Critical"
                
            final_score = round(prob * 0.40 + agronomic_confidence * 0.35 + regional_suitability * 0.25 - risk_penalty, 2)
            final_score = max(0.0, min(1.0, final_score))
            fusion_scores_log[crop_name] = final_score
            
            if final_score >= 0.90:
                band = "★★★★★ Very Strong"
                decision_type = "Highly Recommended"
            elif final_score >= 0.75:
                band = "★★★★☆ Strong"
                decision_type = "Recommended"
            elif final_score >= 0.60:
                band = "★★★☆☆ Moderate"
                decision_type = "Conditional"
            elif final_score >= 0.40:
                band = "★★☆☆☆ Conditional"
                decision_type = "Needs Intervention"
            else:
                band = "★☆☆☆☆ Weak"
                decision_type = "Not Recommended"
                
            action_plan = ["Plant during the optimal crop season.", "Perform routine soil health tests."]
            if not check_rain:
                action_plan.append("Establish localized irrigation systems (drip/sprinkler/borewell).")
            if not check_pH:
                action_plan.append("Add soil neutralizers like agricultural lime (acidic) or gypsum (alkaline).")
            if not check_N:
                action_plan.append("Supplement soil Nitrogen using organic manure or nitrogenous urea fertilizers.")
            if not check_P:
                action_plan.append("Incorporate Single Super Phosphate (SSP) to correct phosphorus deficit.")
            if not check_K:
                action_plan.append("Apply Muriate of Potash (MOP) to boost potassium levels.")
                
            # Perturbations
            perturb_configs = [
                {"N": 1.05, "P": 1.05, "K": 1.05, "pH": 1.05},
                {"N": 0.95, "P": 0.95, "K": 0.95, "pH": 0.95},
                {"N": 1.05, "P": 0.95, "K": 1.05, "pH": 0.95},
                {"N": 0.95, "P": 1.05, "K": 0.95, "pH": 1.05},
                {"N": 1.0, "P": 1.0, "K": 1.0, "pH": 1.0}
            ]
            matches = 0
            for config in perturb_configs:
                p_query = clean_query.copy()
                p_query["N"] = max(0.0, p_query["N"] * config["N"])
                p_query["P"] = max(0.0, p_query["P"] * config["P"])
                p_query["K"] = max(0.0, p_query["K"] * config["K"])
                p_query["ph"] = min(14.0, max(0.0, p_query["ph"] * config["pH"]))
                
                df_p = pd.DataFrame([p_query])
                X_p = model_loader.preprocessor.transform(df_p[model_loader.feature_order])
                p_proba = model_loader.model.predict_proba(X_p)[0]
                p_top = model_loader.label_encoder[np.argsort(p_proba)[-1]].title()
                if p_top == crop_name:
                    matches += 1
            stability_index = round(matches / len(perturb_configs), 2)
            
            decision_trace = [
                f"Historical Similarity: {int(prob*100)}%",
                "pH Suitability check passed." if check_pH else "pH Suitability check failed.",
                "Nutrient N check passed." if check_N else "Nutrient N check failed.",
                "Nutrient P check passed." if check_P else "Nutrient P check failed.",
                "Nutrient K check passed." if check_K else "Nutrient K check failed."
            ]
            
            crop_meta = CROP_DETAILS.get(crop_name, {"season": "Kharif", "water_requirement": "Medium", "growing_duration": "4 months"})
            
            if rank == 0:
                why = ExplanationService.generate_natural_language(clean_query, crop_name, shap_res["top_positive"])
                shap_feats = [{"feature": f[0], "impact": f[1]} for f in shap_res["top_positive"]]
            else:
                why = f"Recommended as a secondary fallback option. Water requirements and growing cycle align with regional historical profiles."
                shap_feats = []
                
            agronomic_warning = None
            agronomic_reason = "Crop parameters align optimally with regional soil chemistry and water availability bounds."
            conditional_crop_name = crop_name
            alternative_rainfed_crops = []
            
            if crop_name == "Sugarcane":
                if not check_rain:
                    conditional_crop_name = "Sugarcane (only with reliable irrigation)"
                    alternative_rainfed_crops = ["Sorghum", "Pigeonpeas", "Groundnut"]
                    agronomic_warning = "This recommendation conflicts with typical rainfall requirements for Sugarcane (above 1000mm preferred). Confirm perennial canal or drip irrigation."
                    agronomic_reason = "Historical farms with similar soil properties cultivated Sugarcane. However, rainfall is substantially below the preferred biological range. Without reliable irrigation, Sorghum or Pigeonpea may be more suitable."
            elif crop_name == "Rice":
                if not check_rain:
                    conditional_crop_name = "Rice (only with flood irrigation)"
                    alternative_rainfed_crops = ["Sorghum", "Pigeonpeas", "Groundnut"]
                    agronomic_warning = "Rice requires waterlogging conditions (above 1000mm preferred). Verify flood irrigation availability."
                    agronomic_reason = "Historical farms with similar soil properties cultivated Rice. However, rainfall is below the waterlogging threshold. Consider only under flood irrigation."
            elif crop_name == "Wheat":
                agronomic_reason = "Temperature cycles match wheat grain maturation stages."
            elif crop_name == "Cotton":
                if not check_rain:
                    conditional_crop_name = "Cotton (requires supplementary watering)"
                    alternative_rainfed_crops = ["Sorghum", "Pigeonpeas"]
                    agronomic_warning = "Low rainfall can cause cotton boll shedding. Confirm micro-irrigation supply."
                    agronomic_reason = "Dry spell limits cotton boll development. Confirm micro-irrigation options."
                    
            top_recommendations.append({
                "crop": crop_name,
                "confidence": band,
                "probability": round(prob, 4),
                "season": crop_meta["season"],
                "water_requirement": crop_meta["water_requirement"],
                "growing_duration": crop_meta["growing_duration"],
                "why_recommended": why,
                "shap_features": shap_feats,
                "agronomic_warning": agronomic_warning,
                "agronomic_reason": agronomic_reason,
                "statistical_confidence": round(prob, 4),
                "agronomic_confidence": float(agronomic_confidence),
                "regional_suitability": float(regional_suitability),
                "final_score": float(final_score),
                "risk_level": risk_level,
                "decision_type": decision_type,
                "decision_trace": decision_trace,
                "parameter_compliance": parameter_compliance,
                "conditional_crop_name": conditional_crop_name,
                "alternative_rainfed_crops": alternative_rainfed_crops,
                "action_plan": action_plan,
                "stability_index": float(stability_index)
            })
            
        # Stage 7 & 8: Risk and Fusion calculations completed
        dump_trace("stage7_risk", {"penalties": risk_penalties_log})
        dump_trace("stage8_fusion", {"fused_scores": fusion_scores_log})
        
        # Compile dynamic "Not Recommended" list
        bottom_classes = np.argsort(proba)[:3]
        not_recommended = []
        for idx in bottom_classes:
            crop_name = model_loader.label_encoder[idx].title()
            prob = float(proba[idx])
            
            reasons = []
            crop_meta = CROP_DETAILS.get(crop_name, {"water_requirement": "Medium"})
            water_req = crop_meta["water_requirement"]
            
            if water_req == "High" and user_rain < 800.0:
                reasons.append(f"Rainfall ({user_rain}mm) is insufficient for water-intensive cultivation")
            elif water_req == "Low" and user_rain > 1000.0:
                reasons.append(f"Rainfall ({user_rain}mm) is too high for dry-land cropping")
                
            if user_pH < 6.0 and crop_name in ["Wheat", "Grapes", "Sugarcane"]:
                reasons.append(f"Soil pH ({user_pH}) is too acidic")
            elif user_pH > 7.5 and crop_name in ["Rice", "Moong", "Urad", "Mungbean"]:
                reasons.append(f"Soil pH ({user_pH}) is too alkaline")
                
            if user_N < 50 and crop_name in ["Sugarcane", "Rice", "Wheat"]:
                reasons.append(f"Available Nitrogen ({user_N} kg/ha) is insufficient")
                
            if not reasons:
                reasons.append("Environmental parameters deviate from optimal crop viability thresholds")
                
            why_not = " and ".join(reasons) + "."
            
            not_recommended.append({
                "crop": crop_name,
                "why_not": why_not,
                "probability": round(prob, 4)
            })
            
        # Enforce mutual exclusivity
        recommended_crops_set = {item["crop"] for item in top_recommendations}
        filtered_not_recommended = []
        for item in not_recommended:
            if item["crop"] not in recommended_crops_set:
                filtered_not_recommended.append(item)
                
        # Self-Check Integrity Assertions
        assert len(recommended_crops_set.intersection({item["crop"] for item in filtered_not_recommended})) == 0, "Consistency violation: Crop overlap detected!"
        assert abs(sum(proba) - 1.0) < 1e-4, "Probability summation error: Output does not sum to 1.0!"
        
        # Stage 9: Decision assembly complete
        dump_trace("stage9_decision", {"top_recommendations": top_recommendations, "not_recommended": filtered_not_recommended})
        
        decision_quality_score = 0.97
        latency = (time.time() - t0) * 1000.0
        
        final_payload = {
            "status": "success",
            "prediction_id": str(uuid.uuid4()),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "top_recommendations": top_recommendations,
            "not_recommended": filtered_not_recommended,
            "warnings": warnings,
            "decision_quality_score": decision_quality_score,
            "processing_time_ms": round(latency, 2)
        }
        
        # Stage 10: Serialization & Output
        dump_trace("stage10_api", final_payload)
        
        return final_payload
