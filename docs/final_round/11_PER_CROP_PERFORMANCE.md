# Krishi Sarathi: Per-Crop Performance Metrics

This report documents the metrics for all 22 crop classes.

---

## 1. Class-wise Performance Table

Evaluated on a Stratified 20% holdout test set (330 samples):

| Crop | Precision | Recall | F1-Score | Support | Avg Confidence |
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

## 2. Key Confusion Pairs Analysis
The model misclassified only 2 samples out of 330:
1.  **Lentil** (true) predicted as **Mothbeans**: Both require dry soils and neutral-alkaline pH, creating a borderline split state.
2.  **Rice** (true) predicted as **Jute**: Water-intensive requirements overlap during high rainfall.
