from fastapi import APIRouter, HTTPException
from backend.app.schemas.request import PredictRequest, BatchPredictRequest
from backend.app.schemas.response import PredictResponse, BatchPredictResponse
from backend.app.services.prediction_service import PredictionService
from backend.app.ml.model_loader import model_loader
from backend.app.exceptions.custom_exceptions import ModelNotLoadedException

router = APIRouter()

@router.post("", response_model=PredictResponse)
async def predict_single(payload: PredictRequest):
    if model_loader.model is None:
        raise ModelNotLoadedException()
    try:
        res = PredictionService.predict_single(payload.dict())
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction serving error: {str(e)}")

@router.post("/batch", response_model=BatchPredictResponse)
async def predict_batch(payload: BatchPredictRequest):
    if model_loader.model is None:
        raise ModelNotLoadedException()
    try:
        results = []
        for req in payload.requests:
            res = PredictionService.predict_single(req.dict())
            results.append(res)
        return {"status": "success", "predictions": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch prediction serving error: {str(e)}")
