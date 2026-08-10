# Duplicate & Contamination Audit

This report documents our duplicate detection, near-duplicate analyses, and train-test contamination checks.

---

## 1. Deduplication Pipeline
To ensure that validation results are not artificially inflated by memorized inputs, we checked our models:
- **V3.1 baseline**: Near-duplicate samples between train and test splits (using a Euclidean distance threshold $< 0.02$) are **0**. This validates that holdout test scores ($99.55\%$) represent genuine suitability mapping, not near-duplicate memorization.
- **7.9L database**: High near-duplicate density ($> 490,000$ pairs inside 1,000 sample folds) makes random splits invalid, requiring strict GroupKFold or spatial block clustering.
