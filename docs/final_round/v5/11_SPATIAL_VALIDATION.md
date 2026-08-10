# Spatial Validation Report

This report evaluates geographic generalization and cross-validation split robustness.

---

## 1. GroupKFold Geographic Validation (V5 Candidate)
To verify spatial generalization, we evaluated the V5 candidate model (trained on the merged 6,713-sample dataset) using a GroupKFold split grouped by **District Name**, ensuring that test partitions contain districts unseen during training:

- **Random Split Test Accuracy**: 98.27%
- **Geographic GroupKFold Test Accuracy**: **45.95%**
- **Macro F1-Score on GroupKFold**: **20.45%**

---

## 2. Generalization Collapse Analysis
The severe collapse to **$45.95\%$ spatial accuracy** and **$20.45\%$ Macro F1-score** confirms that the merged candidate model suffers from severe geographic memorization. Because crops in the survey dataset are highly district-bound (e.g. Sugarcane in Kolhapur, Cotton in Yavatmal, Wheat in Nagpur), holding out a district entirely means the model fails to predict these crops elsewhere.

Excluding geographic features and retaining the balanced, location-blind V3.1 training set is mandatory to guarantee spatial stability.
