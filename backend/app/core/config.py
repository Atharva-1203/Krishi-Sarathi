import os

class Settings:
    PROJECT_NAME: str = "Krishi Sarathi API"
    VERSION: str = "1.0.0"
    API_STR: str = "/api/v1"
    # Dynamically resolve relative to backend app core folder
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_DIR: str = os.getenv("MODEL_DIR", os.path.join(BASE_DIR, "models"))
    
settings = Settings()
