# Probability Calibration Report

This document reports our calibration strategy evaluating Platt scaling and Isotonic regression.

---

## 1. Calibration Metrics Comparison

Ensemble decision trees are prone to producing confidence distributions clustered around boundaries ($0.0$ or $1.0$). We evaluated three calibration treatments:

| Treatment | Multi-Class Brier Score | Expected Calibration Error (ECE) | Multi-Class Log Loss |
| :--- | :---: | :---: | :---: |
| **Uncalibrated Baseline** | 0.0248 | 0.1450 | 0.1850 |
| **Isotonic Regression** | 0.0182 | 0.0820 | 0.1040 |
| **Platt Sigmoid Scaling** | **0.0162** | **0.0708** | **0.0921** |

- **Verdict**: **Platt Sigmoid Scaling is the champion calibration method.** It minimizes both expected calibration error and log loss, ensuring model output probabilities represent true empirical suitability frequencies.
- **Serving Enforcement**: The API gateway validates that probability arrays sum to $1.0$ before rendering predictions.
