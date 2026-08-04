# Krishi Sarathi - Feature Engineering Plan

This document details the transformation and engineering of features for model training.

## 1. Engineered Features

### A. NPK Ratios
- **Features**: `N_P_Ratio`, `N_K_Ratio`, `P_K_Ratio`
- **Formula**: `N / (P + 0.01)`, etc.
- **Utility**: Crop growth is highly dependent on relative fertilizer balance. These ratios prevent absolute values from skewing tree splits.

### B. Soil Health Score
- **Feature**: `Soil_Health_Score`
- **Formula**: Sum of heuristic checks:
  - Neutral pH (6.0 - 7.5): +2 points
  - Adequate Nitrogen (>=80 kg/ha): +2 points
  - Adequate Phosphorus (>=25 kg/ha): +2 points
  - Adequate Potassium (>=150 kg/ha): +2 points
  - High Organic Carbon (>=0.6%): +2 points
- **Utility**: Represents overall chemical health, providing a highly explainable feature for farmers.

### C. Rainfall Deviation Index
- **Feature**: `Rainfall_Deviation`
- **Formula**: `(Rainfall - District_Normal_Rainfall) / District_Normal_Rainfall`
- **Utility**: Quantifies relative water surplus or deficit, which is crucial for drought-prone crops like Sorghum vs water-intensive crops like Sugarcane.

### D. Climate Modeling (Humidity)
- **Feature**: `Humidity`
- **Formula**: `(45.0 + 0.05 * Rainfall - 0.2 * Temperature).clip(30, 95) + Noise`
- **Utility**: Generates relative humidity values representing season microclimates, matching crop physiology constraints.
