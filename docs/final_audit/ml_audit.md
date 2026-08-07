# ML Audit

This document inventories the champion crop prediction model training statistics, evaluation parameters, and preprocessing steps.

## 1. Preprocessing Configuration
*   **Scale Transformation**: StandardScaler fitted on the 7 inputs during training and exported as `preprocessor.pkl`.
*   **Calibration**: Isotonic regression-based probability calibration applied to ensure predictions match observed accuracy.

## 2. Champion Model Information
*   **Algorithm**: ExtraTrees Classifier.
*   **Dataset Rows**: 2,200 samples.
*   **Features**: Exactly 7 features (N, P, K, temperature, humidity, pH, rainfall).
*   **Accuracy / F1**: `99.39%` cross-validated accuracy.
*   **Top-3 Accuracy**: `100.00%`.
*   **Model Size**: `14.6 MB` pickle file.
