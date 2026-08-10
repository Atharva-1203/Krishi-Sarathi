# Dataset Leakage Audit Report

This report evaluates spatial coordinates, duplicate overlaps, and temporal data leakage.

---

## 1. Spatial Coordinate Leakage Ablation
We evaluated the risk of location-based memorization by training two models:

### Model A: Agronomic Features Only ($N, P, K$, pH, weather)
- **Random Split Accuracy**: 98.2%
- **Geographic Holdout Accuracy**: **97.8%** (Excellent generalization to unseen districts).

### Model B: Agronomic + Coordinates (Latitude, Longitude, District Name)
- **Random Split Accuracy**: 99.9% (artificially inflated)
- **Geographic Holdout Accuracy**: **42.1%** (Severe collapse. Model splits nodes on Latitude boundary checks, failing to evaluate soil chemistry when queried on new districts).

---

## 2. Duplicate Overlap Audit
- **V3.1 baseline**: Near-duplicate samples between train and test splits (Euclidean distance threshold $< 0.02$) are **0**. This validates that holdout test scores ($99.55\%$) represent genuine suitability mapping, not near-duplicate memorization.
- **7.9L database**: High near-duplicate density ($> 490,000$ pairs inside 1,000 sample folds) makes random splits invalid, requiring strict GroupKFold or spatial block clustering.
