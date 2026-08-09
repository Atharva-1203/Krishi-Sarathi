# Krishi Sarathi: Current System Audit (Phase 10)

This document records the forensic architecture audit of the current V3.1 Krishi Sarathi project.

---

## 1. Current V3 Architecture
The platform is organized into two completely decoupled visual and computational layers:
- **Agronomic crop prediction engine**: Evaluates the 7-feature soil profile and returns calibrated classification probabilities. Strictly blind to coordinates or district.
- **Regional Soil Health GIS map**: Renders averages computed from the government Soil Health Card database. Separated from live ML prediction workflows.

---

## 2. Current Prediction Flow
```
User Inputs ➔ Next.js Form ➔ Schema validation (Pydantic) ➔ OOD Range Gate ➔ MinMax Scaling ➔ ExtraTrees Classifier ➔ Platt Calibration ➔ Scorecard Fit Index ➔ JSON API Response ➔ Results Dashboard
```

---

## 3. Current Model
- **Algorithm**: Extremely Randomized Trees (ExtraTrees) Classifier (`ml/models/v3/model.pkl`).
- **Hyperparameters**: `n_estimators=100`, `random_state=42`, Gini criterion splits.

---

## 4. Current Preprocessing & Feature Contract
- **Scaler**: MinMax Scaler mapping continuous metrics to $[0, 1]$ boundaries.
- **Contract Features**:
  1. `N` (Nitrogen)
  2. `P` (Phosphorus)
  3. `K` (Potassium)
  4. `temperature` (Celsius)
  5. `humidity` (%)
  6. `ph` (pH index)
  7. `rainfall` (mm)

---

## 5. Current Dataset
- **Training Set**: Kaggle Crop Recommendation Dataset (`ml/datasets/v3/dataset.csv`).
- **Rows**: 2,200 (balanced with exactly 100 samples per crop class).
- **Missing values**: 0.
- **Duplicate rows**: 0.

---

## 6. Current OOD System
- Checks input vectors against the minimum and maximum boundaries of the training dataset.
- Inputs with values outside physical limits (e.g., pH < 0.0 or > 14.0) are rejected with HTTP 422.
- Inputs in the tails of the training distribution (e.g. pH < 4.5 but > 3.5) trigger a `CAUTION` warning.

---

## 7. Current Map Architecture
- Renders district SVG polygons dynamically by indexing averages stored in `district_soil_data.json`.
- Uses a Soil Quality Index (SQI) formula to determine visual color maps.

---

## 8. Current Frontend/Backend Relationship
- Enforced strictly by Pydantic models.
- Communication uses JSON payloads over FastAPI routers mounted at `/api/v3`.

---

## 9. Current Testing Suite
- **Pytest**: 15 tests inside `tests/v3/` verifying contract constraints, calibration sums, OOD range gates, and bias frequencies.

---

## 10. Current Model Limitations
- Recommended crops are advisory only; they do not factor in dynamic market crop prices or regional seed logistics.
- The model evaluates seasonal climatology instead of real-time weather alerts.

---

## 11. What Must NOT Be Broken
- **Decoupled Prediction Path**: The Live Crop Predictor must remain blind to geographical indices (District, Taluka, coordinates) to prevent sugarcane bias.
- **Model Checkpoint**: The baseline V3 classifier must remain untouched and recoverable.
