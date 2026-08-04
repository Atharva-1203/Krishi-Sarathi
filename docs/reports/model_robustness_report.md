# Model Stress Testing and Robustness Report

This report documents the system behavior under edge cases and outlier input bounds.

## 1. Outlier Stress Tests

- **Out-of-Bounds pH (pH = 18.5)**:
  - *Response*: Input boundary validator corrected value to neutral default `7.0` and outputted a warning flag. Model did not crash.
- **Negative Nutrients (N = -45)**:
  - *Response*: Handled successfully. Substituted negative nutrient bounds with pre-calculated train median.
- **Unknown District (District = 'Mumbai')**:
  - *Response*: Standardized spelling mapping fell back to 'Pune' (Pune division baseline average) and generated warning flag.
