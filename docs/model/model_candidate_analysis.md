# Machine Learning Model Candidate Analysis

This document evaluates the suitability of classification models for crop recommendation.

## 1. Candidate Comparison

| Algorithm | Advantages | Disadvantages | SHAP Compatibility | Recommend |
|-----------|------------|---------------|-------------------|-----------|
| **Random Forest** | Stable, resilient to outliers | Slow inference, large memory | Excellent | No |
| **XGBoost** | High accuracy, fast on GPU | Complex hyperparameter tuning | Excellent | Yes (Secondary) |
| **LightGBM** | Fast training, leaf-wise | Prone to overfitting on small data | Excellent | Yes (Secondary) |
| **CatBoost** | Best categorical handler (Districts) | Slow CPU training | Excellent | **Yes (Primary)** |

## 2. Final Selection
- **CatBoost Classifier**: Chosen as the primary model. CatBoost's symmetric trees provide rapid CPU inference speeds (<5ms), and its built-in categorical processing natively handles `District` and `Soil_Color` without exploding dataset dimensionality.
