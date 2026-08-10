# Dataset Construction & Partitioning

This document registers the final datasets, partition scopes, and row counts compiled from actual code outputs.

---

## 1. Core Data Product Table

| Dataset | Raw Rows | Valid Rows | Labelled Rows | Training Eligible | Map Eligible |
| :--- | ---: | ---: | ---: | :---: | :---: |
| **V3.1 Base** | 2,200 | 2,200 | 2,200 | **YES** | **YES** |
| **7.9L Database** | 779,144 | 722,342 | 0 | **NO** | **YES** |
| **Crop-Fertilizer** | 4,513 | 4,513 | 4,513 | **NO** | **YES** |

---

## 2. Integrated Products Architecture

- **dataset/crop_supervised_training/**: Cleaned, balanced 2,200-sample crop recommendation dataset.
- **dataset/soil_observations/**: 722,342 cleaned Soil Health Card records.
- **dataset/crop_statistics/**: District-level area, production, and yield records.
- **dataset/integrated_regional_intelligence/**: Decoupled visual layer mapping soil quality and weather indices.
