import uuid
import time
import numpy as np
import pandas as pd
from backend.app.ml.model_loader import model_loader
from backend.app.ml.shap_engine import shap_engine
from backend.app.core.constants import CROP_DETAILS
from backend.app.services.explanation_service import ExplanationService

class PredictionService:
    @staticmethod
    def predict_single(query_dict: dict) -> dict:
        t0 = time.time()
        warnings = []
        
        district = query_dict.get("District", "Pune").strip().title()
        if district not in model_loader.preprocessor.district_categories:
            warnings.append(f"District '{district}' is outside Pune division. Falling back to average Pune medians.")
            district = "Pune"
            
        soil_color = query_dict.get("Soil_Color", "Black").strip().title()
        if soil_color not in model_loader.preprocessor.soil_color_categories:
            soil_color = "Black"
            
        # District-level soil medians lookup mapping
        district_medians = {
            "Kolhapur": {"OC": 0.88, "EC": 0.14, "B": 2.88, "Fe": 6.35, "Mn": 17.636, "Cu": 3.25, "Zn": 0.72, "S": 50.72},
            "Solapur": {"OC": 0.45, "EC": 0.32, "B": 0.16, "Fe": 1.56, "Mn": 1.56, "Cu": 0.58, "Zn": 0.5, "S": 7.05},
            "Satara": {"OC": 0.295, "EC": 0.25, "B": 0.073, "Fe": 3.96, "Mn": 6.2, "Cu": 2.4, "Zn": 0.793, "S": 4.178},
            "Sangli": {"OC": 0.583, "EC": 0.24, "B": 0.973, "Fe": 3.16, "Mn": 6.06, "Cu": 2.88, "Zn": 0.62, "S": 10.75},
            "Pune": {"OC": 0.41, "EC": 0.408, "B": 0.46, "Fe": 1.32, "Mn": 2.802, "Cu": 0.53, "Zn": 0.374, "S": 6.746}
        }
        
        # District normal rainfall lookup
        district_rainfall_lookup = {
            "Kolhapur": 1733.1,
            "Pune": 861.6,
            "Sangli": 514.5,
            "Satara": 886.2,
            "Solapur": 481.1
        }
        
        clean_query = query_dict.copy()
        clean_query["District"] = district
        clean_query["Soil_Color"] = soil_color
        
        # 1. Impute missing micronutrients dynamically from district profiles
        dist_defaults = district_medians.get(district, district_medians["Pune"])
        for col, val in dist_defaults.items():
            if col not in clean_query or clean_query[col] is None:
                clean_query[col] = val
                
        # 2. Impute N, P, K, pH, Temperature, Rainfall if missing using preprocessor medians
        for col in ["N", "P", "K", "pH", "Temperature", "Rainfall"]:
            if col not in clean_query or clean_query[col] is None:
                clean_query[col] = float(model_loader.preprocessor.medians.get(col, 0.0))
                
        user_rain = clean_query["Rainfall"]
        user_temp = clean_query["Temperature"]
        user_pH = clean_query["pH"]
        user_N = clean_query["N"]
        user_P = clean_query["P"]
        user_K = clean_query["K"]
        user_OC = clean_query["OC"]
        
        # 3. Dynamic Organic Carbon Class mapping
        if user_OC < 0.4:
            clean_query["OC_Class"] = "Low"
        elif user_OC < 0.6:
            clean_query["OC_Class"] = "Medium"
        else:
            clean_query["OC_Class"] = "High"
            
        # 4. Dynamic Soil Health Score calculation
        health_score = 0.0
        if 6.0 <= user_pH <= 7.5:
            health_score += 2.0
        if user_N >= 80.0:
            health_score += 2.0
        if user_P >= 25.0:
            health_score += 2.0
        if user_K >= 150.0:
            health_score += 2.0
        if user_OC >= 0.6:
            health_score += 2.0
        clean_query["Soil_Health_Score"] = health_score
        
        # 5. Dynamic Weather & Deviation calculations
        normal_rain = district_rainfall_lookup.get(district, 861.6)
        clean_query["District_Normal_Rainfall"] = normal_rain
        clean_query["Rainfall_Deviation"] = round((user_rain - normal_rain) / normal_rain, 4)
        clean_query["Humidity"] = round(float(np.clip(45.0 + 0.05 * user_rain - 0.2 * user_temp, 30.0, 95.0)), 2)
        
        # 6. Dynamic NPK ratios
        clean_query["N_P_Ratio"] = round(user_N / (user_P + 0.01), 4)
        clean_query["N_K_Ratio"] = round(user_N / (user_K + 0.01), 4)
        clean_query["P_K_Ratio"] = round(user_P / (user_K + 0.01), 4)
        
        if "Growing_Season" not in clean_query:
            clean_query["Growing_Season"] = "Kharif"
            
        df_query = pd.DataFrame([clean_query])
        X_query = model_loader.preprocessor.transform(df_query)
        
        proba = model_loader.model.predict_proba(X_query)[0]
        top_classes = np.argsort(proba)[::-1][:3]
        
        shap_res = shap_engine.explain(X_query, top_classes[0])
        
        top_recommendations = []
        for rank, idx in enumerate(top_classes):
            crop_name = model_loader.preprocessor.crop_decoder[idx]
            prob = float(proba[idx])
            
            if prob >= 0.80:
                band = "Very High"
            elif prob >= 0.65:
                band = "High"
            elif prob >= 0.50:
                band = "Moderate"
            elif prob >= 0.30:
                band = "Low"
            else:
                band = "Very Low"
                
            crop_meta = CROP_DETAILS.get(crop_name, {"season": "Kharif", "water_requirement": "Medium", "growing_duration": "4 months"})
            
            if rank == 0:
                why = ExplanationService.generate_natural_language(clean_query, crop_name, shap_res["top_positive"])
                shap_feats = [{"feature": f[0], "impact": f[1]} for f in shap_res["top_positive"]]
            else:
                why = f"Recommended as a secondary fallback option. Water requirements and growing cycle align with regional historical profiles."
                shap_feats = []
                
            # Agronomic Rule Validation Layer & Hybrid AI Decision Engine
            agronomic_warning = None
            agronomic_confidence = 1.0
            agronomic_reason = "Crop parameters align optimally with regional soil chemistry and water availability bounds."
            
            if crop_name == "Sugarcane":
                if user_rain < 1000.0:
                    agronomic_confidence = max(0.2, round(1.0 - (1000.0 - user_rain) / 500.0 * 0.8, 2))
                    agronomic_warning = "This recommendation conflicts with typical rainfall requirements for Sugarcane (above 1000mm preferred). Confirm perennial canal or drip irrigation."
                    agronomic_reason = "The machine learning model recognizes a historical pattern similar to irrigated sugarcane farms. However, the entered rainfall is below the natural requirement. Recommendation: Sugarcane should be considered only if reliable irrigation (canal/drip/borewell) is available. Otherwise, consider Sorghum or Pigeonpea."
                else:
                    agronomic_reason = "Soil nutrients and rainfall parameters completely satisfy sugarcane biological growth requirements."
            elif crop_name == "Rice":
                if user_rain < 1100.0:
                    agronomic_confidence = max(0.2, round(1.0 - (1100.0 - user_rain) / 600.0 * 0.8, 2))
                    agronomic_warning = "Rice requires waterlogging conditions (above 1100mm preferred). Verify flood irrigation availability."
                    agronomic_reason = "Rice requires waterlogging conditions (above 1100mm preferred). High similarity to flooded paddy tracts is detected, but local rainfall is insufficient. Consider only under flood irrigation."
                else:
                    agronomic_reason = "Adequate precipitation levels satisfy paddy waterlogging cultivation limits."
            elif crop_name == "Wheat":
                if clean_query.get("Growing_Season") == "Kharif":
                    agronomic_confidence = 0.40
                    agronomic_warning = "Wheat is a winter Rabi crop. Sowing in Kharif can lead to moisture stress or root rot."
                    agronomic_reason = "Wheat is a winter Rabi crop. Planting in Kharif monsoon risks high humidity grain rotting."
                else:
                    agronomic_reason = "Rabi temperature cycles match wheat grain maturation stages."
            elif crop_name == "Cotton":
                if user_rain < 500.0:
                    agronomic_confidence = max(0.3, round(1.0 - (500.0 - user_rain) / 200.0 * 0.6, 2))
                    agronomic_warning = "Low rainfall can cause cotton boll shedding. Confirm micro-irrigation supply."
                    agronomic_reason = "Dry spell limits cotton boll development. Confirm micro-irrigation options."
                else:
                    agronomic_reason = "Precipitation matches cotton vegetative and flowering requirements."
                
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
                "statistical_confidence": round(prob, 4),
                "agronomic_confidence": float(agronomic_confidence),
                "agronomic_reason": agronomic_reason
            })
            
        # Compile dynamic "Not Recommended" list from bottom classes (excluding top_classes)
        bottom_classes = np.argsort(proba)[:3]
        not_recommended = []
        for idx in bottom_classes:
            crop_name = model_loader.preprocessor.crop_decoder[idx]
            prob = float(proba[idx])
            
            reasons = []
            crop_meta = CROP_DETAILS.get(crop_name, {"water_requirement": "Medium"})
            water_req = crop_meta["water_requirement"]
            
            user_rain = clean_query.get("Rainfall", 800.0)
            user_pH = clean_query.get("pH", 6.5)
            user_N = clean_query.get("N", 60)
            user_K = clean_query.get("K", 60)
            
            if water_req == "High" and user_rain < 800.0:
                reasons.append(f"Rainfall ({user_rain}mm) is insufficient for water-intensive cultivation")
            elif water_req == "Low" and user_rain > 1000.0:
                reasons.append(f"Rainfall ({user_rain}mm) is too high for dry-land cropping")
                
            if user_pH < 6.0 and crop_name in ["Wheat", "Grapes", "Sugarcane"]:
                reasons.append(f"Soil pH ({user_pH}) is too acidic")
            elif user_pH > 7.5 and crop_name in ["Rice", "Moong", "Urad"]:
                reasons.append(f"Soil pH ({user_pH}) is too alkaline")
                
            if user_N < 50 and crop_name in ["Sugarcane", "Rice", "Wheat"]:
                reasons.append(f"Available Nitrogen ({user_N} kg/ha) is insufficient")
            if user_K < 50 and crop_name in ["Grapes", "Sugarcane"]:
                reasons.append(f"Available Potassium ({user_K} kg/ha) is insufficient")
                
            if not reasons:
                reasons.append("Environmental parameters deviate from optimal crop viability thresholds")
                
            why_not = " and ".join(reasons) + "."
            
            not_recommended.append({
                "crop": crop_name,
                "why_not": why_not,
                "probability": round(prob, 4)
            })

        latency = (time.time() - t0) * 1000.0
        
        return {
            "status": "success",
            "prediction_id": str(uuid.uuid4()),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "top_recommendations": top_recommendations,
            "not_recommended": not_recommended,
            "warnings": warnings,
            "processing_time_ms": round(latency, 2)
        }
