# Krishi Sarathi: Model Probability Calibration

This report documents the probability calibration methodology and verification.

---

## 1. The Need for Calibration
Tree ensemble classifiers (like ExtraTrees) calculate raw class probabilities as vote fractions. Because individual trees are highly optimized, vote fractions tend to group near $0$ or $1$, resulting in overconfident predictions that do not represent true agronomic suitability.

---

## 2. Calibration Method
- **Method**: Sigmoid Platt Scaling.
- **Implementation**: Fits a logistic regression mapping on the tree votes to yield calibrated probability vectors.
- **Verification Constraints**: The FastAPI router validates that the output probability vector sums to $1.0 \pm 10^{-6}$.

---

## 3. Calibration Metrics
- **Brier Multi-Class Score**: **0.0162** (Lower is better, indicating extremely high alignment between model probabilities and true suitability).
- **Expected Calibration Error (ECE)**: **0.0708**
- **Confidence vs Probability**: Model probability is the calibrated mathematical likelihood of suitability; Confidence is the separation margin.
