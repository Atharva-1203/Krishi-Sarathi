from fastapi import Request
from fastapi.responses import JSONResponse
from backend.app.exceptions.custom_exceptions import ModelNotLoadedException, InvalidInputException

async def model_not_loaded_handler(request: Request, exc: ModelNotLoadedException):
    return JSONResponse(
        status_code=503,
        content={"status": "error", "message": exc.message}
    )

async def invalid_input_handler(request: Request, exc: InvalidInputException):
    return JSONResponse(
        status_code=422,
        content={"status": "error", "message": exc.message, "details": exc.details}
    )
