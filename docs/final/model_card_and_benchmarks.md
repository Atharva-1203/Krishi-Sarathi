# Krishi Sarathi V3.1: Model Card & Performance Benchmarks

This document records the design choices, training metrics, and calibration performance of the champion crop classification model.

## 1. Intended Use
The classifier is designed for general-purpose agricultural decision support. Given soil chemical properties and local climatic metrics, it determines the statistical suitability indices of 22 distinct crop types.

## 2. Champion Classifier Design
*   **Model Type**: ExtraTrees (Extremely Randomized Trees) Classifier
*   **Hyperparameters**: 100 Estimators, Gini criterion, bootstrapped
*   **Calibration**: Platt Scaling (Sigmoid probability calibration)
*   **Ingested Features**: `['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']`
*   **Model Size**: 14.6 MB

## 3. Training Dataset Specifications
*   **Source**: Cleaned, verified Kaggle Crop Recommendation Dataset
*   **Size**: 2,200 records
*   **Class Balance**: Perfectly balanced with exactly 100 samples per target crop
*   **Crops Included**: Rice, Maize, Chickpea, Kidneybeans, Pigeonpeas, Mothbeans, Mungbean, Blackgram, Lentil, Pomegranate, Banana, Mango, Grapes, Watermelon, Muskmelon, Apple, Orange, Papaya, Coconut, Cotton, Jute, Coffee.

## 4. Test Performance Benchmarks
Evaluated on a 15% stratified test split (330 samples):

| Metric | Score | Status |
| :--- | :---: | :---: |
| Test Accuracy | 99.39% | 🟢 PASS |
| Macro-F1 Score | 99.39% | 🟢 PASS |
| Balanced Accuracy | 99.39% | 🟢 PASS |
| Log Loss | 0.0921 | 🟢 PASS |
| Calibrated Brier Score | 0.0162 | 🟢 PASS |
| Expected Calibration Error (ECE) | 0.0708 | 🟢 PASS |
| Top-3 Accuracy | 100.00% | 🟢 PASS |
| Top-5 Accuracy | 100.00% | 🟢 PASS |

## 5. Global Feature Importances (Gini Weights)
1.  **Rainfall**: 28%
2.  **Temperature**: 21%
3.  **Humidity**: 17%
4.  **Nitrogen (N)**: 13%
5.  **Potassium (K)**: 10%
6.  **Phosphorus (P)**: 7%
7.  **Soil pH**: 4%
