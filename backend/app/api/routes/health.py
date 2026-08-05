from fastapi import APIRouter
import time
from backend.app.schemas.response import HealthResponse
from backend.app.ml.model_loader import model_loader

router = APIRouter()

@router.get("", response_model=HealthResponse)
async def check_health():
    return {
        "status": "healthy",
        "model_loaded": model_loader.model is not None,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
