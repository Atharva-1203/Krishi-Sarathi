# 🏛️ Krishi Sarathi — System Architecture

## Overview
Krishi Sarathi is an **AI-Powered Agricultural Decision Intelligence Platform** designed around a 3-layer decoupled architecture:

```text
                               KRISHI SARATHI PLATFORM
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       │                                  │                                  │
       ▼                                  ▼                                  ▼
 LAYER 1: AGRONOMIC ML             LAYER 2: AGRICULTURAL             LAYER 3: PROFIT-FIRST
    SUITABILITY ENGINE                OBSERVATORY                       DECISION ENGINE
 (Location-Blind 7 Features)       (785,857 Evidence Base)             (Decoupled Layer)
       │                                  │                                  │
       ▼                                  ▼                                  ▼
 • 7 Agronomic Parameters           • 779,144 Soil Health Cards        • Expected Revenue (₹/ha)
 • Platt Sigmoid Calibration        • 13,200 IMD Climate Grid Days     • Cultivation Cost (₹/ha)
 • 22 Physiology Crops              • 4,513 DES Yield Records          • Water Demand & Price Volatility
 • Explainability & Sensitivity     • Shannon Diversity Index          • Risk-Adjusted Profit (₹)
 • OOD Safety Gates                 • Herfindahl Concentration         • Economic Signal Badges
```

## Key Architectural Principles
1. **Location-Blind ML Predictor**: The core agronomic classifier uses only continuous physical parameters ($N, P, K, 	ext{temperature}, 	ext{humidity}, 	ext{pH}, 	ext{rainfall}$). It does NOT take district or administrative identifiers as input, preventing spatial overfitting.
2. **Observational Evidence Isolation**: The 779,144 Soil Health Card records power the regional observatory and spatial intelligence layer rather than being force-labelled into the classifier.
3. **Decoupled Financial Intelligence**: The Profit-First engine operates independently after ML suitability scoring. Financial projections never modify, reorder, or alter core agronomic probabilities.
