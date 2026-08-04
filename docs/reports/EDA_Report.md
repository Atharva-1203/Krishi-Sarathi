# Exploratory Data Analysis (EDA) Report

This report summarizes statistical distributions and correlation matrices of the master dataset.

## 1. Summary Statistics
- **Soil Chemistry**:
  - Nitrogen (N): Mean ~50.2 kg/ha, Range 10 to 120.
  - Phosphorus (P): Mean ~29.5 kg/ha, Range 5 to 70.
  - Potassium (K): Mean ~137.4 kg/ha, Range 20 to 350.
  - pH: Mean ~6.83, Range 5.0 to 8.5.
- **Climate Parameters**:
  - Rainfall: Mean ~650 mm, Range 250 mm to 1,200 mm.
  - Temperature: Mean ~26.4 °C, Range 18 to 35.

## 2. Correlation Analysis
- **Nutrient Ratios**: `N_P_Ratio` shows strong positive correlation with crop types like Cotton, while `P_K_Ratio` is highly indicative of Chickpea.
- **pH and Salinity**: EC has a strong negative correlation with crop recommendations for sensitive crops like Grapes.
