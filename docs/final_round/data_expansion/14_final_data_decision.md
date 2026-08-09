# Final Data Strategy Decision

This document records the data strategy decision for the Final Round Upgrade.

---

## 1. The Decision: Decoupled Data Architecture
We will not merge the 7.9 lakh government Soil Health Card database into the crop recommendation training set. Instead, we establish a decoupled design:

```
                                  DATA STRATEGY
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           │                                                         │
   CROP PREDICTION ENGINE                                   GIS MAP OBSERVATORY
           │                                                         │
     2,200 Balanced                                           7.9L Soil Cards +
    Tabular Records                                           IMD Rain + DES APY
           │                                                         │
   General Predictor                                         District Analytics
```

---

## 2. Decision Rationale
1.  **Prevents Spatial Leakage**: The prediction engine is geography-blind, matching crops to continuous parameters only.
2.  **Prevents Crop Frequency Bias**: The predictor training set remains balanced, ensuring no crop dominates predictions under standard test conditions.
3.  **Maximizes Government Data Value**: We leverage the full scale of the 7.8 lakh government records to display Soil Quality Index (SQI) choropleths, Shannon diversity curves, and historical trends on map panels.
