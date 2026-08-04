# Feature Selection Report

This document outlines the classification of features into mandatory, optional, and discarded categories.

## 1. Mandatory Features (Inference Baseline)
- `N`, `P`, `K` (Primary nutrients)
- `pH` (Soil acidity)
- `Temperature`, `Humidity`, `Rainfall` (Climate variables)
- **Reason**: Baseline physical-chemical parameters required for basic crop growth classification.

## 2. Optional / Engineered Features (Accuracy Boosters)
- `Soil_Color` (Proxy for soil taxonomy and drainage)
- `OC`, `EC` (Organic carbon and salinity)
- `B`, `Fe`, `Mn`, `Cu`, `Zn`, `S` (Micronutrients)
- `N_P_Ratio`, `N_K_Ratio`, `P_K_Ratio` (NPK ratios)
- `Soil_Health_Score` (Combined soil health index)
- `Rainfall_Deviation` (Water surplus/deficit index)
- **Reason**: Boosts model accuracy, captures soil constraints, and improves recommendation explainability.

## 3. Discarded Features
- `Link` (YouTube link in raw crop dataset)
  - **Reason**: Metadata/promotional attribute with no relevance to plant physiology.
