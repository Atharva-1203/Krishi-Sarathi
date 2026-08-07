# Model Card - Krishi Sarathi Crop Recommender

## Model Details
- **Developer**: Krishi Sarathi MLOps Team
- **Model Type**: ExtraTrees Classifier (Ensemble of Decision Trees)
- **Version**: `v1.0.0`
- **Trained Date**: 2026-08-04
- **Parameters**: `n_estimators=50`, `max_depth=None`, `random_state=42`

## Intended Use
- **Primary Use Case**: Predict the Top-3 suitable crops based on regional soil chemistry (N, P, K, pH) and environmental inputs.
- **Agro Ecology**: Calibrated specifically for Western Maharashtra (Pune Division).

## Evaluation Metrics
- **Validation Top-3 Accuracy**: `100.0%`
- **F1 Macro**: `0.9959`
- **Log Loss**: `0.0091`
- **Average Inference Latency**: `7.47 ms`

## Limitations & Biases
- **Spatial Limits**: Restricted to Pune Division districts (Kolhapur, Satara, Pune, Solapur, Sangli). Should not be used for other agro-climatic zones without retraining.
