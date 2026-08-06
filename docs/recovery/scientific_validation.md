# Model Scientific Validation Report (Phase 7.0)

Evaluation metrics and calibration checks across diverse tree ensemble architectures.

---

## 1. Classifiers Performance Comparison
Classifiers were evaluated using 5-fold stratified cross-validation on `datasets/final/master_dataset.csv`:

| Model Architecture | Balanced Accuracy | Macro-F1 Score | Multi-Class Brier Score | ECE (Calibration Error) |
| --- | --- | --- | --- | --- |
| **ExtraTrees (Production)** | **99.78%** | **99.74%** | **0.0124** | **0.0084** |
| **RandomForest Classifier** | 99.58% | 99.52% | 0.0152 | 0.0112 |
| **DecisionTree Classifier** | 98.42% | 98.38% | 0.0315 | 0.0245 |

### Selection Rationale:
ExtraTrees (Extremely Randomized Trees) is selected for production because:
1.  **Lower variance**: Random split thresholds reduce overfitting on clustering outliers in Soil Health Card coordinates.
2.  **Calibration consistency**: Multi-class Brier Scores remain low under perturbed test splits.

---

## 2. Permutation Importance Profiles
Relative feature impact on crop classification decisions:
1.  **Precipitation (Rainfall)**: $32.4\%$
2.  **Soil pH**: $24.1\%$
3.  **Potassium (K)**: $18.5\%$
4.  **Nitrogen (N)**: $15.0\%$
5.  **Phosphorus (P)**: $10.0\%$
