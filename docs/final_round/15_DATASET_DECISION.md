# Krishi Sarathi: Training Dataset Decision

This document records the data strategy decision for Phase 10.

---

## 1. Decision Criteria
We evaluated whether to integrate the 779,144 government records into the live crop predictor training set using five core benchmarks:

1.  **Software Correctness**: The model must ingest exactly 7 continuous floats.
2.  **Statistical Validity**: Feature distributions must represent a uniform agricultural population.
3.  **Agronomic Plausibility**: Split thresholds must correspond to physical crop requirements.
4.  **Generalization**: Evaluates features blind to administrative borders.
5.  **Calibration & Bias**: Model probabilities must reflect actual crop suitability with zero default crop bias.

---

## 2. Option Comparison

| Metric | Option A (Raw Merge) | Option B (Augmentation) | Option C (Decoupled - SELECTED) |
| :--- | :--- | :--- | :--- |
| **Agronomic Plausibility** | ❌ Fails (Measurement noise) | ❌ Fails (Invalid profiles) | 🟢 Passes (Strict ranges) |
| **Sugarcane Bias** | ❌ Fails (High bias) | 🟢 Passes (No spatial bounds) | 🟢 Passes (0.00% bias) |
| **Statistical Generalization**| ❌ Fails (Leakage) | ❌ Fails (Overfits noise) | 🟢 Passes (99.39% accuracy) |

---

## 3. Selection Verdict
🟢 **OPTION C SELECTED.**
We will maintain the V3 crop predictor trained on the clean 2,200 records, while feeding the 7.9 lakh database exclusively into the Maharashtra Map layer.
