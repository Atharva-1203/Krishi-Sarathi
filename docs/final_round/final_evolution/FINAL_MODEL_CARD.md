# Final Model Card: Krishi Sarathi V3.1

This model card details the prediction engine algorithm, hyperparameters, and preprocessing.

---

## 1. Model Details
- **Algorithm**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Library**: `scikit-learn` version $1.2+$.
- **Hyperparameters**:
  - `n_estimators`: 100
  - `criterion`: Gini impurity
  - `random_state`: 42
- **Calibration**: Sigmoid Platt Scaling.
- **ECE**: 0.0708 | **Brier Score**: 0.0162.
- **Latency**: ~7.2 ms.
