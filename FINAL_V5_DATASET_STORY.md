# Krishi Sarathi V5: Dataset Diagnostics & Story

This document registers our data product manifest, cleaning logs, and class distribution stats.

---

## 1. Core Data Product Table

| Dataset | Raw Rows | Valid Rows | Labelled Rows | Training Eligible | Map Eligible |
| :--- | ---: | ---: | ---: | :---: | :---: |
| **V3.1 Base** | 2,200 | 2,200 | 2,200 | **YES** | **YES** |
| **7.9L Database** | 779,144 | 722,342 | 0 | **NO** | **YES** |
| **Crop-Fertilizer** | 4,513 | 4,513 | 4,513 | **NO** | **YES** |

---

## 2. Discovered Anomalies & Cleaned Records
- **Category A (Physically Impossible)**: 144 pH values outside $[0, 14]$, 91 negative Nitrogen values, and negative organic carbon records are discarded.
- **Category E (Unit Inconsistencies)**: Nitrogen values $> 200,000$ and Potassium values $> 800,000$ represent parts-per-million inputs and are filtered.
- **Deduplication**: We removed 7,271 exact duplicates and 1,154 chemistry-only duplicate cards.

---

## 3. Class Balance & Entropy (V3.1)
- **Class Balance**: 22 crops, perfectly balanced at 100 rows per class.
- **Shannon Entropy**: **4.4594 bits** (perfect theoretical maximum).
- **Imbalance Ratio**: **1.0** (zero prediction bias risk).
