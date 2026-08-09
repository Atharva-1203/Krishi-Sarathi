# Krishi Sarathi: Dataset Strategy Plan (Phase 10)

This document details our scientific data integration strategy, outlining why large datasets are not automatically compatible for training.

---

## 1. The Quality Over Quantity Paradigm
In agricultural machine learning, blindly merging large data files can corrupt decision boundaries. We contrast our two primary datasets:

### A. The 2,200 Balanced Predictor Dataset
- **Format**: Labelled crop suitability.
- **Attributes**: Features are strictly balanced (100 rows per class), contain no geographical columns, have zero missing values, and represent physiological tolerances.
- **Role**: Active crop suitability training.

### B. The 7.9 Lakh Government Soil Health Cards
- **Format**: Unlabelled raw soil survey records.
- **Attributes**: Lacks target crop recommendation labels. Lacks climate parameters (temperature, humidity, rainfall). Features contain high measurement noise and extreme anomalies (negative values, pH of 8049).
- **Role**: Macro-level GIS map analytics and district-wise average tooltips.

---

## 2. Dataset Integration Option Selection
We evaluated several choices:
- **Option A (Raw Merge)**: REJECTED. Destabilizes splitting rules due to extreme outlier noise and introduces severe sugarcane bias.
- **Option B (Synthetic Augmentation)**: REJECTED. Gaussian perturbations blur physiological crop thresholds, increasing Brier calibration error from 0.0162 to 0.0245.
- **Option C (Decoupled Architecture)**: **🟢 SELECTED.** Maintains predictor stability by training on clean 2,200 records, while utilizing the 7.9 lakh database for GIS map visual representations.
