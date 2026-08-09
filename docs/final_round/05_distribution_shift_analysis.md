# Krishi Sarathi: Distribution Shift & Overlap Analysis

This report compares parameter distributions between the 2,200 crop predictor dataset and the 7.9 lakh soil health card dataset.

---

## 1. Feature Distribution Comparison

We calculated summary percentiles for core continuous features in both datasets:

### Nitrogen (N) (kg/ha)
- **V3 Predictor**: Range: `[0, 140]`, Median: `57.0`, Std: `39.1`
- **7.9L Database**: Range: `[-239, 278278]`, Median: `193.1`, Std: `547.2`
- **PSI (Population Stability Index)**: $> 0.5$ (Severe shift; government SHC records are measured on a different scale).

### Soil pH (pH)
- **V3 Predictor**: Range: `[3.5, 9.9]`, Median: `6.4`, Std: `0.77`
- **7.9L Database**: Range: `[-27.31, 8049]`, Median: `7.6`, Std: `25.2`
- **PSI**: $> 0.4$ (Severe outlier noise in the large dataset).

---

## 2. Statistical Divergence Testing

We applied Kolmogorov-Smirnov (KS) tests and calculated Wasserstein Distance metrics for continuous features:

| Feature | KS Statistic | Wasserstein Distance | Compatibility Verdict |
| :--- | :---: | :---: | :--- |
| **N** | 0.612 | 160.5 | **Incompatible** (Scale mismatch) |
| **P** | 0.589 | 11.8 | **Incompatible** (Scale mismatch) |
| **K** | 0.694 | 388.0 | **Incompatible** (Scale mismatch) |
| **pH** | 0.551 | 1.2 | **Incompatible** (Anomalous pH metrics) |

---

## 3. Findings
The large dataset exhibits severe distribution shifts compared to the crop predictor dataset. This divergence is driven by:
1.  **Measurement Scale Discrepancies**: Government soil health cards report metrics in parts-per-million (ppm) or local units, while the crop prediction engine expects inputs in standard $kg/ha$ equivalents.
2.  **Telemetry Gaps**: Climate parameters (temperature, humidity, rainfall) are absent from the government database.
