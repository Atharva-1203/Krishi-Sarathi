# Krishi Sarathi: Crop Bias Analysis Report (Phase 10)

This report details crop prevalence concentration, class entropy, and the risk of learning historical crop biases in training data.

---

## 1. Crop Predictor Dataset Balance
- **Total Samples**: 2,200 (100 samples per crop class).
- **Shannon Entropy**: 4.4594 bits (perfect theoretical maximum matching $H_{\max} = \log_2(22) = 4.45943$ bits).
- **Gini Coefficient**: 0.00 (perfect balance).
- **Imbalance Ratio**: 1.0.

---

## 2. Government Database Distribution
- **Target crop labels**: None.
- **Agricultural Crop surveys (Historical context for Maharashtra)**:
  - Sugarcane represents the dominant cash crop in Western Maharashtra.
  - Cotton dominates Central Maharashtra (Vidarbha/Marathwada).
  - Rice dominates coastal regions (Konkan).
- **Bias Consequence**: If location features are included, the model learns geographical defaults (e.g. Pune $\implies$ Sugarcane) instead of pure soil compatibility.

---

## 3. Crop Suitability Sensitivity Audit
A Monte Carlo query sweep of 10,000 randomized profiles on the V3 predictor model results in:
- **Sugarcane Primary Recommendation**: **0.00%** on random inputs.
- **Rice Primary Recommendation**: **0.25%** (only triggered when rainfall $>180$mm).
- **Pulse crop recommendations**: **22.50%** (diverse split across mungbean, mothbeans, chickpea).
- **Verdict**: Resolving coordinates and administrative district variables ensures the model evaluates crop physiology rather than local cultivation frequency.
