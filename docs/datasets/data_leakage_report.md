# Data Leakage Audit Report

This report audits features for target, spatial, and temporal leakage.

## 1. Feature Risk Assessment

| Feature Name | Leakage Risk | Risk Level | Reason & Resolution |
|--------------|--------------|------------|---------------------|
| **Fertilizer** | Target Leakage | **High** | Fertilizer is recommended *after* crop selection. Including it in inputs will leak target class. **Action**: Discard during model training. |
| **District** | Spatial Leakage | **Medium** | Overfitting to district names can cause models to ignore soil chemistry. **Action**: Regularize using target encoding. |
| **N, P, K, pH** | None | **Low** | Standard independent inputs. |
| **Rainfall** | Temporal Leakage | **Low** | Historical averages don't leak future climate. |

## 2. Label Contamination Check
- Verified that crop labels (`Crop`) are only present in the target vector and not mixed with any engineered chemical indexes.
