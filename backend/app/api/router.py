from fastapi import APIRouter
from backend.app.api.routes import health, version

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(version.router, prefix="/version", tags=["version"])
