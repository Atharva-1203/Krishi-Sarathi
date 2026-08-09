# Model Card: Krishi Sarathi V3.1

This document specifies the parameters, preprocessors, and limits of the active prediction engine.

---

## 1. Model Details
- **Version**: V3.1
- **Algorithm**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Library**: `scikit-learn` version $1.2+$.
- **Hyperparameters**:
  - `n_estimators`: 100
  - `criterion`: Gini impurity
  - `random_state`: 42
- **Calibration**: Platt Sigmoid scaling.

---

## 2. Feature Contract & Preprocessing

Inputs are scaled using a MinMaxScaler fitted on training ranges:
1.  `N` (Nitrogen): range $[0, 140]$ kg/ha
2.  `P` (Phosphorus): range $[5, 145]$ kg/ha
3.  `K` (Potassium): range $[5, 205]$ kg/ha
4.  `temperature`: range $[10, 50]^\circ\text{C}$
5.  `humidity`: range $[15, 100]\%$
6.  `ph`: range $[3.5, 9.9]$
7.  `rainfall`: range $[30, 300]$ mm

---

## 3. Verified Performance Scores
- **Accuracy**: 99.55%
- **Macro F1**: 99.40%
- **Brier Score**: 0.0162
- **ECE**: 0.0708
- **Inference Latency**: ~7.2 ms
