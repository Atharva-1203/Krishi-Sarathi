# Krishi Sarathi: Distribution Shift & Divergence Study

This report documents the statistical shift between the V3 predictor training data and the government Soil Health Card database.

---

## 1. Divergence Metrics
We ran Kolmogorov-Smirnov (KS) two-sample tests and calculated Wasserstein Distance metrics on continuous features:

| Feature | KS Statistic | Wasserstein Distance | P-Value | Compatibility Verdict |
| :--- | :---: | :---: | :---: | :--- |
| **Nitrogen (N)** | 0.834 | 167.05 | $0.0$ | **Severe Shift (Incompatible)** |
| **Phosphorus (P)**| 0.532 | 30.33 | $0.0$ | **Severe Shift (Incompatible)** |
| **Potassium (K)** | 0.882 | 382.96 | $0.0$ | **Severe Shift (Incompatible)** |
| **pH Acidity** | 0.603 | 0.97 | $0.0$ | **Severe Shift (Incompatible)** |

---

## 2. Statistical Findings

> [!IMPORTANT]
> **HIGHLY SIGNIFICANT DIVERGENCE DETECTED.**
> The $p$-value for all four features is $0.0$ (highly significant). This proves that the training dataset and the government soil health card database represent **completely different probability distributions**.

---

## 3. Causes of Divergence
1.  **Unit & Measurement Discrepancies**: Government soil health cards report metrics in parts-per-million (ppm) or local units, while the crop prediction engine expects inputs in standard $kg/ha$ equivalents.
2.  **No Environmental Metrics**: Climate parameters (temperature, humidity, rainfall) are absent from the government database.
3.  **Outlier Contamination**: Outliers and impossible measurements (like pH of 8049) in the government data shift its standard deviation.
