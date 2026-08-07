# V3 Rebuild: 04 Feature Contract

This document specifies the unified feature contract and feature builder designed to prevent training-serving drift in Krishi Sarathi V3.

## 1. The 7-Parameter Contract
The machine learning feature contract contains exactly seven numeric features. No other variables are supported:

| Feature Name | JSON Key | Data Type | Units | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Nitrogen** | `N` | `float` | kg/ha | Soil Nitrogen ratio |
| **Phosphorus** | `P` | `float` | kg/ha | Soil Phosphorus ratio |
| **Potassium** | `K` | `float` | kg/ha | Soil Potassium ratio |
| **Temperature** | `temperature` | `float` | °C | Ambient air temperature |
| **Humidity** | `humidity` | `float` | % | Relative humidity percentage |
| **pH** | `ph` | `float` | - | Soil pH acidity/alkalinity level |
| **Rainfall** | `rainfall` | `float` | mm | Cumulative seasonal rainfall |

## 2. Zero-Drift Engineering
To avoid divergence between the offline model training pipeline and the active HTTP inference endpoints, the contract is centralized in Python code:

*   **Contract Definition**: [`backend/app/ml/v3/feature_contract.py`](file:///d:/Techrush/backend/app/ml/v3/feature_contract.py)
*   **Pipeline Parser**: [`backend/app/ml/v3/feature_builder.py`](file:///d:/Techrush/backend/app/ml/v3/feature_builder.py)
*   **Standard Scaling**: [`backend/app/ml/v3/preprocessing.py`](file:///d:/Techrush/backend/app/ml/v3/preprocessing.py)

### Pipeline Integrations
Both training and serving pipelines call the exact same methods:

1.  **Training**:
    ```python
    from backend.app.ml.v3.feature_builder import V3FeatureBuilder
    from backend.app.ml.v3.preprocessing import V3Preprocessor
    
    # Process records
    X_raw = V3FeatureBuilder.build_frame(df.to_dict(orient="records"))
    preprocessor = V3Preprocessor()
    X_scaled = preprocessor.fit_transform(X_raw)
    ```
2.  **Serving (Inference)**:
    ```python
    from backend.app.ml.v3.feature_builder import V3FeatureBuilder
    
    # Process request payload dict
    clean_features = V3FeatureBuilder.build_features(payload_dict)
    df_query = pd.DataFrame([clean_features])[FEATURES]
    df_scaled = preprocessor.transform(df_query)
    ```
This guarantees identical input alignments and scaling calculations across all model environments.
