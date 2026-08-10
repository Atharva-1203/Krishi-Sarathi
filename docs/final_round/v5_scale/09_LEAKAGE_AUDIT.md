# Leakage Prevention Audit

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

## 2. Leakage Mitigation Evidence
Models that include administrative attributes (like District name or coordinates) split nodes on these spatial parameters during training. While this raises random split test accuracy to 99.9%, it causes geographic holdout accuracy to collapse on unseen regions. 

Excluding geographic features ensures the model evaluates soil chemistry only, guaranteeing spatial stability.
