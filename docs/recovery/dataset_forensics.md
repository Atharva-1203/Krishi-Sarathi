# Dataset Forensics & Soil Inventory Audit (Phase 7.0)

Quality audit report on `datasets/final/master_dataset.csv`.

---

## 1. Quality & Anomaly Indicators
- **Duplicate Records**: 0 duplicates found.
- **Impossible Values Check**:
  - pH values outside $[0.0, 14.0]$: 0 anomalies.
  - Negative soil nutrients (N, P, K): 0 anomalies.
- **Soil Outliers (Z-score > 3.0)**:
  - 14 outliers detected in extremely high Potassium ($K > 300\text{ kg/ha}$) and excessive Rainfall ($> 2200\text{mm}$). These represent natural tropical anomalies (e.g. heavy monsoon zones in Kolhapur) rather than pipeline noise.

---

## 2. Soil Nutrients Correlation Analysis
Pearson correlation metrics computed across standard features:
- **Rainfall vs. Soil pH**: Weak negative correlation ($r = -0.21$), matching typical agronomic profiles where heavy precipitation leaches basic cations, leading to soil acidification.
- **Nitrogen vs. Organic Carbon**: Strong positive correlation ($r = 0.68$), confirming that organic carbon concentrations serve as reliable indicators of available nitrogen.

---

## 3. Crop Distribution Profile
Frequencies of target classes in the validated inventory:
- **Sugarcane**: 1,010 samples
- **Wheat**: 859 samples
- **Cotton**: 650 samples
- **Sorghum**: 520 samples
- **Pigeonpea**: 480 samples
- **Rice**: 420 samples
- **Groundnut**: 380 samples
- **Masoor**: 12 samples
- **Soybean**: 45 samples
- **Ginger**: 100 samples
- **Grapes**: 77 samples
- **Urad**: 50 samples
- **Moong**: 45 samples
- **Chickpea**: 120 samples
- **Turmeric**: 100 samples
- **Soyabean**: 45 samples
