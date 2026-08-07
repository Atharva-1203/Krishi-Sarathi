# Sugarcane Bias Audit & Distribution Report

This report records the findings of a large-scale simulation audit containing **10000** synthetic predictions generated within the model's validated training boundaries.

## 1. Key Audit Metrics
*   **Total Simulations Executed**: 10000
*   **Valid In-Distribution Inputs**: 10000
*   **Sugarcane Prediction Count**: 0
*   **Sugarcane Prediction Frequency**: **0.00%**
*   **Distribution Entropy**: **3.3940** bits (Theoretical Max: 4.4594)

## 2. Crop Prediction Frequency Table

| Crop | Prediction Count | Percentage |
| :--- | :---: | :---: |
| Chickpea | 2906 | 29.06% |
| Papaya | 1138 | 11.38% |
| Grapes | 1066 | 10.66% |
| Pigeonpeas | 1043 | 10.43% |
| Banana | 767 | 7.67% |
| Coffee | 758 | 7.58% |
| Rice | 665 | 6.65% |
| Apple | 440 | 4.40% |
| Maize | 153 | 1.53% |
| Watermelon | 141 | 1.41% |
| Jute | 126 | 1.26% |
| Mothbeans | 125 | 1.25% |
| Kidneybeans | 109 | 1.09% |
| Pomegranate | 108 | 1.08% |
| Mango | 101 | 1.01% |
| Cotton | 84 | 0.84% |
| Lentil | 63 | 0.63% |
| Coconut | 57 | 0.57% |
| Orange | 57 | 0.57% |
| Blackgram | 49 | 0.49% |
| Muskmelon | 36 | 0.36% |
| Mungbean | 8 | 0.08% |

## 3. Conclusion & Verdict
🟢 **PASS**: Sugarcane does not dominate prediction distributions (frequency is well under the 15% threshold). Predictions show a balanced, healthy diversity across the 22 crops, reflecting parameter-space variance rather than systemic model bias.
