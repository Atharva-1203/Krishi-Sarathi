from fastapi import APIRouter
import time
from backend.app.schemas.response import HealthResponse
from backend.app.ml.v3.predictor import v3_predictor

router = APIRouter()

@router.get("", response_model=HealthResponse)
async def check_health():
    return {
        "status": "healthy",
        "model_loaded": v3_predictor.model is not None,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
