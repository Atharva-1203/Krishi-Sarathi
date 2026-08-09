# Krishi Sarathi: Crop Prediction Engine Specifications

This document outlines the operational details of the Crop Prediction Engine.

---

## 1. Engine Capabilities
The prediction engine processes user queries end-to-end to return a comprehensive suitability scorecard:

- **Top Recommendation Card**: Returns the crop class, Platt-calibrated probability percentage, and confidence level categories (e.g. `VERY HIGH CONFIDENCE`).
- **Top 5 Recommendation List**: Ranks crop compatibility scores dynamically.
- **Explainability Scorecard**: Highlights supporting parameters and limiting factors by comparing input values to targets.
- **Uncertainty Tracking**: Calculates entropy values to measure model consensus.
- **Out-of-Distribution status**: Tags inputs as `NORMAL`, `CAUTION`, or `OUT_OF_DISTRIBUTION`.

---

## 2. API Contract Schema

- **Request Model** (`PredictRequestV3`):
  - `N`: `[0, 1000]`
  - `P`: `[0, 1000]`
  - `K`: `[0, 1000]`
  - `ph`: `[0.0, 14.0]`
  - `temperature`: `[-20.0, 60.0]`
  - `humidity`: `[0.0, 100.0]`
  - `rainfall`: `[0.0, 5000.0]`
- **Response Model** (`PredictResponseV3`):
  - `status`: `"success"` / `"error"`
  - `model_version`: `"V3.1"`
  - `top_recommendations`: list of `{ rank, crop, probability }`
  - `scorecard`: feature compatibilities and medians
  - `entropy`: float value
  - `confidence_level`: string
  - `explanation`: `supporting_parameters` and `limiting_parameters`
