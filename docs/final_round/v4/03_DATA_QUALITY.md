# V4 Data Quality Report

This report presents our forensic analysis of data cleanliness, missing values, anomalies, and outliers.

---

## 1. Missingness & Duplicate Audit

### V3.1 Predictor Training Dataset (2,200 Rows)
- **Missing value rate**: 0.00% across all columns.
- **Exact duplicate rows**: 0 (0.00%).
- **Coordinate duplicates**: 0 (0.00%).
- **Quality Status**: **Pristine.**

### Maharashtra Soil Health Card Database (779,144 Rows)
- **Missing value rate**: Very low ($< 0.03\%$ on N/P/K/pH).
- **Exact duplicate rows**: 7,271 global copies.
- **Feature duplicates (N/P/K/pH identical)**: 5.77% (based on a 20k sample sweep).
- **Quality Status**: **Highly Contaminated.**

---

## 2. Impossible Range Violations (7.9L)
We flagged severe data corruption cases in the government Soil Health Cards:
- **pH Out of Range ($< 0$ or $> 14$)**: 144 records (minimum pH `-27.31`, maximum `8049.0`).
- **Negative concentrations**: 91 Nitrogen, 7 Phosphorus, 43 Organic Carbon, 30 Electrical Conductivity records are negative.
- **Anomalous Outliers**: Nitrogen values up to `278,278` suggest coordinate or card ID data-entry corruption inside chemistry fields.
