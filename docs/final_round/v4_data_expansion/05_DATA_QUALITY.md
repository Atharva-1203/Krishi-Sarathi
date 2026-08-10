# Data Quality & Anomaly Report

This report documents our analysis of dataset cleanliness, duplicates, outliers, and unit inconsistencies.

---

## 1. Missingness & Duplicates Summary

### V3.1 Predictor Training Dataset (2,200 Rows)
- **Missing value rate**: 0.00% across all columns.
- **Exact duplicate rows**: 0 (0.00%).
- **Coordinate duplicates**: 0 (0.00%).
- **Quality Status**: **Pristine.**

### Maharashtra Soil Health Card Database (779,144 Rows)
- **Missing value rate**: Very low ($< 0.03\%$ on core features).
- **Exact duplicate rows**: 7,271 records ($0.93\%$).
- **Feature duplicates (identical feature chemistry)**: 1,154 records ($5.77\%$).

---

## 2. Invalid Values & Outliers (7.9L)
We identified severe data corruption issues:
- **pH Out of Range ($< 0$ or $> 14$)**: 144 records (minimum pH `-27.31`, maximum `8049.0`).
- **Negative measurements**: 91 Nitrogen, 7 Phosphorus, 43 Organic Carbon, 30 Electrical Conductivity records are negative.
- **Extreme Nutrients**: Nitrogen values up to `278,278` suggest coordinate or card ID data-entry corruption inside chemistry fields.

---

## 3. Anomaly Classifications

- **Physically Impossible (Category A)**: Negative nutrient/pH levels, and pH values $> 14.0$. Must be filtered out.
- **Statistically Unusual but Potentially Valid (Category B)**: High potassium values ($> 900$ kg/ha) represent fertile clay soils in Deccan trap regions, which are agronomically plausible.
- **Unit Inconsistencies (Category E)**: Nitrogen readings $> 200,000$ suggest parts-per-million (ppm) measurements were input without standard $kg/ha$ scaling conversions.
