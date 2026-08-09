# Krishi Sarathi: Final Model Specifications

This document details the selected champion model configuration.

---

## 1. Model Configuration
- **Algorithm**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Library**: `scikit-learn` version $1.2+$.
- **Hyperparameters**:
  - `n_estimators`: 100
  - `criterion`: Gini impurity
  - `random_state`: 42
  - `class_weight`: None (balanced dataset handles class weights implicitly)

---

## 2. ExtraTrees vs Random Forest
While Random Forests search for the most discriminative threshold at each node split, ExtraTrees selects a threshold completely at random. This stronger randomization acts as a regularizer, reducing variance and mitigating overfitting on continuous features.

---

## 3. Preprocessing Config
- **Scaler**: MinMax Scaler mappingcontinuous inputs to $[0, 1]$ based on training limits.
- **Parity**: The scaler is saved as `preprocessor.pkl` and loaded dynamically by the FastAPI backend to scale real-time API queries.
