# V4 Forensic Executive Summary

This report summarizes our findings during the second-stage data expansion and ML evolution study of Krishi Sarathi.

---

## 1. Core Findings
- **The Prediction Baseline (V3.1)**: Platt-calibrated ExtraTrees classifier trained on a balanced 2,200 crop record dataset. Highly stable ($99.55\%$ accuracy, $0.0162$ Brier score, $0.0708$ ECE).
- **The Data Expansion Audit**: Audited approximately 7.9 lakh government Soil Health Cards. The database contains raw soil chemistry but lacks target crop labels and meteorological features.
- **Feasibility Verdict**: Reaching a 100k–200k+ dataset size by joining district-level default crop outcomes is **scientifically invalid** (commits an ecological fallacy and introduces location leakage).

---

## 2. Decoupled Architecture Recommendation
To preserve the predictive integrity of the platform while leveraging government-scale data, we recommend the **Decoupled Architecture**:
1.  **Crop Predictor**: Stays trained on the balanced 2,200-sample dataset (blind to district boundaries and coordinates).
2.  **GIS Map Observatory**: Loaded with the 7.8 lakh government soil records and IMD meteorological anomalies to display regional analytics.
