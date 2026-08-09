# Krishi Sarathi: 7.8 Lakh Government Soil Dataset Forensics Report

This document records the forensic analysis of the government soil health card database (`datasets/processed/soil_health/soil_health_database.csv`) containing approximately 7.8 lakh records.

---

## 1. Dataset Overview & Inventory
- **File Path**: `datasets/processed/soil_health/soil_health_database.csv`
- **Total Row Count**: 779,144 records
- **Total Columns**: 18
- **Column List**: `['Latitude', 'Longitude', 'Cycle', 'District', 'Taluka', 'Village', 'N', 'P', 'K', 'pH', 'OC', 'EC', 'B', 'Fe', 'Mn', 'Cu', 'Zn', 'S']`
- **Geographic Coverage**: 34 agricultural districts of Maharashtra, India.

---

## 2. Key Forensic Findings

### A. Missing Target Crop Labels
- **Result**: `Crop/Label columns found: []`
- **Interpretation**: The government soil health dataset is a collection of soil chemistry records. It **does not contain any crop recommendation labels or target classifications**. Therefore, it is mathematically impossible to use it for training a supervised crop recommendation model.

### B. Missing Prediction Features
- **Result**: The dataset lacks crucial environmental and climatic variables:
  - `temperature` (Missing)
  - `humidity` (Missing)
  - `rainfall` (Missing)
- **Interpretation**: A crop recommendation engine requires climate telemetry. The absence of these parameters makes this dataset structurally incompatible with the 7-feature prediction model.

### C. Extreme Anomaly & Impossible Values
The dataset contains severe measurement noise and physical impossibilities:
- **Soil pH**: Minimum is `-27.31` and Maximum is `8049.0` (Physically impossible; pH scale is strictly $0$ to $14$).
- **Nitrogen (N)**: Maximum is `278,278.0 mg/kg` and contains 91 negative values.
- **Phosphorus (P)**: Maximum is `193,381.0 mg/kg` and contains 7 negative values.
- **Organic Carbon (OC)**: Minimum is `-421.93` and Maximum is `83,638.0`.

---

## 3. Compatibility Verdict & Recommendation

> [!CAUTION]
> **DO NOT MERGE THIS DATASET INTO THE CROP PREDICTOR MODEL.**
> Merging the 7.8 lakh government soil dataset into the live crop suitability model is scientifically incorrect for the following reasons:
>
> 1. **No Supervised Learning Labels**: The dataset lacks crop suitability tags.
> 2. **Climatic Data Gap**: Lacks temperature, humidity, and rainfall.
> 3. **High Measurement Noise**: The presence of values like negative pH and pH of 8049 would destabilize the decision tree split calculations.
>
> **Best Action**:
> We will continue to preserve the separation of concerns. This large dataset will be used exclusively for displaying **Maharashtra Macro Soil Health Averages** on the GIS Map and district tooltips, and will **not** be merged into the Live Predictor.
