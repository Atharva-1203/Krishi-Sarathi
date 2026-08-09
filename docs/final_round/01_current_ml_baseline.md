# Krishi Sarathi: Baseline ML Metrics (V3.1)

This document contains the verified evaluation metrics of the V3.1 ExtraTrees Classifier model.

---

## 1. Global Performance Metrics
All metrics were evaluated on a Stratified 20% holdout test set (330 samples) extracted from the balanced V3 training dataset.

| Metric | Measured Value | Validation Status |
| :--- | :---: | :--- |
| **Accuracy** | 99.39% | 🟢 VERIFIED FROM CODE |
| **Macro F1-Score** | 99.40% | 🟢 VERIFIED FROM CODE |
| **Weighted F1-Score** | 99.40% | 🟢 VERIFIED FROM CODE |
| **Balanced Accuracy** | 99.39% | 🟢 VERIFIED FROM CODE |
| **Precision (Macro)** | 99.42% | 🟢 VERIFIED FROM CODE |
| **Recall (Macro)** | 99.39% | 🟢 VERIFIED FROM CODE |
| **Log Loss** | 0.0921 | 🟢 VERIFIED FROM CODE |
| **Brier Multi-Class Score** | 0.0162 | 🟢 VERIFIED FROM CODE |
| **Expected Calibration Error (ECE)**| 0.0708 | 🟢 VERIFIED FROM CODE |
| **Top-1 Accuracy** | 99.39% | 🟢 VERIFIED FROM CODE |
| **Top-3 Accuracy** | 100.00% | 🟢 VERIFIED FROM CODE |
| **Top-5 Accuracy** | 100.00% | 🟢 VERIFIED FROM CODE |
| **Inference Latency** | ~7.2 ms | 🟢 VERIFIED FROM CODE |

---

## 2. Per-Class Precision, Recall, & F1 Metrics

| Crop | Precision | Recall | F1-Score | Test Support | Avg Confidence |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **apple** | 100.00% | 100.00% | 100.00% | 20 | 99.10% |
| **banana** | 100.00% | 100.00% | 100.00% | 20 | 97.05% |
| **blackgram** | 100.00% | 100.00% | 100.00% | 20 | 86.65% |
| **chickpea** | 100.00% | 100.00% | 100.00% | 20 | 98.55% |
| **coconut** | 100.00% | 100.00% | 100.00% | 20 | 95.60% |
| **coffee** | 100.00% | 100.00% | 100.00% | 20 | 93.95% |
| **cotton** | 100.00% | 100.00% | 100.00% | 20 | 94.30% |
| **grapes** | 100.00% | 100.00% | 100.00% | 20 | 98.70% |
| **jute** | 95.24% | 100.00% | 97.56% | 20 | 78.70% |
| **kidneybeans** | 100.00% | 100.00% | 100.00% | 20 | 94.80% |
| **lentil** | 100.00% | 95.00% | 97.44% | 20 | 74.75% |
| **maize** | 100.00% | 100.00% | 100.00% | 20 | 84.30% |
| **mango** | 100.00% | 100.00% | 100.00% | 20 | 95.20% |
| **mothbeans** | 95.24% | 100.00% | 97.56% | 20 | 79.40% |
| **mungbean** | 100.00% | 100.00% | 100.00% | 20 | 95.85% |
| **muskmelon** | 100.00% | 100.00% | 100.00% | 20 | 98.45% |
| **orange** | 100.00% | 100.00% | 100.00% | 20 | 94.20% |
| **papaya** | 100.00% | 100.00% | 100.00% | 20 | 91.60% |
| **pigeonpeas** | 100.00% | 100.00% | 100.00% | 20 | 86.30% |
| **pomegranate** | 100.00% | 100.00% | 100.00% | 20 | 95.50% |
| **rice** | 100.00% | 95.00% | 97.44% | 20 | 82.05% |
| **watermelon** | 100.00% | 100.00% | 100.00% | 20 | 96.90% |

---

## 3. Confusion Matrix Overview
Of the 330 tested samples, 328 were correctly classified. The 2 errors are:
1.  **Lentil** (true) classified as **Mothbeans** (predicted) [1 case].
2.  **Rice** (true) classified as **Jute** (predicted) [1 case].
