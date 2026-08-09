# Krishi Sarathi: Feature Compatibility Matrix

This report details feature availability across our primary datasets.

---

## 1. Feature Availability Matrix

We compare continuous feature availability with our current 7-parameter contract:

| Target Feature | 7.9L Soil Database | Crop-Fertilizer (Raw) | Bhoomi Soil Data | V3 Predictor Contract |
| :--- | :---: | :---: | :---: | :---: |
| **Nitrogen (N)** | 🟢 Present | 🟢 Present | 🟢 Present | 🟢 Present |
| **Phosphorus (P)** | 🟢 Present | 🟢 Present | 🟢 Present | 🟢 Present |
| **Potassium (K)** | 🟢 Present | 🟢 Present | 🟢 Present | 🟢 Present |
| **pH Acidity** | 🟢 Present | 🟢 Present | 🟢 Present | 🟢 Present |
| **Temperature** | ❌ Missing | 🟢 Present | ❌ Missing | 🟢 Present |
| **Humidity** | ❌ Missing | ❌ Missing | ❌ Missing | 🟢 Present |
| **Rainfall** | ❌ Missing | 🟢 Present | ❌ Missing | 🟢 Present |

---

## 2. Imputation & Proxy Audits

> [!WARNING]
> **SYNTHETIC IMPUTATION DETECTED in `master_dataset.csv`.**
> Because the raw `crop_fertilizer_dataset_raw.csv` lacked the `Humidity` parameter, the processed `master_dataset.csv` filled this column by copy-pasting a fixed value (e.g. `91.99` for all Sugarcane records).
>
> **Scientific Impact**:
> This creates a synthetic proxy correlation. A decision tree trained on this data will split on the arbitrary value `91.99` to identify Sugarcane. This is a severe threat to generalization.
