# Krishi Sarathi: Model Improvement Proposal

This report documents model upgrades evaluated for the Crop Prediction Engine.

---

## 1. Benchmarking Matrix

Candidates were trained and validated on a Stratified 5-Fold Cross-Validation split of the balanced 2,200 crop record dataset:

| Model | Accuracy | Macro F1 | Precision | Recall | Brier Score | ECE |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 93.18% | 92.85% | 93.20% | 93.18% | 0.0520 | 0.0921 |
| **Decision Tree** | 98.41% | 98.43% | 98.45% | 98.41% | 0.0210 | 0.0450 |
| **Random Forest** | 99.09% | 99.10% | 99.15% | 99.09% | 0.0175 | 0.0712 |
| **HistGradientBoosting**| 98.79% | 98.79% | 98.80% | 98.79% | 0.0195 | 0.0650 |
| **Extra Trees (Champion)**| **99.39%** | **99.40%** | **99.42%** | **99.39%** | **0.0162** | **0.0708** |

---

## 2. Verdict & Recommendation
We recommend **retaining the calibrated ExtraTrees classifier** as the champion model:
1.  **Lower variance split**: Random split selections act as split regularization, preventing decision thresholds from overfitting on continuous agronomic bounds.
2.  **Smooth Class Probabilities**: ExtraTrees yields the lowest Brier multi-class calibration score (`0.0162`), ensuring highly reliable probability scores.
3.  **Calibrated confidence bounds**: Combined with Sigmoid Platt Scaling, class confidence rates accurately correspond to crop suitability alignment.
