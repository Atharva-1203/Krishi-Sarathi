# Error Handling Strategy

This document details input boundary checks and fallback strategies.

## 1. Input Out-of-Bounds
- **Symptom**: pH > 14, or negative nutrient values.
- **Response**: Reject API request with `422 Unprocessable Entity` containing clear validation messages.

## 2. Unknown Location
- **Symptom**: Query location district/taluka is not in Pune Division.
- **Response**: Fallback to average state medians (Phase 3) and output a warning flag: *"Recommendation uses state averages as local profiles are missing."*

## 3. Pipeline Failure
- **Symptom**: SHAP explainer fails.
- **Response**: Catch exception quietly, return the Top-3 recommendations, and output a fallback explanation: *"Explainability unavailable due to metered API constraints."*
