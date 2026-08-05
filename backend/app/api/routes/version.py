from fastapi import APIRouter
from backend.app.schemas.response import VersionResponse

router = APIRouter()

@router.get("", response_model=VersionResponse)
async def get_version():
    return {
        "project": "Krishi Sarathi",
        "version": "1.0.0",
        "sanskrit_tagline": "ज्ञानसमन्विता कृषिः समृद्धये।",
        "motto": "शाश्वत शेती – समृद्ध शेतकरी"
    }
