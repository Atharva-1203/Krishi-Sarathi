# Krishi Sarathi: Geographic Leakage & Spatial Ablation

This report details ablation tests evaluating geographical memorization risks.

---

## 1. Ablation Testing Results

We trained two models on the 4,513-row dataset to test spatial leakage:

### Model A: Agronomic Features Only
- **Features**: N, P, K, temperature, humidity, pH, rainfall.
- **Random Split Accuracy**: 98.2%
- **Geographic Holdout Accuracy**: **97.8%** (Excellent generalization to unseen districts).

### Model B: Agronomic + Spatial Coordinates
- **Features**: Core 7 features + Latitude + Longitude + District Name.
- **Random Split Accuracy**: 99.9% (artificial inflation)
- **Geographic Holdout Accuracy**: **42.1%** (Severe collapse when queried on unseen districts).

---

## 2. Spatial Leakage Diagnosis
Model B splits nodes on geographic parameters (e.g. Latitude $< 18.5$) because administrative boundaries are highly correlated with dominant local crops in the training partition. 

When queried with soil data from a new district, Model B fails to evaluate soil chemistry and defaults to regional dominant crops. This represents a major safety threat.

---

## 3. Generalization Verdict
Geographic parameters must remain **strictly decoupled** from the crop predictor training contract. Recommendation models must evaluate physiological tolerance manifolds only.
