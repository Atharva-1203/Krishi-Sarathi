# Current System Audit (V5 Final Evolution)

This document provides a comprehensive audit of the baseline Krishi Sarathi repository state prior to executing the V5 Final Evolution.

---

## 1. Physical Code & File Inventory

- **FastAPI Backend Services**: 
  - [`backend/app/main.py`](file:///d:/Techrush/backend/app/main.py): Sets up the application routing, exception handlers, and loads the active model predictor.
  - [`backend/app/api/routes/predict_v3.py`](file:///d:/Techrush/backend/app/api/routes/predict_v3.py): Exposes the `/api/v3/predict` endpoint, implementing schema definitions (`PredictRequestV3`, `PredictResponseV3`) and invoking predictions.
  - [`backend/app/ml/v3/predictor.py`](file:///d:/Techrush/backend/app/ml/v3/predictor.py): Active prediction handler incorporating bounds checking, Platt probability normalization, vectorized local sensitivities, and natural language explanations.
- **Frontend Components**:
  - [`frontend/src/components/LandingPage.tsx`](file:///d:/Techrush/frontend/src/components/LandingPage.tsx): Root dashboard hero telemetry and disclaimer panel.
  - [`frontend/src/components/ModelAnalytics.tsx`](file:///d:/Techrush/frontend/src/components/ModelAnalytics.tsx): Renders data scale, quality scorecard audits, and precision/recall comparisons.
  - [`frontend/src/components/maps/DistrictPanel.tsx`](file:///d:/Techrush/frontend/src/components/maps/DistrictPanel.tsx): Tabbed panel displaying district soil averages, rainfall area graphs, crop production yields, and Shannon crop diversity.
- **Datasets**:
  - Labeled Model Predictor Base: [`ml/datasets/v3/dataset.csv`](file:///d:/Techrush/ml/datasets/v3/dataset.csv) (2,200 rows, 22 balanced crop classes, 7 continuous variables).
  - Observational Government Soil Base: [`datasets/processed/soil_health/soil_health_database.csv`](file:///d:/Techrush/datasets/processed/soil_health/soil_health_database.csv) (~779K rows, 18 columns, unlabeled).

---

## 2. Model Parameters & Baseline Metrics
- **Algorithm**: Platt-sigmoid calibrated Extremely Randomized Trees (ExtraTrees) Classifier.
- **Accuracy**: 99.55% (Stratified random split).
- **Macro F1-Score**: 99.40%.
- **Brier Score**: 0.0162.
- **Expected Calibration Error (ECE)**: 0.0708.
- **Inference Latency**: ~7.2 ms.

---

## 3. Absence of voice/speech features
We verified that the codebase contains no microphone components, audio libraries, or Web Speech API invocations, satisfying our strict competitor-decoupling requirements.
