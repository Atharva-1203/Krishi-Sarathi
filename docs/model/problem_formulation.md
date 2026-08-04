# Machine Learning Problem Formulation

This document formalizes the ML crop recommendation task.

## 1. Task Definition
- **ML Task**: Multi-class Classification.
- **Target Variable**: `Crop` (16 classes representing major regional crops).
- **Goal**: Predict the Top 3 crop classes for each location profile, accompanied by confidence probability scores.

## 2. Input Features
- **Primary Chemical**: `N`, `P`, `K`, `pH`
- **Secondary / Soil Physical**: `OC`, `EC`, `Soil_Color`, `S`, `B`, `Fe`, `Mn`, `Cu`, `Zn`
- **Climate / Context**: `Rainfall`, `Temperature`, `Humidity`, `District`, `Growing_Season`
- **Engineered**: `N_P_Ratio`, `N_K_Ratio`, `P_K_Ratio`, `Rainfall_Deviation`, `Soil_Health_Score`

## 3. Assumptions and Constraints
- **Assumptions**: Farmers can adjust soil macronutrients (N, P, K) using fertilizers, but climate (Rainfall, Temperature) and physical parameters (Soil Texture/Color) are fixed environmental bounds.
- **Constraints**: Model execution speed must be < 20ms to allow smooth interactive web dashboard predictions.
