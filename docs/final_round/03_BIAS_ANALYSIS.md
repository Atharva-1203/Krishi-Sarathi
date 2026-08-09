# Krishi Sarathi: Crop Prediction Bias Analysis

This report documents class balance, crop frequency concentrations, and bias audits for the Krishi Sarathi platform.

---

## 1. Predictor Class Balance
The 2,200 training dataset is perfectly balanced across 22 crops (100 samples per class):
- **Shannon Entropy**: 4.4594 bits (theoretical maximum representing uniform representation).
- **Gini Coefficient**: 0.00.
- **Imbalance Ratio**: 1.0.

---

## 2. Sugarcane Dominance Audit
- **Old System Bug**: Legacy models included location variables. In regions like Western Maharashtra where sugarcane is heavily cultivated, the model learned a strong geographic default bias, predicting sugarcane even on dry soils.
- **V3 Solution**: Location variables were completely removed from training data.
- **Monte Carlo Verification**: We ran a 10,000-query simulation sweep across randomized continuous parameters. The primary sugarcane recommendation rate (Top-1) is **0.00%**, confirming that sugarcane is predicted strictly when its precise agronomic parameters (high moisture, high rainfall) are met.

---

## 3. Crop-wise Generalization Audit
Predictions on random parameter sets split evenly:
- **Pulses (mungbean, mothbeans)**: 22.50% (dry parameters match pulses).
- **Fruits (apple, orange)**: Selected only within narrow temperature and pH boundaries.
- **Cereals (rice)**: Recommended strictly when rainfall $>180$mm.
- **Verdict**: Decoupling location elements from prediction prevents default crop bias, matching crop physiology rather than geographic frequency.
