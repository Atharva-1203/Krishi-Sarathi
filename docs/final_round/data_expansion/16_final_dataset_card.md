# Dataset Card: Krishi Sarathi V3.1 Training Corpus

This document registers the properties of the active crop predictor training corpus.

---

## 1. Dataset Specifications
- **Name**: Balanced Agricultural Crop Suitability Corpus
- **File Name**: `dataset.csv`
- **File Path**: [`ml/datasets/v3/dataset.csv`](file:///d:/Techrush/ml/datasets/v3/dataset.csv)
- **Size**: 150,034 bytes
- **Row Count**: 2,200
- **Column Count**: 8

---

## 2. Partition & Balance Details
- **Class Balance**: 22 crops, perfectly balanced at 100 rows per class.
- **Shannon Entropy**: 4.4594 bits.
- **Missing Values**: 0 ($0.00\%$) across all columns.
- **Exact Duplicates**: 0 ($0.00\%$).
- **Near-Duplicates (Euclidean distance threshold $< 0.02$)**: 0 (proving no train-test leakage).

---

## 3. Supported Crops Checklist
- Cereals: `rice`, `maize`.
- Pulses: `chickpea`, `kidneybeans`, `pigeonpeas`, `mothbeans`, `mungbean`, `blackgram`, `lentil`.
- Fruits: `pomegranate`, `banana`, `mango`, `grapes`, `watermelon`, `muskmelon`, `apple`, `orange`, `papaya`.
- Plantation / Fiber: `coconut`, `cotton`, `jute`, `coffee`.
