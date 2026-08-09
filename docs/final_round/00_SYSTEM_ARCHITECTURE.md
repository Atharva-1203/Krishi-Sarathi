# Krishi Sarathi: System Architecture Plan (Phase 10)

This document describes the decoupled architectural framework of the Krishi Sarathi platform.

---

## 1. High-Level Architecture Overview
Krishi Sarathi maintains a strict separation of concerns between individual, geography-blind agronomic recommendations and regional macro-analytics:

```
                    KRISHI SARATHI
                          │
             ┌────────────┴────────────┐
             │                         │
      CROP PREDICTION            AGRICULTURAL
         ENGINE                  INTELLIGENCE
             │                         │
       7 Features                7.9L Dataset
             │                         │
       Feature Contract          Data Forensics
             │                         │
       Preprocessing             GIS Analytics
             │                         │
       ExtraTrees                Soil Analytics
             │                         │
       Calibration              Rainfall Analytics
             │                         │
       OOD Detection             Crop Analytics
             │                         │
       Top-5 Results             District Insights
             │                         │
       Explanations              Historical Trends
             │                         │
             └────────────┬────────────┘
                          │
                     FRONTEND
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
    Prediction         Analytics           Map
        │                 │                  │
    Top-5 crops       ML Metrics      Maharashtra GIS
        │                 │                  │
    Explanation       Calibration       Rainfall
        │                 │                  │
       PDF             EDA/Stats        District Insights
```

---

## 2. Decoupled Processing Flows

### Flow A: Universal Crop Prediction Engine
1.  **Input Collection**: User provides 7 continuous soil/climate features ($N, P, K$, Temperature, Humidity, pH, Rainfall). No geographical names or coordinates are collected.
2.  **Boundary & OOD Checks**: Checks if values are physically possible (Z-score checks).
3.  **MinMax Scaling**: Features are scaled to $[0, 1]$ based on training limits.
4.  **Ensemble Inference**: The ExtraTrees classifier runs predictions and yields raw votes.
5.  **Platt Calibration**: Restores votes to true probabilities.
6.  **Suitability & Scorecard Indexing**: Checks input distance from crop medians to generate suitability explanations.

### Flow B: Maharashtra GIS Map Analytics
1.  **Choropleth SVGs**: Renders district boundaries using a calculated Soil Quality Index (SQI).
2.  **Government Database Indexing**: Loads district soil averages dynamically from static JSON summaries computed from 779,144 Soil Health Cards.
3.  **Crop & Rain Trends**: Displays district-wise annual rainfall curves and productivity metrics independently from predictions.
