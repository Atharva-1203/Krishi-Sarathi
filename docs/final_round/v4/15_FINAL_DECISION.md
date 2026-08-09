# Final ML Evolution Decision Report

This report logs our final, evidence-driven Go/No-Go decisions for the final round.

---

## 1. Evolution Strategy Decisions

| Operational Path | Verdict | Rationale |
| :--- | :---: | :--- |
| **Using 7.9L dataset for training** | **❌ NO-GO** | Lacks crop suitability labels and climate parameters; contains negative values and impossible pH (8049). |
| **Using 7.9L dataset for feature enrichment** | **❌ NO-GO** | No compatible farm-level join key; causes ecological fallacy. |
| **Joining official weather data** | **🟢 GO (Map Only)** | Sourced from IMD to display historical precipitation curves. |
| **Joining official crop-production data** | **🟢 GO (Map Only)** | Sourced from DES to calculate Shannon diversity indices. |
| **Retraining V4** | **❌ NO-GO** | V3.1 remains the production champion. |

---

## 2. Technical Conclusion
Attempting to force a 100k–200k+ dataset size by copy-pasting district-level dominant crop labels or proxying missing climate parameters represents **manufactured leakage** that will destroy the model's calibration and re-introduce sugarcane default bias. Data quality and scientific defensibility must always be prioritized over raw sample count.
