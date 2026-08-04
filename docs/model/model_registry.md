# Model Registry Strategy

This document details how trained model binaries and metadata are stored.

## 1. Directory Structure

```text
ml/
└── models/
    ├── best_model/          # Active production binary (e.g. best_model.cbm)
    ├── candidate_models/     # Benchmarked candidate binaries
    ├── archive/             # Retired production binaries
    └── metadata/            # JSON files tracking metadata for each version
```

## 2. Model Metadata Log Scheme
Each saved model must be accompanied by a JSON file under `metadata/` tracking:
- `model_version`: e.g. `v1.0.0`
- `training_date`: YYYY-MM-DD
- `dataset_version`: e.g. `master_dataset_v1.0`
- `experiment_id`: e.g. `EXP_003`
- `hyperparameters`: dict of parameters used
- `evaluation_metrics`: dict of F1-macro, logloss, and accuracy
- `git_commit_hash`: Git hash of the training code
