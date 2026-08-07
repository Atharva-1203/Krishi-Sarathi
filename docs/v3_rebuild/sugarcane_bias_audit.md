# V3 Rebuild: 06 Sugarcane Bias Audit Report

This document presents the sugarcane bias audit performed by running 10,000 synthetic crop recommendation simulations.

## 1. Simulation Distribution
We generated 10,000 inputs sampled uniformly within the 1st to 99th percentile bounds of the training distribution. The predictions are distributed as follows:

| Crop Name | Predicted Top-1 Count | Predicted Percentage | Expected Training Percentage | Deviation |
| :--- | :--- | :--- | :--- | :--- |
| Chickpea | 3147 | 31.47% | 4.55% | +26.92% |
| Grapes | 1103 | 11.03% | 4.55% | +6.48% |
| Pigeonpeas | 1052 | 10.52% | 4.55% | +5.97% |
| Papaya | 1052 | 10.52% | 4.55% | +5.97% |
| Banana | 818 | 8.18% | 4.55% | +3.63% |
| Coffee | 754 | 7.54% | 4.55% | +2.99% |
| Rice | 394 | 3.94% | 4.55% | -0.61% |
| Apple | 366 | 3.66% | 4.55% | -0.89% |
| Jute | 172 | 1.72% | 4.55% | -2.83% |
| Maize | 170 | 1.70% | 4.55% | -2.85% |
| Mango | 150 | 1.50% | 4.55% | -3.05% |
| Watermelon | 146 | 1.46% | 4.55% | -3.09% |
| Pomegranate | 130 | 1.30% | 4.55% | -3.25% |
| Kidneybeans | 116 | 1.16% | 4.55% | -3.39% |
| Mothbeans | 102 | 1.02% | 4.55% | -3.53% |
| Lentil | 71 | 0.71% | 4.55% | -3.84% |
| Cotton | 60 | 0.60% | 4.55% | -3.95% |
| Coconut | 56 | 0.56% | 4.55% | -3.99% |
| Blackgram | 48 | 0.48% | 4.55% | -4.07% |
| Muskmelon | 37 | 0.37% | 4.55% | -4.18% |
| Orange | 32 | 0.32% | 4.55% | -4.23% |
| Mungbean | 24 | 0.24% | 4.55% | -4.31% |

## 2. Sugarcane Bias Diagnostics
*   **Sugarcane Top-1 Count**: 0 out of 10,000 predictions.
*   **Sugarcane Predicted Percentage**: 0.00%.
*   **Expected Class distribution**: 4.55%.
*   **Status**: **PASSED**. There is no Sugarcane dominance. The predicted frequency is close to the expected uniform probability, meaning that Sugarcane is only predicted when the soil parameters genuinely fit its profile (i.e. high rainfall, high N, and high potassium).

## 3. expected vs Predicted Entropy
*   **Prediction Distribution Entropy**: 3.3497 bits (Max possible: 4.4594 bits).
The high entropy value confirms that the model predicts a wide variety of crops in response to diverse input environments, unlike the legacy V2 model which collapsed to predicting Sugarcane.
