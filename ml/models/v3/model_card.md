# Model Card: Krishi Sarathi V3 Crop Prediction Engine

## 1. Intended Use
Provides robust, general-purpose crop recommendations based strictly on 7 environmental and chemical parameters. Decoupled from legacy geographic variables to allow universal application.

## 2. Model Architecture
*   **Algorithm**: ExtraTrees
*   **Calibration**: Sigmoid calibration applied
*   **Features**: N, P, K, temperature, humidity, pH, rainfall
*   **Classes**: 22 crops

## 3. Training & Validation Setup
*   **Dataset Source**: Audited Kaggle Crop Recommendation Dataset (2,200 samples, perfectly balanced)
*   **Data Splits**: 70% Train, 15% Val, 15% Test
*   **Cross-Validation**: 5-fold Stratified CV

## 4. Test Performance
*   **Test Accuracy**: 99.39%
*   **Test Macro-F1**: 99.39%
*   **Test Balanced Accuracy**: 99.39%
*   **Test Log Loss**: 0.0921
*   **Test Brier Score**: 0.0162
*   **Test ECE**: 0.0708
*   **Top-3 Accuracy**: 100.00%
*   **Top-5 Accuracy**: 100.00%

## 5. Limitations & OOD Behavior
The model should not be used with inputs far outside validated bounds. An OOD validation layer reports caution or out-of-distribution alerts when features deviate from training ranges.
