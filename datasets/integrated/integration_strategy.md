# Krishi Sarathi - Data Integration Strategy

This document details the spatial-temporal join logic to integrate soil, rainfall, and physical maps under `datasets/integrated/`.

## 1. Key Joining Mappings

| Source Layer | Spatial Join Key | Temporal Join Key | Feature Target |
|--------------|------------------|-------------------|----------------|
| **Soil Health Points** | Latitude, Longitude | Cycle | Primary coordinates & N, P, K, pH |
| **BHOOMI Geoportal** | District, Taluka | Static | Physical constraints, soil depth, texture |
| **Monsoon Rainfall** | District | Year / Cycle | Seasonal precipitation, departure |
| **Weather Data** | District | Month / Year | Temperature, Humidity |

## 2. Merge Pipeline Order
1. **Load soil chemical points** (779,144 geolocated coordinates).
2. **Left-join physical soil properties** on `[District, Taluka]` columns.
3. **Map cycle indicators** to sowing seasons and join rainfall values on `[District, Year]`.
4. **Output intermediate merged CSV** to `datasets/integrated/soil_rainfall_physical_merged.csv`.
