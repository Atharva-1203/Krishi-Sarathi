# Final System Architecture (V5 Final Evolution)

This document describes the design layout of the Krishi Sarathi V5 platform.

---

## 1. Structural Layout
- **Gateway Validator**: Rejects physically impossible inputs ($pH < 0.0$ or $> 14.0$, or negative Nitrogen/Phosphorus/Potassium values) and returns HTTP 422.
- **OOD Gate**: Flags caution states or out-of-distribution entries.
- **Predictor Model**: Calibrated ExtraTrees classifier evaluating continuous features.
- **Explanation Layer**: Generates match scorecards, local feature sensitivity, and limiting parameters.
- **Contextual Observatory**: GIS map overlay tracking Soil, Climate, Yield, and Diversity indexes.
