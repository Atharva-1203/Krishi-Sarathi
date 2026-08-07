# Out-of-Scope Input Handling

This document details the backend validation schemas and standard error contracts when agricultural inputs lie outside the supported model domain.

## Validation Logic Flow
1. **Physical Validation**: Inputs are first checked for physical possibility (e.g. NPK >= 0, pH in `[0, 14]`, humidity in `[0, 100]`).
2. **Model Bounds Check**: Inputs are verified against the absolute training boundaries (`min` to `max`).
3. **Out-of-Scope Rejection**: If any value crosses the training boundary, the predictor halts inference (avoiding extrapolation) and returns a structured validation payload.

## Error Response Schema (HTTP 422)
```json
{
  "status": "out_of_scope",
  "message": "The entered values are outside the supported prediction range.",
  "field_errors": [
    {
      "field": "K",
      "value": 900.0,
      "supported_min": 5.0,
      "supported_max": 205.0,
      "message": "Field 'K' is outside the model's training range."
    }
  ],
  "recommendation": "Please enter values within the supported model domain."
}
```
