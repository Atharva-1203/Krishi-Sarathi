# 779K Government Dataset Forensics

This report documents our statistical re-audit of the 779,144 Soil Health Card records.

---

## 1. Physical Dataset Dimensions
- **Total Physical Rows**: 779,144
- **Total Columns**: 18

---

## 2. Statistical Profiles

### Nitrogen (N) (kg/ha)
- **Mean**: 217.56 | **Std**: 547.21 | **Missing**: 0.006%
- **Percentiles**:
  - p01: 22.60 | p05: 77.77
  - p25: 148.00 | p50: 193.17 | p75: 253.00
  - p95: 414.16 | p99: 681.43
  - Min: -239.59 (Anomalous) | Max: 278,278.0 (Corrupted)

### Soil pH (pH)
- **Mean**: 7.54 | **Std**: 25.20 | **Missing**: 0.027%
- **Percentiles**:
  - p01: 5.00 | p05: 5.93
  - p25: 7.19 | p50: 7.60 | p75: 7.90
  - p95: 8.32 | p99: 8.64
  - Min: -27.31 (Anomalous) | Max: 8049.0 (Corrupted)

---

## 3. Anomaly Classifications

- **Physically Impossible (Category A)**:
  - Negative values: N (91 cases), P (7 cases), pH (144 cases), OC (43 cases), EC (30 cases).
  - Out of bounds pH: pH values $< 3.5$ or $> 10.0$ are rare, while negative values and values $> 14.0$ (maximum of 8,049.0) represent database corruption.
- **Unit Inconsistencies (Category E)**:
  - Potassium values $> 800,000$ and Nitrogen $> 200,000$ suggest coordinates or record IDs were misaligned during SQL import scripts.
- **Duplicate Records**: 7,271 exact row duplicates exist, with over 5.77% of cards sharing identical feature chemistry values.
