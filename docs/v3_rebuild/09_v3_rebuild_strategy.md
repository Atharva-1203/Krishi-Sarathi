# V3 Rebuild: 09 V3 Rebuild Strategy

This document outlines the architectural strategy for the V3 crop prediction engine.

## 1. Core Principles
The V3 engine shifts from regional heuristic rules to a pure data-driven classification paradigm:

*   **Strict 7-Parameter Input**: Model inputs are limited to `N`, `P`, `K`, `temperature`, `humidity`, `ph`, and `rainfall`.
*   **Geographic Independence**: District, Division, Coordinates, Soil Color, and Growing Season are completely removed from the machine learning model inputs.
*   **Zero-Drift Architecture**: A single, shared feature builder is imported by both the offline training pipeline and the active serving API.
*   **Pure Probabilities**: All crop recommendation rankings originate directly from `predict_proba()`. There are no weighted overrides, regional prior adjustments, or penalty subtractions.
*   **Input Validity Protection**: An explicit out-of-distribution (OOD) validation layer inspects features against training limits, returning explicit flags/warnings to the UI rather than manipulating probabilities.

## 2. Dataset Selection
*   We select the **2,200-sample Kaggle Crop Recommendation Dataset** containing 22 balanced crop classes (100 samples per class). This solves the Sugarcane class imbalance at its root.

## 3. Modeling and Calibration
*   **Classifier Benchmark**: We evaluate Logistic Regression, Decision Tree, Random Forest, Extra Trees, HistGradientBoosting, XGBoost, LightGBM, and CatBoost.
*   **Stratification**: Evaluated using 70-15-15 train-val-test split and 5-fold stratified cross-validation.
*   **Calibration check**: Evaluates Expected Calibration Error and Brier Score, applying calibration if raw classifier outputs are distorted.

## 4. UI/UX Separation
*   **V3 API Path**: Exposes `POST /api/v3/predict` taking only the seven features.
*   **Frontend**: Simplifies the form to remove District, Soil Color, and Growing Season. Displays top-5 crops with pure probabilities, OOD alerts, and measured metrics.
*   **Map decoupling**: The government analytical map is kept completely isolated from the model prediction pipeline.
