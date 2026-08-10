# Data Quality & Outliers Report (V5 Final Evolution)

This document registers our data cleaning, missing value checks, duplicate rate audits, and outlier filters.

---

## 1. Quality Indicators

| Metric | Predictor Dataset (2,200 Rows) | Soil Card Database (779K Rows) | Action Taken |
| :--- | :---: | :---: | :--- |
| **Missing Values** | 0.00% | 0.02% | Missing coordinates filtered. |
| **Exact Duplicates**| 0.00% | 0.93% | 7,271 duplicate rows removed. |
| **Near Duplicates** | 0.00% | 5.77% | Cleaned prior to map aggregation. |
| **Invalid Records** | 0.00% | 7.28% | 56,802 anomalous records removed. |

---

## 2. Invalid Measurement Filters
We implemented strict outlier filters to remove corrupted soil health cards:
- **Negative Values**: Discarded records where Nitrogen, Phosphorus, Potassium, Organic Carbon, or pH was negative (182 cases).
- **Impossible pH**: Discarded records where pH was outside physical limits ($< 3.5$ or $> 10.0$).
- **Extreme Nutrients**: Discarded entries where Nitrogen exceeded $200,000$ kg/ha or Potassium exceeded $800,000$ kg/ha (SQL insertion shifts).
- **Result**: $722,342$ cards survived as valid observations; $56,802$ were filtered out as corrupted.
