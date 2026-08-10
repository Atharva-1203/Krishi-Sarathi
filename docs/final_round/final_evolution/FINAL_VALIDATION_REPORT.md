# Final Validation Report (V5 Final Evolution)

This document registers our spatial and temporal validation splits.

---

## 1. Validation Matrix

We evaluate V3.1 (geography-blind balanced model) against the candidate V5 model trained on merged external datasets:

| Metric | V3.1 (Active Champion) | V5 Candidate (Biased Model) | Performance Status |
| :--- | :---: | :---: | :--- |
| **Accuracy** | **99.55%** | 99.15% | 🟢 V3.1 is superior |
| **Macro F1-Score** | **99.40%** | 99.08% | 🟢 V3.1 is superior |
| **Multiclass Brier Score** | **0.0162** | 0.0215 | 🟢 V3.1 is superior |
| **Expected Calibration Error**| **0.0708** | 0.0820 | 🟢 V3.1 is superior |
| **Spatial Holdout Accuracy** | **97.80%** | 45.95% (Generalization collapse) | 🟢 V3.1 is superior |
| **Spatial Holdout F1** | **97.50%** | 20.45% (Generalization collapse) | 🟢 V3.1 is superior |
| **Sugarcane Dominance** | **0.00%** | 24.50% (High bias) | 🟢 V3.1 is superior |
| **Leakage Contamination** | **None** | High (Imputed proxy attributes) | 🟢 V3.1 is superior |
