# Configuration Management Strategy

This document details the YAML configuration structure managing our training and inference environments.

## 1. Mapped Configurations

- `dataset.yaml`: Manages file paths for raw, processed, final databases and train/test splits.
- `training.yaml`: Manages Cross-Validation folds, seed numbers, and target metrics.
- `model.yaml`: Manages model hyperparameters (estimators, learning rates, l2 regularization).
- `features.yaml`: Registers numerical, categorical, target, and ignored features.
- `api.yaml`: Manages FastAPI server settings (host, port, target latency).

All configuration parameters are serialized to track changes under version control.
