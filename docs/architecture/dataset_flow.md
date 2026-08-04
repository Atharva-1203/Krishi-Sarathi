# Krishi Sarathi - Dataset Flow Mapping

This document visualizes the lifecycle of our data.

```text
Raw Datasets (PDF, HTML, KML)
      │
      ▼
Python Extraction Engine
      │
      ▼
Intermediate CSVs (Cleaned Soils, Cleaned Rainfall, Cleaned Geoportal)
      │
      ▼
Spatial-Temporal Merge Pipeline
      │
      ▼
Unified Master ML Dataset
      │
      ▼
Feature Scaling & Spatial Encoding
      │
      ▼
Train / Test Split Arrays -> XGBoost/CatBoost
```
