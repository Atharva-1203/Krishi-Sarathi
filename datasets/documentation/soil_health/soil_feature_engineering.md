# Soil Feature Engineering Report

This report outlines how the extracted soil parameters should be handled for training our crop recommendation models and explainability engines.

## 1. Nutrient Parameters (N, P, K)
- **Characteristics**: Continuous numerical features (kg/ha).
- **ML Treatment**: Can be directly used. Scaling/Normalization (such as MinMax or StandardScaler) is recommended to prevent distance-based models (like KNN or SVM) from being dominated by K values, which are typically much higher than N and P.
- **Explainability**: Essential for explaining crop recommendations (e.g. *"Recommending Groundnut because available Nitrogen is low, and legume crops fix atmospheric Nitrogen."*)

## 2. Soil pH
- **Characteristics**: Continuous numerical feature (0-14 scale).
- **ML Treatment**: Can be used directly or categorized into ordinal groups (Acidic, Neutral, Alkaline) to help decision tree-based models split features more effectively.
- **Explainability**: Extremely important. Tells users if the soil is too acidic (pH < 6.0) or alkaline (pH > 8.0) for sensitive crops like tea or sugarcane.

## 3. Organic Carbon (OC) and Electrical Conductivity (EC)
- **Characteristics**: Continuous numerical features (% and dS/m).
- **ML Treatment**: Direct input. Log-transform EC to normalize skewed salinity values.
- **Explainability**: OC represents organic matter health, and EC represents salinity. Essential for drought/salinity warning flags.

## 4. Micronutrients (B, Fe, Mn, Cu, Zn, S)
- **Characteristics**: Continuous numerical features (ppm).
- **ML Treatment**: Useful to identify specific micro-deficiencies. Missing values in Fe should be imputed using block-level median values.
- **Explainability**: Essential for suggesting micro-fertilizer supplements alongside crop recommendations (e.g., *"Suggesting Zinc Sulphate amendment due to low Zn (<0.6 ppm) in your block."*)

## 5. Latitude and Longitude (Spatial Features)
- **Characteristics**: Continuous numerical coordinates.
- **ML Treatment**: Do not use raw coordinates directly as input features unless using spatial models (e.g. Random Forest with spatial indicators). It is highly recommended to encode them into spatial clusters or use district/taluka target encoding to capture regional soil zones.
