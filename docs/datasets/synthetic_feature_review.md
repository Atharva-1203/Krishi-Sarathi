# Synthetic Feature Review Report

This report reviews the scientific validity and risk profiles of synthetic features generated in the ML pipeline.

## 1. Humidity (Empirical Climatology Model)
- **Rationale**: Humidity is a vital physiological driver of plant transpiration. Since raw records were missing, we modeled it: $RH = 45.0 + 0.05 \times Rainfall - 0.2 \times Temperature$.
- **Scientific Backing**: Relative humidity is strongly governed by temperature and precipitation.
- **Risk**: Low, but can introduce artificial deterministic bias. **Recommendation**: Replace with IMD/AgERA5 gridded data.

## 2. Soil Health Score (Heuristic chemical index)
- **Rationale**: Combines pH, N, P, K, and OC into a single score (0-10) to represent chemical wellness.
- **Scientific Backing**: Agronomic guidelines define optimal ranges for soil nutrients.
- **Risk**: None. It is derived linearly, avoiding leakage. **Recommendation**: Keep for explainability and visualization.

## 3. NPK Ratios (N_P_Ratio, N_K_Ratio, P_K_Ratio)
- **Rationale**: Relative nutrient balance governs plant root absorption rates.
- **Scientific Backing**: Well-established in soil chemistry (optimal fertilizer proportions).
- **Risk**: None. **Recommendation**: Keep for model training.

## 4. Rainfall Deviation Index
- **Rationale**: Measures the relative departure of crop-specific water index from district normal rainfall.
- **Scientific Backing**: Standard meteorological index.
- **Risk**: None. **Recommendation**: Keep for training.
