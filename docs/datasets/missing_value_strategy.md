# Missing Value Strategy

This document details the strategies applied to handle null values in the data.

## 1. Soil Health Points Database (779,144 rows)
- **N, P, K, pH**: Very low missing counts (<0.03%). Drop missing rows when using for regional training, or impute using the **Taluka-level median** for that cycle.
- **Iron (Fe)**: Contains ~11% nulls. Do not impute Fe globally; use **District-level median** or class imputation to preserve local soil taxonomy features.

## 2. Crop recommendations Database (4,513 rows)
- **Status**: 0 missing values.
- **Resolution**: No imputation required. All merged features (OC, EC, rainfall normals, and micronutrients) are 100% complete.
