# Final Evolution Plan - Krishi Sarathi V5

This document details the master blueprint to transform Krishi Sarathi into an enterprise-grade Agricultural Decision Intelligence Platform for the hackathon final round.

---

## 1. CURRENT SYSTEM
- **Model**: Platt-sigmoid calibrated Extremely Randomized Trees (ExtraTrees) Classifier.
- **Continuous Features (7)**: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`.
- **Target Classes**: 22 crops, perfectly balanced at 100 rows per crop.
- **Dataset Size**: 2,200 labeled observations.
- **Performance**: Holdout accuracy ~99.55%, ECE ~0.0708, Brier score ~0.0162.
- **Observational Assets**: ~779,144 Maharashtra Soil Health Card records.

---

## 2. PROBLEM & GAP ANALYSIS
1.  **Limited Predictor Scale**: 2,200 samples look small compared to competitors claiming 5-6 lakh rows.
2.  **Decoupled Observational Data**: The 7.9L database lacks crop labels, preventing simple supervised concatenation.
3.  **Lack of What-If Simulation**: Users cannot interactively see how tweaking parameters affects crop probabilities.
4.  **No Farm Digital Twin**: Lack of a visual farm representation aggregating health, climate, and water indices.
5.  **No Counterfactual Engine**: The model does not recommend how a farmer can achieve success for a specific crop.

---

## 3. PROPOSED ARCHITECTURE
We transition the project from a "crop predictor" to an **AI-powered Agricultural Decision Intelligence Platform** combining:
- Calibrated ML Crop Predictor (Layer 1)
- Soil/observational data layers (Layer 2)
- Interactive What-If Simulator & Counterfactual Engine
- Visual Farm Digital Twin Profile
- Expanded GIS Map Observatory

---

## 4. DATA PLAN
- **No Data Fabrication**: Keep training and pseudo-labeling strictly separated.
- **7.9L Soil Cards**: Utilized for representation clustering and visual maps (soil parameters, rainfall, crop diversity).
- **Provenances**: Cleanly documented in the frontend and `DATA_SOURCE_REGISTRY.md`.

---

## 5. MODEL PLAN
- Benchmarking ExtraTrees vs HistGradientBoosting, Random Forest, Logistic Regression.
- Probability calibration checks to minimize Expected Calibration Error.
- Vectorized local sensitivities computation for What-If scenario simulations.

---

## 6. VALIDATION & TESTS
- Perform stratified splits, spatial GroupKFold cross-validation, and temporal cycle splits.
- Run `pytest -v` and `npm run build` to verify backend and frontend compile green.

---

## 7. FRONTEND & UX
- **Farm Digital Twin**: Render circular gauges for Soil, Climate, and Water compatibility.
- **What-If Panels**: Sliders for continuous parameters with real-time probability charts.
- **GIS Observatory**: Overhaul the Maharashtra sidebar with Recharts bar, line, and radar plots.

---

## 8. RISKS & ROLLBACK
- **Risk**: Merging skewed datasets introduces regional memorization.
- **Mitigation**: Retain Platt-calibrated V3.1 ExtraTrees as the production champion if the merged model collapses under spatial validation.
- **Rollback**: Target Git branch `feature/final-round-v5-agri-intelligence` backed up with tag `backup-before-final-evolution`.
