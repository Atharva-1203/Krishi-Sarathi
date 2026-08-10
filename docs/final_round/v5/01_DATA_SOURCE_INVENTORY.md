# Data Source Inventory (V5 Evolution)

This document catalogues all data assets discovered in our repositories, including shapes, feature lists, targets, and license metadata.

---

## 1. Verified Core Datasets

### A. V3.1 Crop Predictor Training Set
- **File Path**: [`ml/datasets/v3/dataset.csv`](file:///d:/Techrush/ml/datasets/v3/dataset.csv)
- **Size**: 150,034 bytes
- **Dimensions**: 2,200 rows, 8 columns
- **Schema**: `['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label']`
- **Data Types**: N/P/K: integer; temperature/humidity/pH/rainfall: float; label: string
- **Missing Value Rate**: 0.00%
- **Exact Duplicates**: 0 (0.00%)
- **Licensing**: Public agricultural research dataset (CC BY 4.0).
- **Target Availability**: Yes (22 crop classes, perfectly balanced at 100 samples per class).

### B. Maharashtra Government Soil Health Card Database
- **File Path**: [`datasets/processed/soil_health/soil_health_database.csv`](file:///d:/Techrush/datasets/processed/soil_health/soil_health_database.csv)
- **Size**: 92,109,280 bytes
- **Dimensions**: 779,144 rows, 18 columns
- **Schema**: `['Latitude', 'Longitude', 'Cycle', 'District', 'Taluka', 'Village', 'N', 'P', 'K', 'pH', 'OC', 'EC', 'B', 'Fe', 'Mn', 'Cu', 'Zn', 'S']`
- **Data Types**: coordinates/soil properties: float; administrative text fields: string
- **Missing Value Rate**: $< 0.03\%$ on N/P/K/pH.
- **Exact Duplicates**: 7,271 records (0.93%).
- **Licensing**: Government Open Data License (GODL) India.
- **Target Availability**: **None** (unlabeled database).

### C. Labeled Crop-Fertilizer Survey (Raw)
- **File Path**: [`datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv`](file:///d:/Techrush/datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv)
- **Size**: 376,974 bytes
- **Dimensions**: 4,513 rows, 11 columns
- **Schema**: `['District_Name', 'Soil_color', 'Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature', 'Crop', 'Fertilizer', 'Link']`
- **Data Types**: Nutrients/Weather: integer; pH: float; crop/district/soil: string
- **Missing Value Rate**: 0.00%
- **Exact Duplicates**: 0
- **Licensing**: Open academic survey records.
- **Target Availability**: Crop labels present (16 skewed categories). **Humidity is missing.**
