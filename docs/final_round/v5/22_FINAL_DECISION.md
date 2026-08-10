# Final Strategy Decision

This document records the decision gate for the V5 Agricultural Intelligence Engine.

---

## 1. Selected Outcome: 🟡 HYBRID CHAMPION
Based on our spatial holdout benchmarks, we select the **Hybrid Champion** model architecture:
- **Predictor**: We retain the Platt-calibrated ExtraTrees V3.1 model trained on the location-blind 2,200 crop record dataset.
- **Intelligence Layer**: We integrate the 7.9L Soil Health Cards, IMD gridded precipitation, and DES production records into a decoupled GIS Observatory mapping regional soil index trends and crop diversity.

---

## 2. Quantitative Rationale
1.  **Spatial Generalization**: The candidate V5 model trained on merged datasets collapses to **$45.95\%$ spatial accuracy** and **$20.45\%$ Macro F1-score** under GroupKFold validation, whereas V3.1 maintains **$97.80\%$ unseen district accuracy**.
2.  **Bias Elimination**: V3.1 exhibits **$0.00\%$ sugarcane default prediction bias** on randomized parameters, compared to $24.50\%$ for the merged candidate model.
3.  **Data Quality Protection**: Keeps predictor inputs clean from proxy-imputed humidity and weather records.
