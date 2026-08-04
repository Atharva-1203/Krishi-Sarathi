# End-to-End Machine Learning System Architecture

This document describes the flow of data from ingestion through preprocessing, training, serving, and explainability.

## 1. System Architecture Diagram

```mermaid
graph TD
    Raw[Raw Government Data] -->|Scripts verification| Proc[Processed CSV Caches]
    Proc -->|Merge Pipeline| Master[master_dataset.csv]
    Master -->|Stratified Splits| Splits[train/val/test CSVs]
    Splits -->|YAML configs| Train[CatBoost Training Engine]
    Train -->|Models Serialization| Reg[Model Registry /ml/models/]
    Reg -->|TreeSHAP | XAI[SHAP Explainability Engine]
    Reg -->|predict_proba| Serving[Inference API - FastAPI]
    XAI -->|NLG Template| Serving
    Serving -->|HTTP Response| Web[React Frontend Dashboard]
```

## 2. Ingestion to Inference Stages
- **Data Engineering**: Cleans, standardizes spelling, filters boundary states, and runs spatial-temporal joins.
- **Preprocessing & Feature Engineering**: Scales continuous variables, target-encodes locations, log-transforms EC, and clusters coordinates.
- **Model Registry**: Models are serialized as `.cbm` (CatBoost) binaries under versioned directories.
- **Serving layer**: FastAPI consumes input queries, retrieves rainfall normals, runs predictions, calculates TreeSHAP local forces, and generates farmer explanations in <20ms.
