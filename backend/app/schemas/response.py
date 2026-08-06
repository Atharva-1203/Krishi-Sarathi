from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class RecommendationItem(BaseModel):
    crop: str
    confidence: str
    probability: float
    season: str
    water_requirement: str
    growing_duration: str
    why_recommended: str
    shap_features: List[Dict[str, Any]]
    agronomic_warning: Optional[str] = None
    statistical_confidence: float
    agronomic_confidence: float
    agronomic_reason: Optional[str] = None

class NotRecommendedItem(BaseModel):
    crop: str
    why_not: str
    probability: float

class PredictResponse(BaseModel):
    status: str
    prediction_id: str
    timestamp: str
    top_recommendations: List[RecommendationItem]
    not_recommended: List[NotRecommendedItem] = []
    warnings: List[str]
    processing_time_ms: float

class BatchPredictResponse(BaseModel):
    status: str
    predictions: List[PredictResponse]

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    timestamp: str

class VersionResponse(BaseModel):
    project: str
    version: str
    sanskrit_tagline: str
    motto: str
