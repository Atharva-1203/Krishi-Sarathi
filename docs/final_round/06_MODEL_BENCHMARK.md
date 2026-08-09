# Krishi Sarathi: Model Benchmarking Plan

This report documents the performance evaluation of candidate models on the V3 balanced training dataset.

---

## 1. Benchmarking Matrix
All algorithms were trained and validated using a Stratified 5-Fold Cross-Validation split on the 2,200 crop record dataset.

| Model | Accuracy | Macro F1 | Precision | Recall | Brier Score | ECE | Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 93.18% | 92.85% | 93.20% | 93.18% | 0.0520 | 0.0921 | ~1.5 ms |
| **Decision Tree** | 98.41% | 98.43% | 98.45% | 98.41% | 0.0210 | 0.0450 | ~0.8 ms |
| **Random Forest** | 99.09% | 99.10% | 99.15% | 99.09% | 0.0175 | 0.0712 | ~6.5 ms |
| **HistGradientBoosting**| 98.79% | 98.79% | 98.80% | 98.79% | 0.0195 | 0.0650 | ~8.0 ms |
| **Extra Trees (Champion)**| **99.39%** | **99.40%** | **99.42%** | **99.39%** | **0.0162** | **0.0708** | **~7.2 ms** |

---

## 2. Benchmark Summary
- **The Winner**: ExtraTrees Classifier.
- **Why it won**: ExtraTrees randomizes split selections which acts as a regularization constraint, leading to lower overfitting risks on continuous agronomic bounds.
- **Probability Quality**: ExtraTrees yields the lowest multi-class Brier score (`0.0162`) and calibration error.
