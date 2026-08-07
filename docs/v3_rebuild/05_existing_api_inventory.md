# V3 Rebuild: 05 Existing API Inventory

This document maps all active HTTP API endpoints currently exposed by the backend.

## 1. Version 1 Routing (`/api/v1`)
All endpoints are prefix-managed in `backend/app/api/router.py` with `settings.API_STR = "/api/v1"`.

| Endpoint Path | HTTP Method | Handler File | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/predict` | `POST` | `routes/predict.py` | Performs a single crop prediction using V2 decision fusion and SHAP explanation. |
| `/api/v1/predict/batch` | `POST` | `routes/predict.py` | Iterates over a list of prediction payloads and returns results. |
| `/api/v1/health` | `GET` | `routes/health.py` | Reports application health and whether the ML model is initialized in memory. |
| `/api/v1/version` | `GET` | `routes/version.py` | Exposes project metadata, including version and taglines. |
| `/api/v1/model` | `GET` | `routes/model.py` | Fetches active production model configuration and training metrics. |
| `/api/v1/metadata` | `GET` | `routes/metadata.py` | Exposes metadata for the legacy soil-card dataset. |

## 2. API Contract Schema (V1 Predict)
*   **Request Schema (`PredictRequest`)**:
    *   Mandatory parameters: `District`, `Soil_Color`, `N`, `P`, `K`, `pH`, `Temperature`, `Humidity`, `Rainfall`.
    *   Optional: `OC`, `EC`, `B`, `Fe`, `Mn`, `Cu`, `Zn`, `S`.
*   **Response Schema (`PredictResponse`)**:
    *   Returns `top_recommendations` (includes `crop`, `confidence`, `probability`, `season`, `water_requirement`, `growing_duration`, `why_recommended`, `shap_features`, `agronomic_warning`, `agronomic_reason`, and 12 other scoring metrics like `stability_index` and `final_score`).
    *   Returns `not_recommended` array.
    *   Returns `decision_quality_score` and list of `warnings`.
