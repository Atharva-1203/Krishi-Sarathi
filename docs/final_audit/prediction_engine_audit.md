# Prediction Engine Audit

This document records the exact live prediction path, model algorithms, and contract properties.

## 1. Inference Execution Path
```
Client POST -> predict_v3_endpoint() -> v3_predictor.predict() -> validate_inputs()
                                                                       │ (If in bounds)
                                                                       ▼
                                                               preprocess_inputs()
                                                                       │
                                                                       ▼
                                                             scaler.transform()
                                                                       │
                                                                       ▼
                                                            champion_estimator.predict()
                                                                       │
                                                                       ▼
                                                            prob_calibration()
                                                                       │
                                                                       ▼
                                                             JSON Output Response
```

## 2. Model Properties
*   **Champion Algorithm**: ExtraTrees Classifier
*   **Feature Contract Ordering**: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall` (exactly 7 features)
*   **Calibration Layer**: Isotonic calibration is implemented in the training pipeline to return model-derived probability bands.
