# Inference Safety & Sanitization Boundaries

This document defines the strict safety walls built around the ML preprocessor and model estimator.

## 1. Input Sanitization
*   **NaN / Infinity Blocks**: Explicitly rejected at the validator layer before data frames are initialized.
*   **Missing Parameter Rejections**: Fields cannot contain empty strings or null keys.
*   **Numeric Type Enforcement**: Values are cast to floating-point numbers prior to ingestion.

## 2. Model Safety Boundary
```
                    ┌──────────────────┐
User Input ────────→│ Input Validator  │
                    └────────┬─────────┘
                             │
                    Valid?
                    /       \
                  NO         YES
                  ↓           ↓
             Error UI      Preprocessor
                              ↓
                            Model
                              ↓
                         Validation
                              ↓
                           Result
```
No un-sanitized values ever touch the standard StandardScaler scaler or champion ExtraTrees estimator.
