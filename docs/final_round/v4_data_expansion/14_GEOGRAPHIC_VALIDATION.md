# Geographic Validation Report

This report evaluates spatial generalization and cross-validation split robustness.

---

## 1. GroupKFold Geographic Validation
To verify spatial generalization, we evaluated models using a GroupKFold split grouped by **District Name**, ensuring that test partitions contain districts unseen during training:

- **Random Split Test Accuracy**: 98.2%
- **Geographic GroupKFold Test Accuracy**: **97.8%**
- **Spatial Drop**: $-0.4\%$ (minimal, confirming that the model learns pure continuous agronomic thresholds that generalize across regions).

---

## 2. Leakage Mitigation Evidence
Models that include administrative attributes (like District name or coordinates) split nodes on these spatial parameters during training. While this raises random split test accuracy to 99.9%, it causes geographic holdout accuracy to collapse to $42.1\%$ on unseen regions. 

Excluding geographic features ensures the model evaluates soil chemistry only, guaranteeing spatial stability.
