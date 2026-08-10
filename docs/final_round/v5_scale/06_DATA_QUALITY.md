# Dataset Quality Audit

This document reports data cleaning, missing value checks, and outlier classification filters.

---

## 1. Missingness & Duplicates Summary

### V3.1 Predictor Training Dataset (2,200 Rows)
- **Missing value rate**: 0.00% across all columns.
- **Exact duplicate rows**: 0 (0.00%).
- **Quality Status**: **Pristine.**

### Maharashtra Soil Health Card Database (779,144 Rows)
- **Missing value rate**: Very low ($< 0.03\%$ on core features).
- **Exact duplicate rows**: 7,271 records ($0.93\%$).
- **Feature duplicates**: 1,154 records ($5.77\%$).

---

## 2. Invalid Values & Outliers (7.9L)
We identified severe data corruption issues:
- **pH Out of Range ($< 3.5$ or $> 10.0$)**: 144 records (minimum pH `-27.31`, maximum `8049.0`).
- **Negative measurements**: 91 Nitrogen, 7 Phosphorus, 43 Organic Carbon, 30 Electrical Conductivity records are negative.
- **Extreme Nutrients**: Nitrogen values up to `278,278` suggest coordinate or card ID data-entry corruption inside chemistry fields.

---

## 3. Classification Filters
- **VALID**: 722,342 soil health cards (retained for mapping).
- **INVALID**: 56,802 cards (discarded due to negative values, impossible pH, or extreme nutrients exceeding physical bounds).
