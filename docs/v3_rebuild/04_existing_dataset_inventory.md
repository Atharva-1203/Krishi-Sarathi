# V3 Rebuild: 04 Existing Dataset Inventory

This document inventories the dataset assets located across the repository.

## 1. Datasets in the ML Workspace (`ml/datasets/`)
*   **`crop_recommendation.csv`** (150 KB, 2,200 records)
    *   **Features**: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`, `label`
    *   **Class coverage**: 22 crops (100 samples each, perfectly balanced).
    *   **Description**: This is the Kaggle-sourced crop recommendation dataset that does not contain geographic identifiers (such as district or division).

## 2. Legacy Datasets in the Data Directory (`datasets/final/`)
*   **`master_dataset.csv`** and **`master_dataset_v1.0.csv`** (670 KB, 4,513 records)
    *   **Features**: `District`, `Soil_Color`, `N`, `P`, `K`, `pH`, `Rainfall`, `Temperature`, `Crop`, `Fertilizer`, `OC`, `EC`, `B`, `Fe`, `Mn`, `Cu`, `Zn`, `S`, `District_Normal_Rainfall`, `Humidity`, `N_P_Ratio`, `N_K_Ratio`, `P_K_Ratio`, `Rainfall_Deviation`, `OC_Class`, `Soil_Health_Score`, `Growing_Season`
    *   **Target Label**: `Crop` (which is heavily skewed towards Sugarcane).
    *   **Role**: Used to train the V2 prediction engine, generating significant bias because of regional defaults and frequency imbalances.
*   **`train.csv` / `test.csv` / `validation.csv`**: Legacy splits of the master dataset.

## 3. Supplementary and Raw Datasets
Located in `datasets/raw/`, `datasets/processed/`, and `datasets/integrated/`:
*   **Bhoomi Geoportal Data**: Soil parameters (`bhoomi/land_use/crop_suitability.csv` etc.) representing Maharashtra regional soil health card data.
*   **Rainfall Data**: Historical regional rainfall records.
*   **Role**: These datasets are used for map visualizations and regional analytics rather than directly training the generalized crop model.
