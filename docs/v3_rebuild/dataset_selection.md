# V3 Rebuild: 02 Dataset Selection

This document logs the evaluation and selection process for the crop prediction dataset.

## 1. Candidate Evaluation

We evaluated three potential sources for crop recommendation:

| Criterion | Candidate A: Maharashtra Soil-Card Dataset (V2 Legacy) | Candidate B: Kaggle Crop Recommendation (Selected V3) | Candidate C: Government Open Data Portal (India) |
| :--- | :--- | :--- | :--- |
| **Source** | Integrated Bhoomi Geoportal & Rainfall Records | Kaggle (Atharva Kabra) | Government of India Agricultural Portal |
| **License** | Proprietary / Internal | Open Database License (ODbL) | Government Open Data License |
| **Number of rows** | 4,513 records | 2,200 records | Over 100,000 records |
| **Number of classes**| 16 classes | 22 classes | 5 classes |
| **Features** | 27 features (incl. District, Soil Color, micronutrients) | 7 features (`N`, `P`, `K`, `temp`, `humidity`, `pH`, `rainfall`) | Varying fields by district (incomplete) |
| **Missing values** | High (micronutrients filled with defaults) | 0 missing values | High |
| **Duplicates** | ~120 exact duplicates | 0 duplicate rows | ~8,000 duplicate rows |
| **Class balance** | Heavily imbalanced (Sugarcane dominates) | 100% balanced (100 samples per class) | Highly imbalanced |
| **Geographic leakage**| High (District normal rainfall, soil defaults) | None (contains only agronomic measurements) | High (district and state labels) |
| **Suitability** | Low (induces heavy local model bias) | **High (focuses on pure agricultural relationships)** | Low (requires extensive cleaning/imputation) |
| **Documentation** | Poor | Good | Medium |

## 2. Selection Verdict
Candidate B (the **Kaggle Crop Recommendation Dataset**) is selected for the V3 prediction engine. It includes exactly the 7 features specified by the input contract, has 22 crops represented with no missing values, and is 100% balanced (100 rows per class). This ensures the model learns the physical, chemical, and environmental dependencies of crop viability rather than learning regional priors.
