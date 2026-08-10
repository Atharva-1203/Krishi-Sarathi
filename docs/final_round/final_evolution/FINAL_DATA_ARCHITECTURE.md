# Final Data Architecture (V5 Final Evolution)

This document describes the data flow design for predictions, observations, and context queries.

---

## 1. Data Layers

### Layer 1: Predictor Training Set
- Perfectly balanced 2,200 crop record dataset.
- Continuous parameters: N, P, K, pH, temp, humidity, rainfall.

### Layer 2: Observational Soil Health Cards
- 779k cards database used to calculate district-wise averages and map legends.

### Layer 3: Meteorological Grids
- Indian Meteorological Department (IMD) rainfall grids mapped over 11 years (2015-2025).

### Layer 4: DES APY registries
- District agricultural area, production, and yield summaries.
- Diversity calculation: Shannon crop diversity.
