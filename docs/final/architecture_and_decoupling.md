# Krishi Sarathi V3.1: Architecture & Decoupling Report

This document outlines the architectural boundary separating the **Explainable AI Crop Predictor** from the **Maharashtra Historical GIS Map Database**.

## 1. Architectural Blueprint (Decoupled Design)

To ensure scientific transparency and prevent regional biases (specifically, historical sugarcane over-representation), the system architecture isolates live model inference from geographic layers.

```mermaid
graph TD
    subgraph Frontend [Next.js Client]
        UI[Prediction Dashboard]
        GIS[Maharashtra GIS Map]
        Telemetry[System Analytics]
    end

    subgraph Backend [FastAPI Server]
        RouteV3[POST /api/v3/predict]
        V3Predictor[V3Predictor Service]
        ETModel[ExtraTrees Champion Classifier]
        Scaler[Standard Scaler]
        OOD[OOD Percentile Boundary Check]
    end

    subgraph Data [Data Layer]
        KaggleSet[2,200 Balanced Records]
        SoilDB[779,144 Soil Health Cards]
    end

    UI -->|7 Input Features Only| RouteV3
    RouteV3 --> V3Predictor
    V3Predictor -->|Validation| OOD
    V3Predictor -->|Inference| Scaler
    Scaler --> ETModel
    ETModel -->|Probability Scores| UI
    
    GIS -->|Loads Baseline| SoilDB
    Telemetry -->|Loads Metrics| KaggleSet
```

## 2. Decoupling Verification

1.  **Feature Vector Boundary**: The predictive vector ingested by the preprocessor is strictly bound to 7 numeric variables: `[N, P, K, temperature, humidity, pH, rainfall]`.
2.  **No Geographic Inputs**: District names, divisions, soil color codes, coordinates, and coordinates-derived indexes are completely omitted from the model pipeline.
3.  **Map Purpose**: The Maharashtra GIS map displays static, aggregated soil health card metrics from 779,144 records to provide farmers with baseline references. It is not coupled to the live prediction model.
