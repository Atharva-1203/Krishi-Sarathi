from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def get_dataset_metadata():
    return {
        "dataset_name": "Maharashtra Soil and Rainfall Database",
        "version": "1.0",
        "districts_count": 5,
        "classes_count": 16,
        "samples_count": 4513
    }
