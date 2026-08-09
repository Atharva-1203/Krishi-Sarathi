# Krishi Sarathi: 7.9 Lakh Government Dataset Forensics

This report documents the statistical profiling of the Soil Health Card government database.

---

## 1. Physical Dataset Dimensions
- **Total Rows**: 779,144
- **Total Columns**: 18

---

## 2. Statistical Profiles

### Nitrogen (N) (kg/ha)
- **Mean**: 217.56 | **Std**: 547.21
- **Percentiles**:
  - p01: 22.6 | p05: 77.77
  - p25: 148.0 | p50: 193.17 | p75: 253.0
  - p95: 414.16 | p99: 681.43
- **Outliers (IQR method)**: 40,489 records
- **Anomalies**: Max value is `278,278` (Physically impossible for soil reserves) and contains 91 negative values.

### Soil pH (pH)
- **Mean**: 7.54 | **Std**: 25.20
- **Percentiles**:
  - p01: 5.0 | p05: 5.93
  - p25: 7.19 | p50: 7.60 | p75: 7.90
  - p95: 8.32 | p99: 8.64
- **Outliers**: 56,503 records
- **Anomalies**: Minimum is `-27.31` and Maximum is `8,049.0` (Scale must strictly sit in $[0.0, 14.0]$).

---

## 3. Anomaly Classifications

- **Physically Impossible (Category A)**:
  - negative values: N (91 cases), P (7 cases), pH (144 cases), OC (43 cases), EC (30 cases).
  - pH extremes: pH values of `-27.31` and `8049.0` are chemical impossibilities.
- **Unit Inconsistencies (Category E)**:
  - Nitrogen values $> 100,000$ and Potassium $> 800,000$ suggest coordinates or survey metadata were erroneously recorded inside chemistry fields.
- **Verdict**: The 7.9L database is highly contaminated with noise and cannot be used for supervised training without strict range filtering.
