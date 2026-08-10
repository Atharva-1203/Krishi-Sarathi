# Two-Layer Agricultural Intelligence Architecture

This document describes the decoupled architectural design of the Krishi Sarathi V5 platform.

---

## 1. Architectural Schema

```text
                    KRISHI SARATHI
                          │
          ┌───────────────┴────────────────┐
          │                                │
          ▼                                ▼
   CROP PREDICTION                   MAHARASHTRA
      ENGINE                          AGRICULTURAL
          │                           OBSERVATORY
          │                                │
  Multi-source labelled              779K+ Soil Cards
  agricultural data                  IMD Climate
          │                           DES Statistics
          │                           Other Official Data
          ▼                                │
  Crop ranking                            ▼
  Confidence                         District Analytics
  OOD Detection                       Historical Trends
  Explanation                         Diversity
  Alternatives                       Soil Intelligence
          │                           Rainfall
          └──────────────┬──────────────┘
                         ▼
                 FARMER ADVISORY
```

---

## 2. Layers Decoupling Rationale
1.  **Layer 1 (Predictor)**: Evaluates pure agro-climatic boundaries ($N, P, K$, pH, moisture, weather) in a geography-blind contract, protecting against regional concentration and crop frequency bias.
2.  **Layer 2 (Observatory)**: Renders soil chemistry indicators (average NPK, pH, organic carbon), gridded rainfall anomalies, yield trends, and district crops Shannon diversity choropleths on map overlays.
3.  **Result**: Maximizes the utility of government open data without compromising predictor generalization.
