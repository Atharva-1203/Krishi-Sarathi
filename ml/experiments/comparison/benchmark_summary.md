# Benchmarking Summary Report

The crop recommendation benchmarking pipeline evaluated all available candidate classifiers under identical training splits and features.

## 1. Win Diagnostics
- **Production Model**: `RandomForest`
- **F1 Macro**: `0.9975`
- **Top-3 Accuracy**: `1.0`
- **Inference Latency**: `15.3061 ms`
- **Model Size**: `4567.0928 KB`

The winning candidate has been promoted to `/ml/models/production/` along with the serialized preprocessor pipeline object.
