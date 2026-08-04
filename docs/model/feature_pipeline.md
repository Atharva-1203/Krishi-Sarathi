# Feature Pipeline Specification

This document maps the exact cleaning, transformation, and encoding flow for every input feature.

| Feature | Cleaning | Transformation | Encoding | Scaling | Final ML Feature |
|---------|----------|----------------|----------|---------|------------------|
| **N, P, K** | None | None | None | StandardScaler | Continuous Float |
| **pH** | Bounds check | None | None | StandardScaler | Continuous Float |
| **EC** | Bounds check | Log-Transform | None | StandardScaler | Continuous Float |
| **OC** | Bounds check | None | Low/Med/High | One-Hot | Categorical (3-dim) |
| **Soil_Color** | Strip whitespace | None | None | One-Hot | Categorical (6-dim) |
| **District** | Spelling dict | Target-Encoding | Label | None | Integer / Float |
| **Rainfall** | Bounds check | None | None | StandardScaler | Continuous Float |
| **N_P_Ratio** | Add 0.01 to P | `N / (P+0.01)` | None | StandardScaler | Continuous Float |
