# Data Inventory

This document lists all active agricultural datasets, verified row counts, and features.

## 1. Crop Suitability Prediction Dataset
*   **Path**: `ml/datasets/v3/dataset.csv`
*   **Size**: `150,034` bytes
*   **Verified Rows**: `2,200`
*   **Columns (8)**: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`, `label` (target crop)
*   **Crop Classes (22)**: apple, banana, blackgram, chickpea, coconut, coffee, cotton, grapes, jute, kidneybeans, lentil, maize, mango, mothbeans, mungbean, muskmelon, orange, papaya, pigeonpeas, pomegranate, rice, watermelon
*   **Role**: Serves as the single source of truth for training and validating the generalized ML crop recommendation model.

## 2. Maharashtra Soil Health Database
*   **Path**: `datasets/processed/soil_health/soil_health_database.csv`
*   **Size**: `92,109,280` bytes
*   **Verified Rows**: `779,144`
*   **Columns (18)**: `Latitude`, `Longitude`, `Cycle`, `District`, `Taluka`, `Village`, `N`, `P`, `K`, `pH`, `OC`, `EC`, `B`, `Fe`, `Mn`, `Cu`, `Zn`, `S`
*   **Role**: Decoupled GIS database providing aggregated geographical context for Maharashtra district analytics.
