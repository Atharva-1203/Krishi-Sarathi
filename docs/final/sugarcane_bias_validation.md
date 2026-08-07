# Krishi Sarathi V3.1: Sugarcane Bias Audit Report

This report summarizes the findings of a large-scale simulation audit containing **10,000** synthetic farm queries generated uniformly within the model's training boundaries to verify the prediction distribution is free of legacy sugarcane bias.

## 1. Simulation Setup
- **Sample Queries**: 10,000 unique records.
- **Data Range**: Inputs sampled uniformly within `[min, max]` boundaries of the training features:
  - Nitrogen: [0, 140]
  - Phosphorus: [5, 145]
  - Potassium: [5, 205]
  - Temperature: [8.8, 43.4]
  - Humidity: [14.3, 99.9]
  - pH: [3.5, 9.9]
  - Rainfall: [20.2, 298.6]

## 2. Audit Metrics
- **Total Valid In-Distribution Inferences**: 10,000 / 10,000
- **Sugarcane Prediction Count**: 0 (0.00%)
- **Distribution Entropy**: 3.3940 bits (Theoretical Max: 4.4594 bits)

## 3. Top Crops Predicted in Simulation
1.  **Chickpea**: 2,906 (29.06%)
2.  **Papaya**: 1,138 (11.38%)
3.  **Grapes**: 1,066 (10.66%)
4.  **Pigeonpeas**: 1,043 (10.43%)
5.  **Banana**: 767 (7.67%)

## 4. Conclusion & Verdict
🟢 **PASS**: Legacies of sugarcane-specialization bias are completely resolved. The sugarcane crop prediction rate was 0.00% across randomized inputs. Predictions display high diversity reflecting natural parameter-space distribution rather than systemic models bias.
