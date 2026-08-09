# Machine Learning Architecture Plan (V3.1 Champion)

This document maps the architectural pipelines of the crop prediction engine.

---

## 1. High-Level Pipeline Flow
```
User Inputs ➔ Schema validation (Zod) ➔ OOD Range Gate ➔ MinMax Scaling ➔ ExtraTrees Classifier ➔ Platt Calibration ➔ Scorecard Fit Index ➔ JSON API Response ➔ Results Dashboard
```

---

## 2. Component Isolation

### A. Geography-Blind Recommendation Path
The core classifier (`model.pkl`) evaluates soil and climate chemistry only. Coordinates and administrative names are excluded, preventing regional default bias and sugarcane monoculture dominance.

### B. Platt Calibration Module
Calculates Platt sigmoid mappings on tree ensembles to yield calibrated multi-class probability vectors. The API router validates that output vectors sum to $1.0 \pm 10^{-6}$.

### C. Out-of-Distribution (OOD) Scanner
Checks input vectors against training percentiles and bounds, flagging inputs as `NORMAL`, `CAUTION`, or blocking overflows with HTTP 422 at the API gateway.
