# Krishi Sarathi - Model Design Document

This document compares candidate machine learning classifiers for the crop recommendation engine and selects the production architecture.

## 1. Candidate Model Comparison

| Algorithm | Advantages | Disadvantages | SHAP Compatibility | Training Time | Inference Speed |
|-----------|------------|---------------|-------------------|---------------|-----------------|
| **Random Forest** | Out-of-the-box performance, low tuning required, no leakages | Slow inference, large memory footprint on disk | Excellent | Slow | Moderate |
| **XGBoost** | High accuracy, native handling of missing values, regularized | Prone to overfitting without tuning | Excellent | Moderate | Very Fast |
| **LightGBM** | Extremely fast training, leaf-wise growth, low memory | Requires large datasets to prevent overfitting | Excellent | Fast | Fast |
| **CatBoost** | Best native handling of categorical features (District/Taluka) | Slower training on CPUs | Excellent | Slow | Fast |

## 2. Selection Recommendation: LightGBM / CatBoost Ensemble
- **The Verdict**: **CatBoost** is recommended as the primary classifier because it handles categorical keys (District, Taluka, Soil Texture) natively with target encoding, avoiding memory-expensive One-Hot representations. 
- **Explainability (SHAP)**: Fully compatible with TreeSHAP, enabling micro-second calculations of feature importances for local farm recommendations.
- **Inference Speed**: Lightweight serialized binaries suitable for backend integration (API response times < 20ms).
