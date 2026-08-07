import os
import sys

# Dynamically inject repository root into python search path
_current_dir = os.path.dirname(os.path.abspath(__file__)) # .../backend/app
_backend_dir = os.path.dirname(_current_dir)             # .../backend
_repo_root = os.path.dirname(_backend_dir)                # repo root
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.router import api_router
from backend.app.ml.model_loader import model_loader
from backend.app.exceptions.custom_exceptions import ModelNotLoadedException, InvalidInputException
from backend.app.exceptions.handlers import model_not_loaded_handler, invalid_input_handler
from backend.app.api.routes import predict_v3
from backend.app.ml.v3.predictor import v3_predictor
from backend.app.core.logging import logger

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(ModelNotLoadedException, model_not_loaded_handler)
app.add_exception_handler(InvalidInputException, invalid_input_handler)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting Krishi Sarathi FastAPI Backend...")
    model_loader.load()
    try:
        v3_predictor.load()
        logger.info("V3 crop prediction engine successfully initialized.")
    except Exception as ex:
        logger.error(f"Failed to load V3 model: {str(ex)}")

@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "Welcome to Krishi Sarathi Enterprise AI Backend. Navigate to /docs for Swagger specifications.",
        "sanskrit_tagline": "ज्ञानसमन्विता कृषिः समृद्धये।",
        "motto": "शाश्वत शेती – समृद्ध शेतकरी"
    }

app.include_router(api_router, prefix=settings.API_STR)
app.include_router(predict_v3.router, prefix="/api/v3", tags=["predict_v3"])
