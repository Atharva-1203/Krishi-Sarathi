# V3.1 Champion vs. V4 Expanded Model Benchmark (V5 Final Evolution)

This report details the head-to-head performance evaluations of our Active V3.1 Champion against the V4 Expanded Model trained on combined datasets.

---

## 1. Benchmarking Matrix

We evaluated both models using 5-Fold Cross-Validation:

| Metric / Scenario | V3.1 Champion (Active Model) | V4 Expanded Model (Candidate) | Performance Status / Review |
| :--- | :---: | :---: | :--- |
| **Training Records** | **2,200** | 6,713 | V4 has larger sample size. |
| **Accuracy (Random Split)** | **99.55%** | 99.15% | 🟢 V3.1 is superior by $0.40\%$. |
| **Macro F1 (Random Split)** | **99.40%** | 99.08% | 🟢 V3.1 is superior by $0.32\%$. |
| **Spatial Holdout Accuracy** | **97.80%** | **45.95%** | 🟢 V3.1 generalizes; V4 collapses ($51.85\%$ drop). |
| **Spatial Holdout F1** | **97.50%** | **20.45%** | 🟢 V3.1 generalizes; V4 collapses ($77.05\%$ drop). |
| **Expected Calibration Error**| **0.0708** | 0.0820 | 🟢 V3.1 has lower calibration error. |
| **Multiclass Brier Score** | **0.0162** | 0.0215 | 🟢 V3.1 has lower uncertainty score. |
| **Sugarcane Dominance Rate**| **0.00%** | **24.50%** | 🟢 V3.1 has zero bias; V4 is heavily biased. |
| **Inference Latency** | **~7.2 ms** | ~7.5 ms | Statistically identical. |

---

## 2. Diagnostics Analysis

### A. Generalization Collapse (Spatial Holdout)
- **V3.1 Champion**: Location-blind agronomic features prevent the model from learning geographic markers. When evaluated on unseen districts, accuracy remains stable at **97.80%**.
- **V4 Expanded Model**: Includes regional crop samples from `crop_fertilizer_dataset_raw.csv` where humidity was proxy-imputed. The model splits nodes on these proxy indicators. When a district is held out entirely, the model fails to evaluate soil chemistry and defaults to the cash-crop dominant in training, causing accuracy to drop to **45.95%**.

### B. Sugarcane Dominance
The V4 candidate model overfits to Sugarcane due to class imbalance ($22.38\%$ Sugarcane samples). Monte Carlo simulations show the V4 model recommends Sugarcane in $24.50\%$ of all test sweeps.
