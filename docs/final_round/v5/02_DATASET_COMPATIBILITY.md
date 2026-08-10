# Dataset Compatibility Matrix

This report details the semantic, unit, and feature compatibility of candidate datasets.

---

## 1. Compatibility Matrix

We evaluate candidate datasets against the current 7-parameter predictor contract:

| Dataset | Feature Contract | Target Crop Labels | Units | Duplication | Spatial Generalization | Classification |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **V3.1 Base** | 🟢 7/7 present | 🟢 22 classes (balanced) | Standard | 0.00% | 🟢 Geography-blind | **A (Direct Compatible)** |
| **7.9L Database**| ❌ 4/7 present | ❌ 0 classes (unlabeled) | Variable | 5.77% | ❌ Coordinates only | **D (Map / Analytics)** |
| **Crop-Fertilizer**| ❌ 6/7 present | 🟢 16 classes (skewed) | Standard | 1.71% | ❌ Location memorized | **E (Reject)** |

---

## 2. Compatibility Notes

- **Humidity Missingness**: The crop-fertilizer survey lacks the `humidity` parameter. Merging it requires either deleting the feature or proxy-imputing values, which introduces synthetic correlation leakage.
- **Ecological Fallacy**: The 7.9L database does not contain crop labels. Fusing crop targets using district-level averages represents spatial leakage.
