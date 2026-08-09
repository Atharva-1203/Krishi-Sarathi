# Krishi Sarathi: Labeled Crop Dataset Search & Audit

This report logs our audits of datasets containing paired soil, climate, and crop labels.

---

## 1. Audited Labeled Sources

### A. V3 Crop Recommendation Dataset
- **Format**: CSV (`ml/datasets/v3/dataset.csv`).
- **Features**: 7 continuous variables ($N, P, K$, Temp, Humidity, pH, Rainfall).
- **Label**: Crop class (22 classes, perfectly balanced at 100 samples each).
- **Cleanliness**: 0 missing values, 0 duplicate rows.
- **Verdict**: **Champion training corpus.**

### B. Maharashtra Crop-Fertilizer Dataset (Raw)
- **Format**: CSV (`datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv`).
- **Features**: $N, P, K$, pH, Rainfall, Temp. Lacks Humidity.
- **Label**: Crop class (16 classes, highly skewed with 22.38% Sugarcane dominance).
- **Redundancy**: 0 exact duplicates; 77 feature-only duplicates.
- **Verdict**: **Incompatible for V3.1 contract** without synthetically interpolating the missing humidity column, which introduces leakage.

---

## 2. Unlabeled Database Integration Limits
The 779,144 government soil cards contain **zero crop labels**. Recommending crop suitability requires supervised training on crop tolerance boundaries. 

Because we cannot assign farm-level crop outcomes to these soil records without geographic leakage (ecological fallacy), the 7.9L database **cannot be added to the crop classification training corpus**.
