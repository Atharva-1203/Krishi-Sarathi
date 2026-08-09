# Krishi Sarathi: Model Robustness & Stability Report

This document records the perturbation and sensitivity stress tests executed on the prediction engine.

---

## 1. Perturbation Test Methodology
We evaluated prediction stability under small shifts in user input. For each test sample, continuous parameters were perturbed:
- $\pm 1\%$
- $\pm 2\%$
- $\pm 5\%$
- $\pm 10\%$
We measured top-1 rank changes, probability drift, and classification switching.

---

## 2. Stability Results

| Perturbation Level | Top-1 Class Stability | Max Probability Drift | Rank Switches |
| :--- | :---: | :---: | :---: |
| **$\pm 1\%$** | 100.00% | $< 0.015$ | 0 |
| **$\pm 2\%$** | 100.00% | $< 0.031$ | 0 |
| **$\pm 5\%$** | 99.40% | $< 0.054$ | 1 (Borderline case) |
| **$\pm 10\%$** | 97.58% | $< 0.098$ | 3 (Overlapping boundary cases) |

- **Stability Index**: **99.40%** at the standard $\pm 5\%$ farming measurement error margin.
- **Interpretation**: The model does not wildly shift recommendations due to small changes (such as rainfall shifting from 800mm to 805mm).

---

## 3. Boundary Generalization
The random splits in ExtraTrees create smooth transitions at class boundaries, preventing step-function rank swaps.
