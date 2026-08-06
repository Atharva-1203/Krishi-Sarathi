# Krishi Sarathi - Machine Learning Architecture

This directory contains the production-grade machine learning pipelines for the Krishi Sarathi crop recommendation and explainability project.

## Directory Structure
- `data/`: Local cache of ML datasets.
- `configs/`: YAML config files for model hyperparameters, training paths, and features.
- `preprocessing/`: Scripts for encoding, missing value imputation, and cleaning.
- `feature_engineering/`: Scripts for scaling, normalizations, and spatial coordinate clustering.
- `training/`: Code for model training, cross-validation, and tuning.
- `evaluation/`: Scripts to calculate classification metrics, confusion matrices, and ROC curves.
- `explainability/`: SHAP explainer pipelines and local/global explainability generation.
- `inference/`: Endpoints and batch prediction interfaces.
- `models/`: Serialized model binaries (e.g., XGBoost, LightGBM models).
- `artifacts/`: Performance summaries and charts.
- `notebooks/`: Research and prototyping Jupyter notebooks.
- `utils/`: Common helper utilities.
- `tests/`: Unit and integration tests for ML code.
