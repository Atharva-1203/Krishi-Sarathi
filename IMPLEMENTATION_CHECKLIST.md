# Krishi Sarathi Implementation Checklist

This checklist tracks model implementation tasks starting in Phase 6.

## 1. Data Pipeline
- [x] Implement `scripts/download_data.py` to retrieve raw data
- [x] Implement `scripts/clean_data.py` to run district spelling corrections
- [x] Implement `scripts/merge_data.py` to compile the database

## 2. ML Development
- [x] Load dataset configurations from `ml/configs/`
- [x] Implement numeric scaling and categorical encoding scripts in `ml/preprocessing/`
- [x] Implement hyperparameter tuning loop using Optuna/RandomizedSearchCV in `ml/training/`
- [x] Track modeling runs in `experiments/experiment_tracking.md`
- [x] Save best model binary to `ml/models/best_model/`

## 3. Explainability
- [x] Implement SHAP explainer in `ml/explainability/`
- [x] Write text templates translation logic for farmer local force plots

## 4. API serving
- [x] Build FastAPI server codebase in `backend/`
- [x] Implement input validation schemas and error handling fallbacks

## 5. UI frontend
- [x] Build React/Next.js dashboard visualizer in `frontend/`
- [x] Integrate interactive leaf-plot charts for local explanations
