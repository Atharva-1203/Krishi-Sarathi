# Krishi Sarathi: Model Upgrade Plan

This document outlines the pipeline selection and evaluation strategy for a future model version (V4).

---

## 1. Candidate Model Selection
If the dataset is evolved, we will benchmark six algorithms using Stratified 5-Fold Cross-Validation:

1.  **ExtraTrees (V3.1 Champion)**: Fast inference, low split variance.
2.  **HistGradientBoosting**: Handles missing values natively and splits fast.
3.  **XGBoost / LightGBM / CatBoost**: State-of-the-art gradient boosted trees for tabular benchmarks.
4.  **Random Forest**: Strong baseline, higher split variance than ExtraTrees.

---

## 2. Evaluation Criteria
A model will be selected as the new champion only if it outperforms the baseline across all 5 verification pillars:

- **Accuracy / F1**: Holds Stratified holdout Macro-F1 $\ge 98.0\%$.
- **Calibration**: Multi-Class Brier Score $\le 0.020$ and ECE $\le 0.08$.
- **Generalization (Leakage free)**: Maintains Holdout test score on unseen districts.
- **Robustness**: Stabilizes predictions under $\pm 5\%$ parameter drifts.
- **Serving latency**: Inference time remains under 10 ms.
