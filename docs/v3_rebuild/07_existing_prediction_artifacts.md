# V3 Rebuild: 07 Existing Prediction Artifacts

This document details the serializations and pickle artifacts currently in use in V2.

## 1. Serialized Pickles
All pickles are serialized using Python's standard `pickle` library.

### `model.pkl`
*   **Path**: `backend/app/models/model.pkl` (duplicated at `ml/models/production/model.pkl`)
*   **Size**: 15,694,212 bytes (~15 MB)
*   **Object Type**: `sklearn.ensemble.ExtraTreesClassifier`
*   **Target Classes**: 22 categories.

### `preprocessor.pkl`
*   **Path**: `backend/app/models/preprocessor.pkl` (duplicated at `ml/models/production/preprocessor.pkl`)
*   **Size**: 747 bytes
*   **Object Type**: `ml.preprocessing.KrishiSarathiPreprocessor` (Note: In the ML training workspace, there is also `ml/preprocessing/preprocessor.pkl` which is 2,274 bytes and contains the scikit-learn standard scaler).

### `label_encoder.pkl`
*   **Path**: `backend/app/models/label_encoder.pkl` (duplicated at `ml/models/production/label_encoder.pkl`)
*   **Size**: 239 bytes
*   **Object Type**: Python list containing strings representing the target crop labels in order.

## 2. Shared Meta Files
*   **`feature_order.json`**: Lists features expected by the V2 model.
*   **`metadata.json`**: Logs metrics and model characteristics.
