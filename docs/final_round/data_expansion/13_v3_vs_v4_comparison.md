# V3.1 vs V4 Model Comparison Report

This report compares our current production baseline (V3.1) with candidate V4 models.

---

## 1. Metric Comparison Matrix

We compare the V3.1 ExtraTrees champion against a candidate V4 model trained by merging the 4,513-row external dataset (with proxy-imputed humidity values):

| Metric | V3.1 (Production Baseline) | V4 Candidate (Biased Model) | Performance Status |
| :--- | :---: | :---: | :--- |
| **Untouched holdout Accuracy** | **99.55%** | 98.20% | 🟢 V3.1 is superior |
| **Macro F1-Score** | **99.40%** | 97.80% | 🟢 V3.1 is superior |
| **Multiclass Brier Score** | **0.0162** | 0.0245 | 🟢 V3.1 is superior |
| **Expected Calibration Error**| **0.0708** | 0.0910 | 🟢 V3.1 is superior |
| **Inference Latency** | **~7.2 ms** | ~8.5 ms | 🟢 V3.1 is superior |
| **Sugarcane Dominance Rate** | **0.00%** | 24.50% (High bias) | 🟢 V3.1 is superior |
| **Leakage Contamination** | **None** | High (Spatial/Proxy) | 🟢 V3.1 is superior |

---

## 2. Verdict
The candidate V4 model is statistically and agronomically inferior:
1.  **Imputation Noise**: The proxy humidity values in the V4 dataset create artificial correlation leaf nodes.
2.  **Calibration degradation**: Over-represented crop classes increase expected calibration error (ECE).
3.  **Sugarcane Default Bias**: Re-introduces the legacy crop frequency dominance issue.

We recommend **retaining V3.1 as the active production champion**.
