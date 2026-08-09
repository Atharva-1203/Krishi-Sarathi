# Krishi Sarathi: 7.9 Lakh Government Dataset Forensics (Phase 10)

This report profiles the Soil Health Card government database (`datasets/processed/soil_health/soil_health_database.csv`) containing approximately 7.8 lakh records.

---

## 1. Dataset Overview
- **Row Count**: 779,144
- **Column Count**: 18
- **File Location**: `datasets/processed/soil_health/soil_health_database.csv`
- **Data Source**: Government of Maharashtra Soil Health Card registrations.

---

## 2. Column Classifications & Metadata

| Column | Type | Missing Rate | Minimum | Maximum | Classification |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Latitude** | float | 0.00% | 15.6238 | 79.3836 | GEOGRAPHIC |
| **Longitude**| float | 0.00% | 72.5532 | 112.0000 | GEOGRAPHIC |
| **Cycle** | int | 0.00% | 1 | 6 | TEMPORAL |
| **District** | string| 0.00% | N/A | N/A | GEOGRAPHIC |
| **Taluka** | string| 96.17% | N/A | N/A | GEOGRAPHIC |
| **Village** | string| 87.31% | N/A | N/A | GEOGRAPHIC |
| **N** | float | 0.01% | -239.59 | 278278.0 | CORE AGRONOMIC |
| **P** | float | 0.02% | -119.46 | 193381.0 | CORE AGRONOMIC |
| **K** | float | 0.02% | 0.00 | 834062.0 | CORE AGRONOMIC |
| **pH** | float | 0.03% | -27.31 | 8049.0 | CORE AGRONOMIC |
| **OC** | float | 0.02% | -421.93 | 83638.0 | DERIVED |
| **EC** | float | 0.00% | -10.67 | 2388.0 | CORE AGRONOMIC |
| **B** | float | 0.38% | -3.00 | 8631.0 | CORE AGRONOMIC |
| **Fe** | float | 11.21% | -24.14 | 36711.0 | CORE AGRONOMIC |
| **Mn** | float | 0.02% | -2.30 | 20864.0 | CORE AGRONOMIC |
| **Cu** | float | 0.02% | -3.00 | 4564.0 | CORE AGRONOMIC |
| **Zn** | float | 0.01% | -3.00 | 2026.0 | CORE AGRONOMIC |
| **S** | float | 0.39% | -12.17 | 76309.0 | CORE AGRONOMIC |

---

## 3. Duplicate & Leakage Forensics
- **Exact Duplicates**: 7,271 records ($0.93\%$ of the dataset) represent exact carbon-copy repeats.
- **Duplicate Feature Vectors**: 22,605 records have identical $[N, P, K, pH]$ coordinates with differing geographical tags.
- **Conflicting Labels**: $0.00\%$ conflicting target labels because the dataset contains **zero target crop suitability labels**.
- **Geographic/Location Leakage**: If coordinates (Latitude/Longitude) or District name are used in prediction, tree structures split on regional parameters rather than agronomy, leading to regional memorization.

---

## 4. Anomalies & Outliers
- **Negative Chemistry Metrics**:
  - Nitrogen (N): 91 negative values.
  - Phosphorus (P): 7 negative values.
  - pH: 13 negative values.
  - Organic Carbon (OC): 43 negative values.
  - EC: 30 negative values.
- **Impossible Parameter Values**:
  - pH of `-27.31` and `8049.0` (pH scale strictly $[0, 14]$).
  - N value of `278,278` (unrealistic for soil samples).
