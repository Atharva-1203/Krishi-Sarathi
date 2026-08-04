# Krishi Sarathi Implementation Checklist

This checklist tracks model implementation tasks starting in Phase 6.

## 1. Data Pipeline
- [ ] Implement `scripts/download_data.py` to retrieve raw data
- [ ] Implement `scripts/clean_data.py` to run district spelling corrections
- [ ] Implement `scripts/merge_data.py` to compile the database

## 2. ML Development
- [ ] Load dataset configurations from `ml/configs/`
- [ ] Implement numeric scaling and categorical encoding scripts in `ml/preprocessing/`
- [ ] Implement hyperparameter tuning loop using Optuna/RandomizedSearchCV in `ml/training/`
- [ ] Track modeling runs in `experiments/experiment_tracking.md`
- [ ] Save best model binary to `ml/models/best_model/`

## 3. Explainability
- [ ] Implement SHAP explainer in `ml/explainability/`
- [ ] Write text templates translation logic for farmer local force plots

## 4. API serving
- [ ] Build FastAPI server codebase in `backend/`
- [ ] Implement input validation schemas and error handling fallbacks

## 5. UI frontend
- [ ] Build React/Next.js dashboard visualizer in `frontend/`
- [ ] Integrate interactive leaf-plot charts for local explanations
