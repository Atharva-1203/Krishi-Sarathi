# Krishi Sarathi V5: Dataset Provenance & Diagnostics Report

This document reports data provenance, government Soil Health Card diagnostics, duplicates, and class distributions.

---

## 1. Physical Dataset Dimensions

We compile our final row counts from actual database outputs:

| Dataset | Raw Rows | Valid Rows | Labelled Rows | Training Eligible | Map Eligible |
| :--- | ---: | ---: | ---: | :---: | :---: |
| **V3.1 Base** | 2,200 | 2,200 | 2,200 | **YES** | **YES** |
| **7.9L Database** | 779,144 | 722,342 | 0 | **NO** | **YES** |
| **Crop-Fertilizer** | 4,513 | 4,513 | 4,513 | **NO** | **YES** |

---

## 2. 7.9L Soil Health Card Diagnostics

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

## 3. Discovered Anomalies & Filtration
- **Category A (Physically Impossible)**: 144 pH values outside $[0, 14]$, 91 negative Nitrogen values, and negative organic carbon records are discarded.
- **Category E (Unit Inconsistencies)**: Nitrogen values $> 200,000$ and Potassium values $> 800,000$ represent parts-per-million inputs and are filtered.
- **Deduplication**: We removed 7,271 exact duplicates and 1,154 chemistry-only duplicate cards.

---

## 4. Class Balance & Entropy (V3.1)
- **Class Balance**: 22 crops, perfectly balanced at 100 rows per class.
- **Shannon Entropy**: **4.4594 bits** (perfect theoretical maximum).
- **Imbalance Ratio**: **1.0** (zero prediction bias risk).
