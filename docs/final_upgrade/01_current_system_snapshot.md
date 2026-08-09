# Krishi Sarathi: V3.1 Current System Snapshot

This document records the exact state of the Krishi Sarathi repository prior to starting the Final Round Upgrade (Phase 10).

---

## 1. Machine Learning Model & Artifacts
- **Algorithm**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Model File**: `ml/models/v3/model.pkl` (14.5 MB)
- **Preprocessor File**: `ml/models/v3/preprocessor.pkl` (under 1 KB)
- **Metadata File**: `ml/models/v3/metadata.json`
- **Features (7 strictly ordered)**:
  1. `N` (Nitrogen)
  2. `P` (Phosphorus)
  3. `K` (Potassium)
  4. `temperature` (Celsius)
  5. `humidity` (%)
  6. `ph` (pH unit)
  7. `rainfall` (mm)
- **Preprocessing Scale**: MinMax Scaler mapping parameters to $[0, 1]$ based on training limits.
- **Target Classes**: 22 crops (100 balanced samples each).
- **Probability Calibration**: Sigmoid Platt Scaling.
- **Out-of-Distribution (OOD)**: Rejects physical anomalies (like pH = 2.0) and warns (CAUTION) on extreme tail distribution entries.

---

## 2. Core Metrics
- **Accuracy**: 99.39%
- **Macro F1-Score**: 99.40%
- **Brier Multi-Class Score**: 0.0162
- **Inference Latency**: ~7 ms
- **Sugarcane Bias rate**: 0.00% on random inputs

---

## 3. Backend & API Server
- **Framework**: FastAPI (served via Uvicorn).
- **Port**: 8000
- **Routing**:
  - `POST /api/v3/predict`: Accepts `PredictRequestV3` (strictly 7 inputs), runs OOD, scales, predicts, and returns suitability scorecards and sensitivities.
  - `GET /api/v3/model`: Returns crop profiles, metadata, and weights.
  - `GET /api/v1/health`: Checks model load status.
  - `GET /api/v1/version`: Returns version version tag `"V3.1"`.

---

## 4. Frontend Web App
- **Framework**: Next.js 16.3.0, React 19, TailwindCSS, Framer Motion.
- **Pages**:
  - `page.tsx` (Homepage / Hero / Taxonomic Explorer)
  - `PredictionDashboard.tsx` (Form Input / loading states / error banners)
  - `ResultsDisplay.tsx` (Top-5 recommendation cards / Scorecards / Sensitivity perturbed sweeps / Global Feature weights)
  - `MaharashtraMap.tsx` & `DistrictTooltip.tsx` (Choropleth GIS Map loading static JSON)
  - `AnalyticsPage.tsx` (Confusion Matrix heatmap grid / crop-wise performance table)

---

## 5. Map & Analytics Data
- **Dataset Source**: Soil Health Card government database of **779,144 records**.
- **Index File**: `frontend/public/maps/district_soil_data.json` containing averages of soil elements by district.
- **Calculation**: Computes a Soil Quality Index (SQI) to color district SVG polygons. Decoupled from ML predictions.

---

## 6. Testing & Regression
- **Framework**: Pytest.
- **Scripts**: 15 test scripts located in `tests/v3/` validating API contract, parity, features, OOD, and bias.

---

## 7. Known Limitations
- Recommended crops are advisory suitability guides; they do not factor in seasonal pricing, seeds availability, or local water table levels.
- Preprocessing and OOD range checks are static.
