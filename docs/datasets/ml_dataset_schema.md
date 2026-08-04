# Krishi Sarathi - Machine Learning Dataset Schema

This document defines the schema of the final dataset prepared for Model Training.

## 1. Target Variable
- **Feature Name**: `Crop`
- **Data Type**: String (Categorical)
- **Role**: Target variable for classification (Multi-class Classification task).
- **Classes**: Major Maharashtra crops (Rice, Sorghum, Pearl Millet, Cotton, Soyabean, Groundnut, Sugarcane, Wheat, Chickpea, Pigeonpea).

## 2. Input Features

### A. Mandatory Features (Chemical & Climate Drivers)
1. **Nitrogen (N)**: Float, kg/ha. Required.
2. **Phosphorus (P)**: Float, kg/ha. Required.
3. **Potassium (K)**: Float, kg/ha. Required.
4. **pH**: Float, pH scale. Required.
5. **Temperature**: Float, °C. Required. (Spatial-temporal join).
6. **Humidity**: Float, %. Required. (Spatial-temporal join).
7. **Rainfall**: Float, mm. Required. (District-season join).

### B. Spatial & Contextual Features (Explainability Drivers)
1. **Soil Type**: Categorical (One-Hot Encoded).
2. **Soil Texture**: Categorical (One-Hot Encoded).
3. **Organic Carbon (OC)**: Float, %.
4. **Electrical Conductivity (EC)**: Float, dS/m.
5. **Agro Ecology Zone**: Categorical (One-Hot Encoded).
6. **District**: Categorical (Label Encoded).
7. **Taluka**: Categorical (Label Encoded).
8. **Growing Season**: Categorical (One-Hot Encoded).
9. **Rainfall Category**: Categorical (One-Hot Encoded).
10. **Sulphur (S)**: Float, ppm.
11. **Zinc (Zn)**: Float, ppm.
12. **Iron (Fe)**: Float, ppm.
13. **Land Capability**: Categorical (One-Hot Encoded).

## 3. Data Splits
- **Train Split**: 80% (Chronological or stratified spatial split to prevent leakages).
- **Test Split**: 20% (Evaluation partition).
