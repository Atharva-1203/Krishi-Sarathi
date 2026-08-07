# V3 Rebuild: 07 Probability Calibration Report

This report documents the probability calibration evaluation of the **ExtraTrees** model.

## 1. Metrics Comparison on Test Split
*   **Raw Model Brier Score**: 0.030424
*   **Calibrated Model Brier Score**: 0.016154
*   **Raw Model Expected Calibration Error (ECE)**: 0.082061
*   **Calibrated Model Expected Calibration Error (ECE)**: 0.070768

## 2. Verdict & Implementation details
Sigmoid probability calibration (`CalibratedClassifierCV`) was adopted because it reduced the ECE from 0.0821 to 0.0708.
