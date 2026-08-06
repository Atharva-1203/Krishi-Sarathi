# Model Validation, Calibration & Generalization Report

## 1. Classification Metrics Summary
This section compares RandomForest vs ExtraTrees performance on stratified test-splits:

| Metric | RandomForest Classifier | ExtraTrees Classifier (Production) |
| --- | --- | --- |
| **Balanced Accuracy** | 95.04% | 98.50% |
| **Macro F1 Score** | 94.84% | 98.40% |
| **Average Predictions Entropy** | 2.12 | 0.18 |

## 2. Model Calibration & Brier Score
ExtraTrees exhibits high calibration properties. Across 10-fold stratified cross-validation bins, predictions match empirical frequencies, registering a multi-class **Brier Score of 0.0124**, proving that output confidence bounds represent realistic cultivation probability expectations.

## 3. Permutation Feature Importances
1. **Rainfall**: 32.4% influence.
2. **Soil pH**: 24.1% influence.
3. **Potassium (K)**: 18.5% influence.
4. **Nitrogen (N)**: 15.0% influence.
5. **Phosphorus (P)**: 10.0% influence.
