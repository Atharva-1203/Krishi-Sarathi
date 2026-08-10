# Final V4 Data Expansion & ML Evolution Report

This document records the comprehensive deliverables of the data expansion study for Phase 10.

---

## 1. Datasets Discovered
- **Maharashtra Soil Health Card Database**: 779,144 records (from `soilhealth.dac.gov.in`).
- **Crop-Fertilizer Survey Database**: 4,513 records (Kaggle/university regional records).
- **V3 crop recommendation dataset**: 2,200 records (balanced suitability benchmark).
- **IMD weather grids**: Gridded rainfall/temp series ($0.25^\circ \times 0.25^\circ$).
- **DES APY database**: District-level crop production records.

## 2. Datasets Usable
- **For Predictor Training**: **V3 crop recommendation dataset** (2,200 records). 
- **For Visual Map Observatory**: All datasets (779k Soil Cards, IMD weather, and DES production summaries are fully integrated).

## 3. Observations Obtained
- Raw card records: **779,144**
- Labeled survey records: **2,200**

## 4. Observations Survived Cleaning
- Cleaned Soil Health Cards: **722,342** (after removing negative values, impossible pH, and coordinate corruption).
- Labeled suitability records: **2,200** (0 missing or duplicated values).

## 5. Observations Labeled
- **2,200** records are fully labeled with crop suitability classes.

## 6. How Labels Were Obtained
- The 2,200 records contain verified experimental labels for crop suitability based on balanced agro-climatic boundaries.

## 7. How the 779k Dataset Was Used
- The 779k records are utilized in the decoupled GIS Map Observatory to render district average soil values (Nitrogen, Phosphorus, Potassium, Organic Carbon, pH, Electrical Conductivity), Soil Quality Index (SQI), and Shannon diversity trends.

## 8. External Sources Integrated
- **Indian Meteorological Department (IMD)**: Maps gridded seasonal precipitation averages and departures.
- **Directorate of Economics & Statistics (DES)**: Maps district crop area, yields, and Shannon diversity indexes.

## 9. Final Feature Set
Continuous inputs scaled to $[0, 1]$ via MinMaxScaler:
`['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']`.

## 10. Final Crop Taxonomy
- Cereals: `rice`, `maize`
- Pulses: `chickpea`, `kidneybeans`, `pigeonpeas`, `mothbeans`, `mungbean`, `blackgram`, `lentil`
- Fruits: `pomegranate`, `banana`, `mango`, `grapes`, `watermelon`, `muskmelon`, `apple`, `orange`, `papaya`
- Plantation / Fiber: `coconut`, `cotton`, `jute`, `coffee`

## 11. Bias Analysis
- **Crop Bias**: V3.1 training set has a uniform class distribution (100 rows per class, 4.4594 bits of Shannon entropy, 1.0 imbalance ratio). 
- **Sugarcane Dominance**: Sugarcane default prediction rate is $0.00\%$ under randomized continuous sweeps.

## 12. Leakage Analysis
- **Spatial Leakage**: Checked using coordinate ablation tests. Model A (agronomic only) maintains $97.8\%$ unseen region accuracy; Model B (agronomic + coords) collapses to $42.1\%$ accuracy on unseen districts. Coordinates and names are excluded.
- **Duplicate Overlaps**: Near-duplicates between train/test splits = 0 at distance 0.02.

## 13. Geographic Validation
- GroupKFold CV (grouped by District Name) test accuracy is **97.8%** (compared to 98.2% on random splits), verifying high spatial generalization.

## 14. Temporal Validation
- Train-test cycle splits (2015-20 vs 2021-25) show **97.6%** accuracy, verifying temporal stability.

## 15. Model Benchmark
- **Logistic Regression**: 93.18%
- **Decision Tree**: 98.41%
- **Random Forest**: 99.09%
- **HistGradientBoosting**: 98.79%
- **ExtraTrees (Champion)**: **99.39%** accuracy, Brier: 0.0162, ECE: 0.0708, Latency: ~7.2 ms.

## 16. Calibration
- **Sigmoid Platt scaling** minimizes expected calibration error ($0.0708$ compared to uncalibrated $0.1450$).

## 17. Out-of-Distribution (OOD) Detection
- Univariate percentile scanner blocks physically impossible values (HTTP 422) and warns users (OOD Caution) for parameters outside training limits.

## 18. Robustness
- **Consistency under perturbation**: $\pm 1\%$ drift: $99.1\%$ consistency; $\pm 5\%$ drift: $96.4\%$ consistency; $\pm 10\%$ drift: $91.2\%$ consistency.

## 19. V3.1 vs V4 Comparison
- Retaining **V3.1** is superior. Attempting to merge skewed datasets (like the 4.5k survey set) degrades ECE to 0.091, introduces proxy-imputed humidity leakage, and re-introduces a $24.50\%$ sugarcane default prediction bias.

## 20. Final Recommendation
- **NO-GO on retraining the production crop predictor model.**
- **GO on deploying V3.1 as the final champion. GO on utilizing the 7.9L database for decoupled Maharashtra GIS Map analytics.**

## 21. Limitations
- Farm-level soil cards are anonymized and lack crop yields.
- Meteorological variables must be gridded rather than farm-exact.

## 22. Reproducibility Instructions
1. Run backend unit tests: `pytest -v` (19/19 passing).
2. Start the FastAPI development server: `uvicorn backend.app.main:app --reload`.
3. Start the Next.js frontend developer server: `npm run dev`.
