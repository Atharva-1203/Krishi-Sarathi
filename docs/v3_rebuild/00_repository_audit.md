# V3 Rebuild: 00 Repository Audit

This document provides a forensic audit of the `Krishi-Sarathi` repository structure as of August 7, 2026.

## 1. Directory Structure Overview
The repository is organized into a frontend-backend architecture with a dedicated machine learning (ML) workspace:

*   **`backend/`**: FastAPI application serving prediction endpoints.
    *   `app/`: Main application package.
        *   `api/`: API router and versioned endpoint routes (`predict.py`, `health.py`, `version.py`, `model.py`, `metadata.py`).
        *   `core/`: Application settings, configuration, and logging setup.
        *   `exceptions/`: Custom exceptions and HTTP error handlers.
        *   `middleware/`: CORS and other server middleware.
        *   `ml/`: Legacy ML runtime components (`model_loader.py`, `preprocessing.py`, `feature_builder.py`, `shap_engine.py`, `validate_models.py`, `audit_dataset.py`).
        *   `models/`: Direct storage location for active model pickle and preprocessing artifacts (`model.pkl`, `preprocessor.pkl`, `label_encoder.pkl`, `metadata.json`, `feature_order.json`, `prediction_engine.py`).
        *   `schemas/`: Pydantic request and response models.
        *   `services/`: Business logic implementations (`prediction_service.py`, `explanation_service.py`).
        *   `tests/`: Test suite for checking routes, APIs, and golden cases.
*   **`frontend/`**: Next.js (TypeScript) web application.
    *   `src/`: Application source code.
        *   `app/`: App router page pages (`layout.tsx`, `page.tsx`, `globals.css`).
        *   `components/`: Visual dashboard widgets, results displays, sidebars, and maps (`PredictionDashboard.tsx`, `ResultsDisplay.tsx`, `AnalyticsPage.tsx`, `InsightsPage.tsx`, `LandingPage.tsx`).
        *   `store/`: Client-side state stores for settings and translation strings.
*   **`ml/`**: Machine learning development workspace.
    *   `datasets/`: Training data and dataset cards.
    *   `models/`: Registry of trained classifier versions (RF, ExtraTrees, XGBoost, etc.) and legacy model archives.
    *   `training/`: Model training pipelines (`train.py`, `download_dataset.py`).
    *   `preprocessing/`: Preprocessing functions used in training.
*   **`datasets/`**: Data directories containing raw, processed, integrated, and final versions of geographical and soil datasets.
*   **`docs/`**: Forensic logs, reports, and architecture specifications.

## 2. Git State Baseline
*   **Current Branch**: `feature/v3-clean-generalized-engine` (branched from `main`)
*   **Backup Tag**: `backup-before-v3-rebuild`
*   **Active Commit**: `c73b4fb` (feat: complete V3 ML Engine migration, shared feature contracts, and comparison documentation)

## 3. Key Environment Mappings
*   `MODEL_DIR`: Points to `d:\Techrush\ml\models\production` in `.env.example`, but falls back to `backend/app/models/` during local execution when running without environment variables.
*   `NEXT_PUBLIC_API_URL`: Points to local FastAPI instances running at `http://127.0.0.1:8000`.
