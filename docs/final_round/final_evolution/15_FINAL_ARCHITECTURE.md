# Platform System Architecture (V5 Final Evolution)

This document describes the decoupled multi-layer architecture of the Krishi Sarathi platform.

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

## 2. Decoupled Processing
- **Predictor Layer**: Geography-blind ML prediction engine to avoid spatial leakage.
- **Observatory Layer**: Interactive choropleth and Recharts district profiles showing historical soil and meteorological statistics.
