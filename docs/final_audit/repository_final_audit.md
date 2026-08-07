# Repository Final Audit

This document maps out the full folder structure of the **Krishi Sarathi** project, distinguishing between active production paths and stale/legacy files.

## 1. High-Level Directory Map

*   `backend/`: FastAPI Python web server
*   `frontend/`: Next.js Node.js client dashboard
*   `ml/`: ML training pipelines, experimental notebooks, and V3 champion model artifacts
*   `datasets/`: Raw and processed agricultural data files
*   `docs/`: Design documentation, baseline reports, and system validation audits
*   `scripts/`: Automation and model diagnostics scripts
*   `tests/`: Model behavior unit tests and api parity suites

## 2. Active Production Path

### Backend (FastAPI)
*   **Startup**: `backend/app/main.py`
*   **Endpoint**: `/api/v3/predict` mapped in `backend/app/api/routes/predict_v3.py`
*   **Inference Engine**: `backend/app/ml/v3/predictor.py`
*   **ML Preprocessing**: `backend/app/ml/v3/preprocessing.py`
*   **Adversarial Validation**: `backend/app/ml/v3/validator.py`
*   **V3 Model Files**: `ml/models/v3/model.pkl`, `preprocessor.pkl`, `metadata.json`

### Frontend (Next.js)
*   **UI Dashboard**: `frontend/src/components/PredictionDashboard.tsx`
*   **Result Visualization**: `frontend/src/components/ResultsDisplay.tsx`
*   **Crop Explorer**: `frontend/src/components/CropExplorer.tsx`
*   **GIS Map Module**: `frontend/src/components/maps/MaharashtraMap.tsx`
*   **District Information**: `frontend/src/components/maps/DistrictPanel.tsx`

## 3. Stale & Obsolete Paths (Safe for Archive)

*   `backend/app/models/`: Legacy V1/V2 pickle models
*   `backend/app/api/routes/predict.py`: Obsolete V1 predict route
*   `backend/app/ml/preprocessing.py`, `feature_builder.py`, `shap_engine.py`: Stale pipeline files
