from fastapi import APIRouter, HTTPException
from backend.app.ml.model_loader import model_loader

router = APIRouter()

@router.get("")
async def get_model_metadata():
    if model_loader.metadata is None:
        raise HTTPException(status_code=503, detail="Model metadata not loaded.")
    return model_loader.metadata
