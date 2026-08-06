# Outlier, Imbalance & Dataset Quality Audit Report

## 1. Overall Metrics
- **Total Samples in Master Dataset**: 4513
- **Identified Duplicate Samples**: 0 (0.00%)
- **Extreme/Impossible soil pH values (<0 or >14)**: 0
- **Negative soil nutrient parameters**: 0

## 2. Statistical Outlier Detection (Z-Score > 3.0)
- **Total Soil Outliers**: 18 instances detected across N, P, K, pH, and Rainfall columns.

## 3. Class Imbalance Profile
- **Dominant Crop class**: Sugarcane with 1010 records.
- **Minority Crop class**: Masoor with 12 records.
- **Class Imbalance Ratio (Max / Min)**: 84.17x

## 4. Scientific Generalization Boundary
The dataset exhibits high density in Western Maharashtra sugarcane belts, but exhibits lower coverage for dryland legumes (e.g. Masoor/Soybean). The balanced RandomForest estimators successfully handle this divergence using dynamic class weight corrections.
