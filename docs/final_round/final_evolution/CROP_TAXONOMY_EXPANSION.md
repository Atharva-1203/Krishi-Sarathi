# Crop Taxonomy Expansion Report (V5 Final Evolution)

This document reports our evaluation of adding new crop classes to the prediction engine and logs the crop support matrix.

---

## 1. Crop Support Matrix

We evaluated several potential crop varieties for addition to our active 22-class taxonomy:

| Crop | Source | Samples | Regions | Features | Quality | Training Eligibility |
| :--- | :--- | :---: | :--- | :---: | :---: | :--- |
| **Rice** | UCI / Kaggle | 100 | Continuous | 7/7 | High | **Eligible (Active)** |
| **Maize** | UCI / Kaggle | 100 | Continuous | 7/7 | High | **Eligible (Active)** |
| **Sugarcane**| Crop-Fertilizer | 1,010 | Western Maharashtra | 6/7 | Skewed | **Ineligible** (Lacks humidity; causes spatial collapse) |
| **Wheat** | Crop-Fertilizer | 859 | Northern Maharashtra | 6/7 | Skewed | **Ineligible** (Lacks humidity; causes spatial collapse) |
| **Soybean** | Crop-Fertilizer | 45 | Central Maharashtra | 6/7 | Low | **Ineligible** (Insufficient samples) |
| **Masoor** | Crop-Fertilizer | 12 | Vidarbha | 6/7 | Low | **Ineligible** (Insufficient samples) |

---

## 2. Crop Inclusion Criteria
For a crop to enter the production prediction champion, it must satisfy four strict criteria:
1.  **Feature Completeness**: Paired observations must possess all 7 continuous variables ($N, P, K, pH$, temperature, humidity, rainfall). No proxy-imputation is permitted.
2.  **Minimum Sample Count**: The crop class must have at least 100 observations to guarantee statistically stable decision boundaries.
3.  **Class Imbalance Ratio**: Crop counts must not skew the imbalance ratio above $1.5$ to avoid default-class prediction bias.
4.  **Spatial Generalization**: The crop observations must generalize across geographic splits during GroupKFold cross-validation.
