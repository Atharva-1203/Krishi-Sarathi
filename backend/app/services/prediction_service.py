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
            warnings.append(f"District '{district}' is outside Pune division. Falling back to average state medians.")
            district = "Pune"
            
        soil_color = query_dict.get("Soil_Color", "Black").strip().title()
        if soil_color not in model_loader.preprocessor.soil_color_categories:
            soil_color = "Black"
            
        clean_query = query_dict.copy()
        clean_query["District"] = district
        clean_query["Soil_Color"] = soil_color
        
        for col in model_loader.preprocessor.numeric_cols:
            if col not in clean_query or clean_query[col] is None:
                clean_query[col] = float(model_loader.preprocessor.medians.get(col, 0.0))
                
        clean_query["N_P_Ratio"] = round(clean_query["N"] / (clean_query["P"] + 0.01), 4)
        clean_query["N_K_Ratio"] = round(clean_query["N"] / (clean_query["K"] + 0.01), 4)
        clean_query["P_K_Ratio"] = round(clean_query["P"] / (clean_query["K"] + 0.01), 4)
        
        if "Growing_Season" not in clean_query:
            clean_query["Growing_Season"] = "Kharif"
        if "OC_Class" not in clean_query:
            clean_query["OC_Class"] = "High"
            
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
                
            top_recommendations.append({
                "crop": crop_name,
                "confidence": band,
                "probability": round(prob, 4),
                "season": crop_meta["season"],
                "water_requirement": crop_meta["water_requirement"],
                "growing_duration": crop_meta["growing_duration"],
                "why_recommended": why,
                "shap_features": shap_feats
            })
            
        latency = (time.time() - t0) * 1000.0
        
        return {
            "status": "success",
            "prediction_id": str(uuid.uuid4()),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "top_recommendations": top_recommendations,
            "warnings": warnings,
            "processing_time_ms": round(latency, 2)
        }
