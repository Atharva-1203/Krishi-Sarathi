# Dataset Compatibility Matrix (V5 Final Evolution)

This matrix compares the schema structure and variables of the primary candidate databases against our production champion model contract.

---

## 1. Feature Availability Comparison

| Variable | Predictor Base (V3.1) | Crop-Fertilizer Raw | Soil Health Cards | Status / Action Needed |
| :--- | :---: | :---: | :---: | :--- |
| **Nitrogen (N)** | Yes | Yes (Nitrogen) | Yes (N) | Compatible (Standardized name to `N`) |
| **Phosphorus (P)** | Yes | Yes (Phosphorus) | Yes (P) | Compatible (Standardized name to `P`) |
| **Potassium (K)** | Yes | Yes (Potassium) | Yes (K) | Compatible (Standardized name to `K`) |
| **Soil pH** | Yes | Yes (pH) | Yes (pH) | Compatible (Standardized name to `ph`) |
| **Temperature** | Yes | Yes (Temperature) | **NO** | Lacking in Soil Health Cards |
| **Humidity** | Yes | **NO** | **NO** | Lacking in Raw & Soil Cards |
| **Rainfall** | Yes | Yes (Rainfall) | **NO** | Lacking in Soil Cards |
| **Crop Label** | Yes | Yes (Crop) | **NO** | Lacking in Soil Cards |
| **Organic Carbon (OC)**| **NO** | **NO** | Yes (OC) | Extra feature in Soil Cards |
| **EC (Salinity)** | **NO** | **NO** | Yes (EC) | Extra feature in Soil Cards |

---

## 2. Technical Alignment Constraints

### A. Missing Feature Risk
- **Crop-Fertilizer Raw**: Lacks the `Humidity` feature. Merging it directly requires imputing humidity values. Filling this with fixed averages (e.g., assigning a constant `91.99` for all Sugarcane observations) creates artificial correlation peaks, causing classifiers to overfit to the imputed values.
- **Soil Health Cards**: Lacks temperature, humidity, and rainfall completely. It is an observational soil chemistry registry, not an environmental predictor dataset.

### B. Target Class Imbalance
- **Predictor Base**: Perfectly balanced (22 crops, 100 samples each).
- **Crop-Fertilizer Raw**: Skewed (Sugarcane 22.38%, Wheat 19.03%, Cotton 14.40%, Masoor 0.27%).

### C. Resolution Mismatches
- **Geographic Join**: Attempting to join district-level averages (like IMD rainfall averages) with farm-level soil chemistry records commits an **ecological fallacy**. The model loses local moisture specificity, causing predictions to fail when queried on unseen farms.
