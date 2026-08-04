# Model Candidate Comparison and Selection Report

This report compares candidate classifiers and selects the production architecture.

## 1. Candidate Comparison Matrix

| Algorithm | Accuracy Potential | Training Time | Inference Speed | SHAP Compatibility | Categorical Support |
|-----------|--------------------|---------------|-----------------|--------------------|---------------------|
| **Decision Tree** | Low | Very Fast | Fast | Good | Manual |
| **Random Forest** | Medium-High | Slow | Moderate | Excellent | Manual |
| **Extra Trees** | Medium-High | Slow | Fast | Excellent | Manual |
| **XGBoost** | High | Moderate | Very Fast | Excellent | Limited |
| **LightGBM** | High | Fast | Fast | Excellent | Good |
| **CatBoost** | High | Moderate | Fast | Excellent | **Excellent (Native)** |

## 2. Model Recommendations
- **Primary Model**: **CatBoost Classifier**.
  - *Reasoning*: CatBoost handles categorical columns (`District` and `Soil_Color`) natively without needing One-Hot encoding, reducing dimensionality and training complexity. It has excellent out-of-the-box accuracy and is fully compatible with TreeSHAP.
- **Secondary / Fallback Model**: **LightGBM**.
  - *Reasoning*: Highly memory efficient, offers extremely fast training speeds, and serves as an excellent benchmark.
