# Legacy Components Retirement Log

This directory logs the legacy prediction components that are retired as part of the V3 clean-slate rebuild.

## Retired Components

1.  **`backend/app/services/prediction_service.py`**
    *   *Description*: Contains the 10-stage debugging trace, biological limits checks, regional expectation matching, and three-layer fusion equations.
    *   *Retirement Rationale*: Implements hardcoded decision fusion, sugarcane adjustments, and location-based prior boosting. Replaced by pure ML probabilities.
2.  **`backend/app/models/prediction_engine.py`**
    *   *Description*: A duplicate prediction engine wrapper executing inline input correction (e.g. capping pH, filling missing nutrients with medians).
    *   *Retirement Rationale*: Created divergent prediction paths and masked incorrect frontend validation.
3.  **`backend/app/ml/feature_builder.py` and `ml/preprocessing/shared_feature_builder.py`**
    *   *Description*: Engineered soil health scores, ratios, and district categories.
    *   *Retirement Rationale*: Added geographic identifiers and artificial features which contributed to model drift and regional bias.
4.  **`backend/app/ml/preprocessing.py`**
    *   *Description*: Legacy standard scaling and custom categorization class.
    *   *Retirement Rationale*: Hardcoded to encode 21 numeric columns and administrative one-hot columns (soil color, districts, season).
5.  **`backend/app/models/model.pkl` and `preprocessor.pkl`**
    *   *Description*: 15MB ExtraTrees model binary and preprocessor serialization.
    *   *Retirement Rationale*: Trained on biased Maharashtra soil health card data with district defaults.
6.  **`backend/app/ml/shap_engine.py`**
    *   *Description*: SHAP explainer code.
    *   *Retirement Rationale*: Utilized TreeExplainer on a high-dimensional feature set which introduced latency and instability.
