# Krishi Sarathi: Crop Coverage Expansion Proposal

This document outlines the evaluation of our supported crop categories and crop taxonomy mapping.

---

## 1. Supported Crop Taxonomy
We support **22 distinct crop classes**, representing a balanced diversity across standard agricultural categories:

- **Cereals**: rice, maize
- **Pulses**: chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil
- **Fruits**: pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya
- **Plantation / Fiber Crops**: coconut, cotton, jute, coffee

---

## 2. Crop Physiological Bounds Summary

| Crop | Typical pH | Typical Rainfall | Typical Temp | Water Sensitivity |
| :--- | :---: | :---: | :---: | :--- |
| **rice** | 5.0 - 7.9 | 182 - 298mm | 20 - 27°C | Very High (requires flooding) |
| **muskmelon**| 6.0 - 6.8 | 20 - 29mm | 27 - 29°C | Low (arid preference) |
| **apple** | 5.5 - 6.5 | 100 - 124mm | 21 - 24°C | Moderate (temperate) |
| **lentil** | 5.9 - 7.8 | 35 - 54mm | 15 - 30°C | Low (arid pulse preference) |

---

## 3. Crop Coverage Strategy (Round 2 Expansion)
To safely add new crop classes (such as Wheat, Jowar/Sorghum, Groundnut, Soybean) in future iterations:
1.  **Enforce Minimum Support**: Require at least 200 samples per class to maintain split density.
2.  **Verify Feature Separation**: Apply t-SNE or PCA to ensure new crops have separable clusters and do not create overlap confusions in the 7-feature space.
