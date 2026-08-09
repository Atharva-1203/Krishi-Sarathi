# Government Database Quality & Anomaly Report (7.9L)

This report logs data corruption issues, physical range overflows, and outliers in the government Soil Health Card database.

---

## 1. Physical Range Violation Audit

We ran boundary filters to count impossible continuous values (such as negative concentrations or impossible pH readings):

- **pH Violations** (values $< 0.0$ or $> 14.0$): 144 cases (minimum pH `-27.31` and maximum `8049.0` represent clear data entry corruptions).
- **Nitrogen (N) Violations** (values $< 0$): 91 cases.
- **Phosphorus (P) Violations** (values $< 0$): 7 cases.
- **Organic Carbon (OC) Violations** (values $< 0$): 43 cases.
- **Electrical Conductivity (EC) Violations** (values $< 0$): 30 cases.

---

## 2. Statistical Outliers (IQR Method)
Using the standard $Q3 + 1.5 \cdot \text{IQR}$ threshold, we computed the volume of statistical outliers representing extreme tails:
- **Phosphorus (P)**: 92,528 outliers (driven by high-variance entries).
- **Organic Carbon (OC)**: 67,588 outliers.
- **Soil pH**: 56,503 outliers.
- **Nitrogen (N)**: 40,489 outliers.
- **Potassium (K)**: 27,567 outliers.
- **Electrical Conductivity (EC)**: 14,214 outliers.

---

## 3. Anomaly Classifications

- **Physically Impossible (Category A)**: Negative nutrient/pH levels, and pH values $> 14.0$. Must be filtered out.
- **Statistically Unusual but Potentially Valid (Category B)**: High potassium values ($> 900$ kg/ha) represent fertile clay soils in Deccan trap regions, which are agronomically plausible.
- **Unit Inconsistencies (Category E)**: Nitrogen readings $> 200,000$ suggest parts-per-million (ppm) measurements were input without standard $kg/ha$ scaling conversions.
