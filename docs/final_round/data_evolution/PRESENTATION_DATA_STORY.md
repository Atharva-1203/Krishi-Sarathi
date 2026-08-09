# Krishi Sarathi: Presentation Data Story

This document maps our data-science narrative for the final round presentation.

---

## 1. The Presentation Narrative

```
   V1 / V2 Legacy
   [Geographic features included ➔ Sugarcane bias & regional memorization]
         │
         ▼
   V3.1 baseline
   [Geography-blind 2,200 balanced dataset ➔ Calibrated ExtraTrees, 0% regional defaults]
         │
         ▼
   Phase 10 Forensic Audit
   [7.9L Soil Cards profiled ➔ No crop labels, missing climate, extreme outlier noise]
         │
         ▼
   The Master Strategy (Decoupled Design)
   [ generalized predictor trained on balanced physics | regional GIS Map powers 7.8L analytics ]
```

---

## 2. Competitive Differentiation Points

When asked by the judges, we present a scientifically defensible response:

> **"Why didn't you train your prediction model on the 7.9 lakh government records?"**
>
> *"Because government Soil Health Cards contain soil readings but lack target crop labels and climate parameters. Fusing this database using district-level default crop outcomes commits an ecological fallacy and leaks spatial bounds. The model would learn administrative defaults (memorizing that Pune grows Sugarcane) instead of agricultural compatibility. We chose to protect predictor generalization and utilize the 7.8 lakh records to build our decoupled Maharashtra GIS analytics."*
