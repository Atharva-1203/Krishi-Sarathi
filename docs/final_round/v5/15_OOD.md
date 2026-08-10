# Out-of-Distribution (OOD) Detection Report

This report outlines the OOD detection framework designed to block invalid inputs and warn users about statistical outliers.

---

## 1. OOD Level Classifications

We classify incoming user input vectors into four distinct states:

### PHYSICALLY_INVALID
- **Criteria**: Parameters exceeding real-world physical limits (e.g. pH $< 0.0$ or $> 14.0$, or negative Nitrogen/Phosphorus/Potassium values).
- **Handling**: Blocked at the API gateway with HTTP 422 (Unprocessable Entity).

### OUT_OF_DISTRIBUTION (OOD)
- **Criteria**: Inputs outside the support boundary of the training corpus (e.g. pH $> 10.0$, or continuous rainfall $> 1,000$ mm).
- **Handling**: Allowed to proceed to model prediction, but triggers an OOD indicator alerting the user that the soil parameters represent highly unusual conditions where recommendations may be less reliable.

### CAUTION
- **Criteria**: Parameters sitting in the extreme tails (top/bottom $1\%$ percentiles) of the training distribution.
- **Handling**: Flagged with a warnings panel indicating atypical soil chemistry.

### NORMAL
- **Criteria**: Within typical training bounds.
- **Handling**: Normal prediction flow.
