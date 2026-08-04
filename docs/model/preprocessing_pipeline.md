# Preprocessing Pipeline Design

This document details the modular preprocessing pipeline to ensure identical transformations during training and inference.

## 1. Numerical Pipeline
- **Missing Values**: Imputed using **Taluka-level medians** stored during training.
- **Scaling**: `StandardScaler` applied tocontinuous parameters (N, P, K, pH, OC, EC, S, micronutrients, rainfall, temperature, humidity) to ensure regularized splits are scaled identically.

## 2. Categorical Pipeline
- **Missing Values**: Imputed using Mode.
- **Encoding**:
  - `Soil_Color`: One-Hot encoded.
  - `District`, `Growing_Season`: Label encoded.

## 3. Validation Pipeline
- Verifies that inference JSON payloads match the `predict_input_schema.json` bounds (e.g. pH in 0-14, nutrients non-negative).
