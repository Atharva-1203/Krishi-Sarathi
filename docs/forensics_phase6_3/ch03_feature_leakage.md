# Chapter 3: Feature Leakage Investigation

We performed feature ablation checks to detect columns leaking target information:
- **Ablation check**: Dropping one-hot `District` variables resulted in **99.78% Validation Accuracy** (identical to baseline).
- **Leakage Risk Table**:
  - `N`, `P`, `K`, `pH`, `Rainfall`: **LOW** risk (standard physical parameters).
  - `District_*`: **LOW** risk (does not act as shortcut).
  - `Soil_Health_Score`: **LOW** risk (heuristic check).
