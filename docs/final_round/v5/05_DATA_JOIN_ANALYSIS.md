# Data Join Analysis

This report documents our feasibility studies on joining the 7.9L government database with weather and crop observations.

---

## 1. Spatial Resolution Matches
We evaluated matching the 779k cards to weather grids:
- **Spatial Resolution**: 779k records have coordinates. By mapping them to IMD weather grids ($0.25^\circ \times 0.25^\circ$), we can interpolate monthly precipitation and normal averages.
- **Uncertainty**: The interpolated values are regional proxies. While useful for display purposes, they are too coarse to serve as high-confidence predictors for local farms.

---

## 2. Crop-Target Join Limits
Fusing crop labels using district-level averages commits an **ecological fallacy**. Assigning the district's dominant crop (e.g. Grape for Nashik) to all soil cards would cause models to split nodes on administrative borders rather than crop chemistry. 

Therefore, the crop predictor model remains geography-blind, evaluating continuous parameters only.
