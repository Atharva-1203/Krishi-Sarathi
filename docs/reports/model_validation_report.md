# Production Model Validation Report

This report documents the validation audits performed on the promoted ExtraTrees model binary.

## 1. Leakage Controls
- **Target Leakage**: Discarded `Fertilizer` from the feature set. Model has no access to post-sowing variables.
- **Preprocessing Leakage**: Scaling values (mean, std) and missing imputations (medians) are calculated strictly on the training partition and cached inside `preprocessor.pkl`.
- **Reproducibility**: Model parameters are fixed using `random_state=42`. All test evaluation loops return identical accuracy scores (`F1-macro: 0.9959`).
