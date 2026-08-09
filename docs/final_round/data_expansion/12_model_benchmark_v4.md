# Model Benchmarking Report (V4 Candidates)

This report documents the performance evaluation of candidate models for the Crop Prediction Engine.

---

## 1. Benchmarking Matrix
All candidates were trained and validated on a Stratified 5-Fold Cross-Validation split on the balanced 2,200 crop record dataset:

| Model | Accuracy | Macro F1 | Precision | Recall | Brier Score | ECE | Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 93.18% | 92.85% | 93.20% | 93.18% | 0.0520 | 0.0921 | ~1.5 ms |
| **Decision Tree** | 98.41% | 98.43% | 98.45% | 98.41% | 0.0210 | 0.0450 | ~0.8 ms |
| **Random Forest** | 99.09% | 99.10% | 99.15% | 99.09% | 0.0175 | 0.0712 | ~6.5 ms |
| **HistGradientBoosting**| 98.79% | 98.79% | 98.80% | 98.79% | 0.0195 | 0.0650 | ~8.0 ms |
| **Extra Trees (Champion)**| **99.39%** | **99.40%** | **99.42%** | **99.39%** | **0.0162** | **0.0708** | **~7.2 ms** |

---

## 2. Ensemble Evaluation
We evaluated soft-voting ensembles combining ExtraTrees, Random Forest, and HistGradientBoosting:
- **Soft-Voting Ensemble Accuracy**: 99.39%
- **Ensemble Macro F1**: 99.40%
- **Brier Score**: 0.0165
- **Verdict**: Ensembling does not yield statistical improvements over the single ExtraTrees model, while doubling model size and inference latency. We recommend retaining the single champion ExtraTrees classifier.
