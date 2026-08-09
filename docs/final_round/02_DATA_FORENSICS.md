# Krishi Sarathi: Government Soil Dataset Forensics

This document presents a comprehensive data-science audit of the 7.8/7.9 lakh record government Soil Health Card database.

---

## 1. Physical Dataset Metrics
- **Total Records**: 779,144 rows
- **Total Features**: 18 columns
- **Format**: CSV (`datasets/processed/soil_health/soil_health_database.csv`)

---

## 2. Duplicate Analysis
- **Exact Duplicates**: 7,271 rows ($0.93\%$) represent exact repeats.
- **Duplicate Feature Coordinates**: 22,605 records have identical continuous parameters $[N, P, K, pH]$ but different geo-tags.
- **Conflicting Labels**: $0.00\%$ (no target crop labels exist in the database).

---

## 3. Physical Value Range & Anomaly Audit
Anomalous features in the dataset reveal significant measurement noise:

- **Soil pH**: Minimum is `-27.31` and Maximum is `8049.0`. A pH value outside $[0, 14]$ represents a physical impossibility.
- **Nitrogen (N)**: Max value is `278,278` mg/kg (unrealistic for soil health tests) and contains 91 negative values.
- **Phosphorus (P)**: Max value is `193,381` mg/kg and contains 7 negative values.
- **Organic Carbon (OC)**: Min is `-421.93` and Max is `83,638.0`.

---

## 4. Feature Taxonomy Mapping

| Feature | Missing Rate | Minimum | Maximum | Classification |
| :--- | :---: | :---: | :---: | :--- |
| **Latitude** | 0.00% | 15.6238 | 79.3836 | GEOGRAPHIC |
| **Longitude**| 0.00% | 72.5532 | 112.0000 | GEOGRAPHIC |
| **Cycle** | 0.00% | 1 | 6 | TEMPORAL |
| **District** | 0.00% | N/A | N/A | GEOGRAPHIC |
| **N** | 0.01% | -239.59 | 278278.0 | CORE AGRONOMIC |
| **P** | 0.02% | -119.46 | 193381.0 | CORE AGRONOMIC |
| **K** | 0.02% | 0.00 | 834062.0 | CORE AGRONOMIC |
| **pH** | 0.03% | -27.31 | 8049.0 | CORE AGRONOMIC |
| **OC** | 0.02% | -421.93 | 83638.0 | DERIVED |
| **EC** | 0.00% | -10.67 | 2388.0 | CORE AGRONOMIC |
