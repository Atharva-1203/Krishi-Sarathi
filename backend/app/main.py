from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.router import api_router
from backend.app.ml.model_loader import model_loader
from backend.app.exceptions.custom_exceptions import ModelNotLoadedException, InvalidInputException
from backend.app.exceptions.handlers import model_not_loaded_handler, invalid_input_handler
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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(ModelNotLoadedException, model_not_loaded_handler)
app.add_exception_handler(InvalidInputException, invalid_input_handler)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting Krishi Sarathi FastAPI Backend...")
    model_loader.load()

@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "Welcome to Krishi Sarathi Enterprise AI Backend. Navigate to /docs for Swagger specifications.",
        "sanskrit_tagline": "ज्ञानसमन्विता कृषिः समृद्धये।",
        "motto": "शाश्वत शेती – समृद्ध शेतकरी"
    }

app.include_router(api_router, prefix=settings.API_STR)
