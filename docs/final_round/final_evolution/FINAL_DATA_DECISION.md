# Final Data Decision (V5 Final Evolution)

This document records the scientific justification and final data decision tree for the Krishi Sarathi V5 platform.

---

## 1. Decision Logic Flowchart

```text
               DATASET EVALUATION SWEEP
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
   LABELLED DATA                     UNLABELLED DATA
(Crop-Fertilizer Raw)              (779K Soil Cards)
         │                                 │
         ▼                                 ▼
  Evaluate Humidity?                 Link to Farms?
         │                                 │
         ├───────────────┐                 ├───────────────┐
         ▼               ▼                 ▼               ▼
     [YES]             [NO]            [YES]             [NO]
     Merge          (Rejection)        Merge            (Map)
                         │                                 │
                         ▼                                 ▼
                 IMPUTATION LEAKAGE               ECOLOGICAL FALLACY
                 & SPATIAL COLLAPSE               & SPATIAL BIAS
                         │                                 │
                         └──────────────┬──────────────────┘
                                        ▼
                               KEEP V3.1 CHAMPION
                             AS PREDICTION CORE;
                               SERVE 779K AS
                            MAP EVIDENCE LAYER
```

---

## 2. Scientific Justification

We reject merging the 4,513 legacy rows and pseudo-labeling the 779k Soil Health Cards for prediction training due to three reasons:

### A. Missing Feature Imputation Leakage
The candidate labeled dataset lacks the `Humidity` feature. Imputing humidity using crop-specific defaults (e.g. `91.99` for all Sugarcane in Kolhapur) creates artificial correlation leakage. The ML classifier learns to split nodes on this constant to predict sugarcane, rather than learning generalizable crop suitability.

### B. Ecological Fallacy & Spatial Overfitting
Unlabeled Soil Health Cards cannot be pseudo-labeled using district crop averages (e.g. labeling all Nashik records as grapes). This commits an ecological fallacy and introduces location leakage. GroupKFold cross-validation shows that models trained on these merged datasets collapse from $99\%$ to **45.95% accuracy** on unseen geographic regions.

### C. Class Concentration Risk
The candidate dataset exhibits an Imbalance Ratio of **84.1**, heavily skewed towards cash crops (Sugarcane 22.38%, Wheat 19.03%). Training on this skewed data causes target dominance, where the model defaults to cash-crop recommendations even in drought-prone or acidic soils.

---

## 3. The Final Decision
- **Predictor Core**: Maintains the 2,200-row balanced, location-blind continuous dataset to guarantee stable, leakage-free suitability mapping.
- **Observatory Core**: Serves the 703,922 valid unlabelled Soil Health Cards as an independent macro-view GIS Map Observatory overlay. This provides real-world evidence without compromising predictor integrity.
