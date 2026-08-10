# Crop Taxonomy & Ingestion Standards

This document establishes the crop taxonomy standards and validation criteria for model expansion.

---

## 1. Supported Crops Checklist (22 Crops)
We partition our supported crops across six agricultural classes:

- **Cereals**: `rice`, `maize`
- **Pulses**: `chickpea`, `kidneybeans`, `pigeonpeas`, `mothbeans`, `mungbean`, `blackgram`, `lentil`
- **Fruits**: `pomegranate`, `banana`, `mango`, `grapes`, `watermelon`, `muskmelon`, `apple`, `orange`, `papaya`
- **Plantation / Fiber**: `coconut`, `cotton`, `jute`, `coffee`

---

## 2. Ingestion Gates for New Crops
To maintain scientific validity, a new crop may enter the predictor training corpus only if it satisfies three gates:
1.  **Minimum Support**: At least 100 independent farm observations.
2.  **Feature Completeness**: No missing features in the N/P/K/pH/temp/humidity/rainfall matrix.
3.  **Boundary Separation**: Must show distinct, non-overlapping cluster boundaries in PCA or t-SNE space to avoid complete confusions with existing crops.
