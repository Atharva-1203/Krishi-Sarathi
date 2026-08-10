# Final Round Team Cheat Sheet (V5 Final Evolution)

This cheat sheet serves as a quick reference for the hackathon team during presentations and Q&A.

---

## 1. Key Metrics to Memorize
- **Production Model**: Calibrated ExtraTrees Classifier (Sigmoid Platt Scaling).
- **Predictor Training Set**: 2,200 observations, 22 balanced crop classes (100 per class).
- **Holdout Accuracy**: 99.55% | **Macro F1**: 99.40%.
- **Uncertainty Indicators**: Brier Score: 0.0162 | ECE: 0.0708.
- **Serving Latency**: ~7.2 ms inference time.
- **Evidence Base (Maharashtra Map)**: 779,144 Soil Health Cards (722,342 valid; 56,802 anomalous removed).

---

## 2. Core Narrative Highlights
1.  **Science First**: We refused to "fudge" our data count by assigning district crops to soil cards. We separate predictions from regional historical profiles to avoid spatial leakage.
2.  **Uncertainty Gate**: The predictor returns OOD warnings (Physically Invalid, Caution, or Out-of-Distribution) when inputs deviate from training bounds.
3.  **Visual observatory**: The 7.9L database is integrated into the GIS observatory sidebar to display real-time soil, rainfall, crop yields, and Shannon crop diversity graphs.
