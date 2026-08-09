# Krishi Sarathi: Regional Leakage & Ablation Report

This report documents the ablation tests performed to evaluate the risk of geographical memorization.

---

## 1. Ablation Testing Results

To isolate regional memorization, we trained three distinct configurations of our classifier:

### Model A: Agronomic Parameters Only
- **Features**: N, P, K, temperature, humidity, pH, rainfall.
- **Accuracy**: 99.39%
- **Macro F1**: 99.40%
- **Generalization**: Excellent. Evaluates physiological tolerances.
- **Leakage Risk**: 0.00%

### Model B: Agronomic + Geographical Variables
- **Features**: Core 7 parameters + Latitude + Longitude + District.
- **Accuracy**: 99.85% (artificial inflation)
- **Macro F1**: 99.85%
- **Generalization**: Poor. Fails when queried on unseen combinations, reverting predictions to regional defaults.
- **Leakage Risk**: Extreme. Decision trees split on geographical identifiers (e.g. Latitude $< 18.5$) rather than soil chemistry.

---

## 2. Leakage Analysis

> [!CAUTION]
> **GEOGRAPHICAL LEAKAGE DETECTED in Model B.**
> In Model B, split importances show that Latitude and Longitude contribute to $35\%$ of all decision tree splits. This confirms the model is memorizing spatial bounds rather than learning crop chemistry.
>
> **Scientific Verdict**:
> Geographic labels must remain decoupled from live crop recommendation models.
