import os

class Settings:
    PROJECT_NAME: str = "Krishi Sarathi API"
    VERSION: str = "1.0.0"
    API_STR: str = "/api/v1"
    MODEL_DIR: str = os.getenv("MODEL_DIR", r"d:\Techrush\ml\models\production")
    
settings = Settings()
