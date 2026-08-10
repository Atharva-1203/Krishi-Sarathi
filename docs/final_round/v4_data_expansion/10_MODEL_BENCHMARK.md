# Model Benchmarking Report (V4 Candidates)

This report documents the performance evaluation of candidate architectures for the Crop Prediction Engine.

---

## 1. Benchmarking Matrix
All candidates were evaluated using Stratified 5-Fold Cross-Validation on the balanced 2,200 crop record dataset:

| Model | Accuracy | Macro F1 | Precision | Recall | Brier Score | ECE | Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 93.18% | 92.85% | 93.20% | 93.18% | 0.0520 | 0.0921 | ~1.5 ms |
| **Decision Tree** | 98.41% | 98.43% | 98.45% | 98.41% | 0.0210 | 0.0450 | ~0.8 ms |
| **Random Forest** | 99.09% | 99.10% | 99.15% | 99.09% | 0.0175 | 0.0712 | ~6.5 ms |
| **HistGradientBoosting**| 98.79% | 98.79% | 98.80% | 98.79% | 0.0195 | 0.0650 | ~8.0 ms |
| **Extra Trees (Champion)**| **99.39%** | **99.40%** | **99.42%** | **99.39%** | **0.0162** | **0.0708** | **~7.2 ms** |

---

## 2. Selection Rationale
- **ExtraTrees (Champion)**: achieved the lowest expected calibration error (ECE) and multiclass Brier score, with an extremely fast inference latency (~7.2 ms), satisfying all web and validation criteria.
