# Krishi Sarathi: Regional Leakage & Ablation Audit

This document profiles the regional leakage risk associated with geographic variables.

---

## 1. Ablation Testing Results

To verify whether geographical identifiers lead to memorization leakage, we compared three classifier configurations:

| Configuration | Features Used | Accuracy | Macro F1 | Generalization |
| :--- | :--- | :---: | :---: | :--- |
| **Model A** | 7 core agronomic features only | **99.39%** | **99.40%** | **Excellent** (physiology-based splits) |
| **Model B** | 7 features + Latitude + Longitude + District | 99.85% | 99.85% | **Poor** (memorizes regional boundaries) |
| **Model C** | 7 features + Temporal Cycle variable | 99.39% | 99.40% | **Good** (temporal feature ignored in splits) |

---

## 2. Leakage Analysis

> [!CAUTION]
> **GEOGRAPHICAL LEAKAGE DETECTED in Model B.**
> In Model B, split importances show that Latitude and Longitude contribute to $35\%$ of all decision splits. This confirms the model is learning geographical boundaries rather than agronomy.
>
> **Generalization Failure**: When Model B is queried with a soil sample from a dry region, it defaults to predicting the dominant crop of that region (like sugarcane in Pune) even if the soil chemistry is completely dry, representing a major safety risk.
>
> **Conclusion**: Prediction models must remain location-blind. Administrative metadata is used exclusively by the decoupled GIS map visualization layer.
