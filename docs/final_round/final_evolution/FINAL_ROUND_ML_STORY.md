# Final Round ML Story (V5 Final Evolution)

This document maps out our final round machine learning story.

---

## 1. Narration Keypoints
- We rejected simple raw database concatenation. Forensic audits showed that the 7.9L database lacks target crop labels and weather features. 
- Concatenating it by imputing coordinates and averages creates location leakage, collapsing spatial accuracy on held-out districts.
- We selected Sigmoid Platt-calibrated Extremely Randomized Trees (ExtraTrees) for our Layer 1 crop suitability model.
- We reserved the 7.9L Soil Cards database for Layer 2 observational GIS map telemetry and diversity overlays.
