from fastapi import APIRouter
from backend.app.api.routes import predict, health, version, model, metadata

api_router = APIRouter()
api_router.include_router(predict.router, prefix="/predict", tags=["predict"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(version.router, prefix="/version", tags=["version"])
api_router.include_router(model.router, prefix="/model", tags=["model"])
api_router.include_router(metadata.router, prefix="/metadata", tags=["metadata"])
