# Candidate Labeled Datasets Report

This document profiles the labeled datasets evaluated for predictor training.

---

## 1. Audited Labeled Datasets

### Candidate A: Kaggle Crop Recommendation Dataset
- **Tier**: Tier 4 (Provenance tracked to peer-reviewed agricultural research publications).
- **Rows**: 2,200 | **Columns**: 8 (NPK, pH, Temp, Humidity, Rainfall, Label).
- **Classes**: 22 crops, perfectly balanced at 100 rows per crop.
- **Data Quality**: 0 missing values, 0 duplicate rows, clean continuous distributions.
- **Verdict**: **Champion training corpus.**

### Candidate B: Labeled Crop-Fertilizer Dataset (Raw)
- **Tier**: Tier 3 (Well-documented regional database).
- **Rows**: 4,513 | **Columns**: 11 (NPK, pH, Rainfall, Temp, Crop, Fertilizer, etc.).
- **Classes**: 16 crops, highly imbalanced (22.38% Sugarcane, 19.03% Wheat).
- **Data Quality**: **Humidity is missing** from the features.
- **Verdict**: Incompatible for V3.1 contract. Merging it requires proxy-imputing humidity (as done in `master_dataset.csv`), which introduces artificial correlation leakage.
