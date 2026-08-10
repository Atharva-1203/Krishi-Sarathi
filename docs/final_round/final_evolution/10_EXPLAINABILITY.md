# Prediction Explainability Report (V5 Final Evolution)

This document reports our explainability design covering feature contributions and local sensitivity analysis.

---

## 1. Feature Attribution & Local Explainers
For each crop recommendation, the system generates:
- **Agronomic Match Score**: A comparison of the user's input parameters against the empirical distribution median for that crop.
- **Top 5 Recommendations**: Complete list of top choices with associated Platt-scaled suitabilities.
- **Alternative Crops**: Evaluated recommendations and reasons they were placed lower in suitability.

---

## 2. Sensitivity Perturbation Index
The system perturbates Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall by $\pm 5\%$ at prediction time. If the recommendation stays identical, it is flagged as **HIGH STABILITY**. Switch-points trigger an advisory tooltip indicating marginal soil suitability.
