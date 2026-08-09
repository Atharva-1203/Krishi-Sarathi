# Krishi Sarathi: Final Round Master Upgrade Report (Phase 10)

This report documents the upgrades implemented for the Final Round of the hackathon.

---

## 1. What Changed
- **Voice Assistant Integration**: Added a browser-native voice assistant in `PredictionDashboard.tsx` utilizing the Web Speech API. Supports both English and Marathi keywords to automatically populate the 7 parameters on the UI.
- **Client-Side PDF Advisory Report**: Integrated `jsPDF` into `ResultsDisplay.tsx` to compile a professional, downloadable agricultural report receipt. It lists input features, top-5 recommendations with suitability indicators, and a legal disclaimer.
- **Forensic Dataset Auditing**: Audited the 779,144 records Maharashtra soil database and compiled findings, verifying its lack of labels and suitability for training the predictor.
- **Data Augmentation Verification**: Verified that synthetic data augmentation degrades calibration and accuracy, confirming the decision to train strictly on raw balanced records.

---

## 2. What Did Not Change
- **The Core ML Predictor**: We preserved the calibrated ExtraTrees model checkpoint (`ml/models/v3/model.pkl`), maintaining its 99.39% accuracy and 99.40% Macro-F1.
- **Feature Contract**: Kept the strictly ordered 7-parameter contract: $N, P, K$, temperature, humidity, pH, and rainfall.

---

## 3. Dataset Sources & Sizes
- **Prediction Model**: Kaggle Crop Recommendation Dataset (`ml/datasets/v3/dataset.csv`). Size: 2,200 rows, 22 classes.
- **GIS Map averages**: Soil Health Card Government Database (`datasets/processed/soil_health/soil_health_database.csv`). Size: 779,144 rows, 34 districts.

---

## 4. Data Quality
- **Predictor Dataset**: 100% clean. 0 nulls, 0 duplicate rows, perfectly balanced (100 rows per class).
- **Government Database**: High measurement noise (pH range: $[-27.31, 8049.0]$), 7,271 duplicate rows, missing climate features, and 0 crop target labels.

---

## 5. Crop Classes (22 Supported)
1. apple, 2. banana, 3. blackgram, 4. chickpea, 5. coconut, 6. coffee, 7. cotton, 8. grapes, 9. jute, 10. kidneybeans, 11. lentil, 12. maize, 13. mango, 14. mothbeans, 15. mungbean, 16. muskmelon, 17. orange, 18. papaya, 19. pigeonpeas, 20. pomegranate, 21. rice, 22. watermelon.

---

## 6. Model Benchmarking & Champion
- **Benchmark Winners**: ExtraTrees outperformed other algorithms with **99.39% accuracy**, **99.40% Macro-F1**, and a low Brier multi-class calibration score of **0.0162**.
- **Inference Latency**: Average of **~7.2 ms** under local stress testing.

---

## 7. Model Calibration & Probability
- **Method**: Sigmoid Platt Scaling.
- **UI Contract**: API returns calibrated probability scores. A backend verification constraint checks that probability vectors sum to $1.0 \pm 10^{-6}$ before returning results.

---

## 8. Out-of-Distribution (OOD) Detection
- Enforced at request parameters schema level (`validator.py`).
- **NORMAL**: Inputs within standard training limits.
- **CAUTION**: Inputs in the extreme distribution tails ($p_{01}$ or $p_{99}$). Returns a warnings list.
- **OUT_OF_DISTRIBUTION**: Invalid values (e.g. pH = 2.0). Blocked immediately at request boundary.

---

## 9. Explainability
- **Scorecard Deviation**: Calculates compatibility percentages based on target crop feature medians.
- **Local Sensitivity**: Computes suitability drift under $\pm5\%$ input shift.
- **Global Weights**: Extracts Gini feature split importances from the trees.

---

## 10. Decoupled GIS Map Layer
- **Maharashtra Map**: Uses local JSON district summaries to calculate a Soil Quality Index (SQI) and render district SVGs. Completely decoupled from the live ML prediction engine.

---

## 11. Automated Test Suite Verification
- **Test Framework**: Pytest.
- **Result**: **15/15 tests passed** successfully.
- **Compilation**: Next.js compiled in Turbopack mode with **0 errors and 0 warnings**.

---

## 12. Local Demo Instructions
To run the project on localhost:
1.  **Start Backend**:
    ```bash
    cd backend
    uvicorn backend.app.main:app --reload --port 8000
    ```
2.  **Start Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
3.  **URLs**:
    - Frontend Client: `http://localhost:3000`
    - Backend Swagger Docs: `http://127.0.0.1:8000/docs`
