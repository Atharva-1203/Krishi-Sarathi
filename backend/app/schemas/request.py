from pydantic import BaseModel, Field
from typing import Optional, List

class PredictRequest(BaseModel):
    District: str = Field(..., description="Standardized district name")
    Soil_Color: str = Field(..., description="Soil color proxy")
    N: float = Field(..., ge=0, le=500, description="Nitrogen content (kg/ha)")
    P: float = Field(..., ge=0, le=300, description="Phosphorus content (kg/ha)")
    K: float = Field(..., ge=0, le=1000, description="Potassium content (kg/ha)")
    pH: float = Field(..., ge=0.0, le=14.0, description="Soil pH level")
    Temperature: float = Field(..., ge=0, le=60, description="Air temperature in Celsius")
    Humidity: float = Field(..., ge=0, le=100, description="Relative humidity percentage")
    Rainfall: float = Field(..., ge=0, le=5000, description="Cumulative monsoon rainfall (mm)")
    
    OC: Optional[float] = Field(None, ge=0, le=5, description="Organic Carbon percentage")
    EC: Optional[float] = Field(None, ge=0, le=10, description="Electrical Conductivity")
    B: Optional[float] = Field(None, ge=0, description="Boron")
    Fe: Optional[float] = Field(None, ge=0, description="Iron")
    Mn: Optional[float] = Field(None, ge=0, description="Manganese")
    Cu: Optional[float] = Field(None, ge=0, description="Copper")
    Zn: Optional[float] = Field(None, ge=0, description="Zinc")
    S: Optional[float] = Field(None, ge=0, description="Sulfur")

    # Optional Economic Engine parameters (does NOT affect 7-feature agronomic core model)
    farm_area_ha: Optional[float] = Field(1.0, ge=0.1, le=100.0, description="Farm area in hectares")
    irrigation_type: Optional[str] = Field("rainfed", description="Irrigation mode: rainfed, drip, sprinkler, canal, borewell")

class BatchPredictRequest(BaseModel):
    requests: List[PredictRequest]
