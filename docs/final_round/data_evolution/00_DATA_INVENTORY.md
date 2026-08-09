# Krishi Sarathi: Data Inventory Report

This report catalogs all data assets in the Krishi Sarathi repository.

---

## 1. Verified Repository Datasets

### A. V3 Crop Predictor Training Set
- **Path**: [`ml/datasets/v3/dataset.csv`](file:///d:/Techrush/ml/datasets/v3/dataset.csv)
- **Size**: 150,034 bytes
- **Shape**: (2,200, 8)
- **Columns**: `['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label']`
- **Data Types**: N/P/K: integer; temperature/humidity/pH/rainfall: float; label: string
- **Label Availability**: Yes (22 crop classes, perfectly balanced at 100 rows per class)
- **Provenance**: Public agricultural research data (Kaggle crop recommendation benchmark).

### B. Maharashtra Government Soil Health Card Database
- **Path**: [`datasets/processed/soil_health/soil_health_database.csv`](file:///d:/Techrush/datasets/processed/soil_health/soil_health_database.csv)
- **Size**: 92,109,280 bytes
- **Shape**: (779,144, 18)
- **Columns**: `['Latitude', 'Longitude', 'Cycle', 'District', 'Taluka', 'Village', 'N', 'P', 'K', 'pH', 'OC', 'EC', 'B', 'Fe', 'Mn', 'Cu', 'Zn', 'S']`
- **Data Types**: Coordinates, soil chemicals: float; District/Taluka/Village/Cycle: string
- **Label Availability**: **None** (unlabeled soil survey database)
- **Provenance**: Department of Agriculture, Government of Maharashtra.

### C. Labeled Crop-Fertilizer Dataset (Raw)
- **Path**: [`datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv`](file:///d:/Techrush/datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv)
- **Size**: 376,974 bytes
- **Shape**: (4,513, 11)
- **Columns**: `['District_Name', 'Soil_color', 'Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature', 'Crop', 'Fertilizer', 'Link']`
- **Data Types**: Nutrients/Rainfall/Temp: integer; pH: float; crop/district/soil: string
- **Label Availability**: Yes (16 crop classes, highly skewed)
- **Missing Features**: **Humidity is missing** from the raw feature list.

### D. Processed Master Dataset
- **Path**: [`datasets/final/master_dataset.csv`](file:///d:/Techrush/datasets/final/master_dataset.csv)
- **Size**: 670,984 bytes
- **Shape**: (4,513, 27)
- **Columns**: Core 7 features + derived NPK ratios, Soil Health Score, and location data.
- **Data Types**: Mixed floats, integers, and strings.
- **Imputation Audit**: Extrapolates missing humidity values using fixed regional defaults.
