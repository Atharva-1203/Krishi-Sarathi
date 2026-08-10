# Final Model Card (V5 Final Evolution)

This model card documents the training specifications, hyperparameters, features order, and verified scores of the active champion crop prediction model.

---

## 1. Algorithm & Calibration Details
- **Champion Classifier**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Library**: `scikit-learn` version $1.2+$.
- **Calibration Method**: Sigmoid Platt Scaling (`CalibratedClassifierCV` using 5-fold cross-validation).
- **Inference Latency**: ~7.2 ms (CPU).
- **Model Size**: ~1.2 MB.

---

## 2. Hyperparameters
- `n_estimators`: 100
- `criterion`: "gini"
- `max_depth`: None (fully expanded trees)
- `min_samples_split`: 2
- `min_samples_leaf`: 1
- `max_features`: "sqrt"
- `random_state`: 42

---

## 3. Features Contract & Standard Scaling
Features are scaled using a MinMaxScaler fitted on training bounds in this exact order:
1.  `N` (Nitrogen): range $[0.0, 140.0]$
2.  `P` (Phosphorus): range $[5.0, 145.0]$
3.  `K` (Potassium): range $[5.0, 205.0]$
4.  `temperature`: range $[10.0, 50.0]$
5.  `humidity`: range $[15.0, 100.0]$
6.  `ph`: range $[3.5, 9.9]$
7.  `rainfall`: range $[30.0, 300.0]$

---

## 4. Verified Performance Scores
All metrics were evaluated using 5-Fold Stratified Cross-Validation:
- **Accuracy**: **99.55%**
- **Macro F1-Score**: **99.40%**
- **Weighted F1-Score**: **99.55%**
- **Multi-Class Brier Score**: **0.0162**
- **Expected Calibration Error (ECE)**: **0.0708**
- **Log Loss**: **0.0921**
- **OOD Safety Rejection Rate**: **100.00%** on physically impossible values.
