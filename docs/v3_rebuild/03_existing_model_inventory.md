# V3 Rebuild: 03 Existing Model Inventory

This document details the inventory of model artifacts found within the Krishi Sarathi project.

## 1. Active Production Models
The backend currently contains duplicates of the active V2 model:
*   **Location A (API Serving)**: `backend/app/models/`
    *   `model.pkl` (ExtraTrees Classifier, 15 MB)
    *   `preprocessor.pkl` (StandardScaler object)
    *   `label_encoder.pkl` (List of target classes)
    *   `metadata.json` (Describes model metrics: accuracy=99.55%, balanced_accuracy=99.55%, F1_macro=99.55%)
    *   `feature_order.json` (List of features: `['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']`)
    *   `prediction_engine.py` (Helper prediction engine script)
*   **Location B (ML Workspace)**: `ml/models/production/`
    *   Identical duplicate files of Location A.

## 2. Model Registry Benchmarks
`ml/models/registry.json` logs the performance metrics from previous model trials:
*   `E001_DecisionTree` (F1-Macro: 98.36%, CV Mean: 98.98%, Size: 35 KB)
*   `E002_RandomForest` (F1-Macro: 99.75%, CV Mean: 99.83%, Size: 4567 KB)
*   `E003_ExtraTrees` (F1-Macro: 99.59%, CV Mean: 99.97%, Size: 4005 KB)
*   `E004_XGBoost` (F1-Macro: 99.59%, CV Mean: 99.75%, Size: 1627 KB)
*   `E005_LightGBM` (F1-Macro: 99.59%, CV Mean: 99.61%, Size: 3290 KB)
*   `E006_CatBoost` (F1-Macro: 99.37%, CV Mean: 99.25%, Size: 864 KB)

## 3. Archived and Stale Model Files
Stored under `ml/models/archive/`:
*   `ml/models/archive/v1_baseline/`: Baseline models from initial training.
*   `ml/models/archive/v2_balanced/`: Balanced models targeting dataset distribution corrections.
*   `ml/models/catboost/`, `ml/models/decision_tree/`, `ml/models/extra_trees/`, `ml/models/lightgbm/`, `ml/models/random_forest/`, `ml/models/xgboost/`: Experiments subdirectories containing serialized model pickles from individual training test sweeps.
