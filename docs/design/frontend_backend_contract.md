# Krishi Sarathi - Frontend Backend Contract

Specifications of API JSON payloads.

## 1. Request Contract Schema
```json
{
  "District": "Pune",
  "Soil_Color": "Black",
  "N": 80,
  "P": 50,
  "K": 120,
  "pH": 6.8,
  "Temperature": 24.5,
  "Humidity": 70.0,
  "Rainfall": 1100.0
}
```

## 2. Response Contract Schema
```json
{
  "status": "success",
  "prediction_id": "uuid-string",
  "timestamp": "iso-timestamp",
  "top_recommendations": [
    {
      "crop": "Sugarcane",
      "confidence": "High",
      "probability": 0.85,
      "season": "Year-round",
      "water_requirement": "High",
      "growing_duration": "12 months",
      "why_recommended": "Nitrogen and pH are optimal...",
      "shap_features": [{"feature": "Rainfall", "impact": 0.124}]
    }
  ],
  "warnings": [],
  "processing_time_ms": 15
}
```
