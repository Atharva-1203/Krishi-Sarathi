"""FastAPI route handler for V3.1 crop predictions and model metadata."""

import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from backend.app.ml.v3.predictor import v3_predictor

router = APIRouter()

class PredictRequestV3(BaseModel):
    N: float = Field(..., description="Nitrogen content (kg/ha)")
    P: float = Field(..., description="Phosphorus content (kg/ha)")
    K: float = Field(..., description="Potassium content (kg/ha)")
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")
    ph: float = Field(..., description="Soil pH level")
    rainfall: float = Field(..., description="Rainfall in mm")
    farm_area_ha: float = Field(1.0, ge=0.1, le=100.0, description="Farm area in hectares")
    irrigation_type: str = Field("rainfed", description="Irrigation type: rainfed, drip, sprinkler, canal, borewell")
    district: str = Field("Maharashtra Grid", description="District context for economic analysis")

class RecommendationItemV3(BaseModel):
    rank: int
    crop: str
    probability: float

class PredictResponseV3(BaseModel):
    status: str
    model_version: str
    top_recommendations: List[RecommendationItemV3]
    ood: bool
    ood_status: str
    warnings: List[str]
    scorecard: Dict[str, Any]
    sensitivity: List[Dict[str, Any]]
    why_not: List[Dict[str, Any]]
    entropy: float
    entropy_status: str
    confidence_level: str
    explanation: Dict[str, Any]
    comparison_matrix: Dict[str, Any]
    economic_analysis: Dict[str, Any] = Field(default_factory=dict)

from fastapi.responses import JSONResponse
from backend.app.ml.v3.economic_engine import economic_engine

@router.post("/predict", response_model=PredictResponseV3)
async def predict_v3_endpoint(payload: PredictRequestV3):
    try:
        data = payload.dict()
        res = v3_predictor.predict(data)
        
        if res.get("status") in ["validation_error", "out_of_scope"]:
            return JSONResponse(status_code=422, content=res)

        # Attach decoupled Profit-First Economic Engine computations
        econ_analysis = economic_engine.rank_recommendations(
            recommendations=res.get("top_recommendations", []),
            farm_area_ha=payload.farm_area_ha,
            irrigation_type=payload.irrigation_type,
            district=payload.district
        )
        res["economic_analysis"] = econ_analysis
            
        return res
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": f"V3.1 prediction serving error: {str(e)}"}
        )

@router.get("/model")
async def get_v3_model_metadata():
    try:
        if v3_predictor.metadata is None:
            v3_predictor.load()
            
        import json
        profiles_path = os.path.join(v3_predictor.model_dir, "crop_profiles.json")
        metadata_path = os.path.join(v3_predictor.model_dir, "crop_metadata.json")
        
        profiles = {}
        metadata = []
        if os.path.exists(profiles_path):
            with open(profiles_path, "r", encoding="utf-8") as f:
                profiles = json.load(f)
        if os.path.exists(metadata_path):
            with open(metadata_path, "r", encoding="utf-8") as f:
                metadata = json.load(f)
                
        return {
            "model_metadata": v3_predictor.metadata,
            "crop_profiles": profiles,
            "crop_metadata": metadata
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch model metadata: {str(e)}")
