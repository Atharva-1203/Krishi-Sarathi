# Krishi Sarathi: Final Data Expansion Decision Report

This report presents our final, evidence-based Go/No-Go decisions for Phase 10.

---

## 1. Expansion Decisions Summary

| Operational Target | Verdict | Justification |
| :--- | :---: | :--- |
| **Using 7.9L dataset for training** | **❌ NO-GO** | Lacks crop labels and climate features; contains negative values and impossible pH (8049). |
| **Using 7.9L dataset for feature enrichment** | **❌ NO-GO** | No compatible farm-level join key; causes ecological fallacy. |
| **Joining official rainfall data** | **🟢 GO (Map Only)** | Sourced from IMD to display historical precipitation curves. |
| **Joining official crop-production data** | **🟢 GO (Map Only)** | Sourced from DES to calculate Shannon diversity indices. |
| **Adding external labelled crop datasets** | **🟢 GO (Conditional)** | Only if original source holds clean features and no sugarcane skew. |
| **Reaching 100k samples** | **❌ NO-GO** | Impossible without manufacturing labels or committing spatial leakage. |
| **Reaching 200k samples** | **❌ NO-GO** | Impossible without manufacturing labels or committing spatial leakage. |
| **Retraining V4** | **❌ NO-GO** | Baseline V3.1 ExtraTrees model is highly stable and calibration-fit. |

---

## 2. Technical Justification
Our forensics confirm that the 779,144 Soil Health Cards are highly valuable for regional average visual displays but **scientifically invalid for supervised crop recommendation training**. 

Trying to force a 100k–200k+ dataset size by copy-pasting district-level dominant crop labels or proxying missing climate parameters represents **manufactured leakage** that will destroy the model's calibration. Data quality and scientific defensibility must always be prioritized over raw sample count.
