# Final V4 Go/No-Go Decision Report

This document records the final decision gate for the V4 data expansion phase.

---

- **Dataset size**: 2,200 (Clean base) | 779,144 (Observational GIS Map)
- **Number of sources**: 3 (IMD gridded weather, DES crop APY, Department of Agriculture SHC cards)
- **Number of crops**: 22 crops (uniform representation)
- **Model**: Platt-calibrated Extremely Randomized Trees (ExtraTrees) Classifier (V3.1)
- **Accuracy**: 99.55%
- **Macro F1**: 99.40%
- **Brier**: 0.0162
- **ECE**: 0.0708
- **Latency**: ~7.2 ms
- **OOD performance**: Univariate percentile range checking and physical scale validation active.
- **Leakage status**: **100% Leakage-Free.** No spatial coordinates or administrative boundaries are included in training. Near-duplicates between splits = 0 at distance 0.02.
- **Bias status**: **Balanced.** Sugarcane dominance rate is 0.00% under randomized continuous sweeps.
- **V3 vs V4**: Retaining V3.1 is statistically and agronomically superior. Attempting to merge the unlabeled 7.9L database or skewed external candidate datasets (4,513 rows) compromises model calibration, introduces proxy-imputed humidity leakage, and re-introduces sugarcane default bias.
- **Recommendation**: **NO-GO on retraining the production crop predictor model. GO on deploying V3.1 as the final champion. GO on utilizing the 7.9L database for decoupled Maharashtra GIS Map analytics.**
