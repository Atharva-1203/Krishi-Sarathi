# Crop Taxonomy & Label Mapping Guide

This document establishes the crop categorization system and classification eligibility.

---

## 1. Universal Crop Taxonomy (22 Classes)
To maintain scientific validity, crop recommendation is restricted to classes with sufficient validated training profiles:

- **Cereals**: rice, maize
- **Pulses**: chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil
- **Fruits**: pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya
- **Plantation / Fiber**: coconut, cotton, jute, coffee

---

## 2. Minimum Eligibility Thresholds
To prevent the model from learning noisy splits on under-represented classes, crops must meet three criteria to enter the training set:
1.  **Minimum Support**: At least 100 samples of independent farm records.
2.  **Feature Completeness**: Records must contain all 7 core features. No proxy-imputed parameters are allowed.
3.  **Cluster Separation**: PCA or t-SNE projections must confirm that the crop's soil chemistry boundaries are separable and do not create complete overlap confusions with existing crops.

---

## 3. Label Translation Matrix
We map external data labels to our taxonomy to prevent naming collisions:
- `corn` $\implies$ `maize`
- `gram` $\implies$ `chickpea`
- `musk_melon` $\implies$ `muskmelon`
- `pigeon_pea` $\implies$ `pigeonpeas`
- Unmapped crop categories (like Wheat or Jowar) are excluded from training until balanced, complete datasets are acquired.
