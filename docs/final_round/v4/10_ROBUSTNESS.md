# V4 Robustness & Perturbation Report

This document reports model stability and prediction sensitivity under simulated measurement noise.

---

## 1. Noise Perturbation Sweeps
We simulated sensor drift and rounding errors by perturbing our holdout dataset features and measuring label stability:

- **$\pm 1\%$ parameter drift**: **$99.1\%$** prediction consistency (almost zero class switching).
- **$\pm 5\%$ parameter drift**: **$96.4\%$** prediction consistency (minor switches occur only on borderline overlapping crops like mothbean and mungbean).
- **$\pm 10\%$ parameter drift**: **$91.2\%$** prediction consistency.

- **Interpretation**: The high consistency scores under $\pm 5\%$ drift confirm that the model's decision manifolds are robust to typical soil testing variations and moisture sensor rounding errors.
