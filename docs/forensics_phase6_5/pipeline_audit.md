# Prediction Pipeline Consistency Audit


## Stage-by-Stage Consistency Evaluation

1.  **User Input**: FastAPI schema parsing validates type-constraints and prevents SQL/script injections.
2.  **Sanitization & Imputation**: Restricts inputs to Western Maharashtra boundaries. Missing soil elements are imputed using district-specific Soil Health Card medians instead of global medians.
3.  **ML Inference**: ExtraTrees model generates multi-class raw probability boundaries.
4.  **Agronomic Validation**: Parallel biological constraint checks (Rainfall, Temp, pH, NPK limits).
5.  **Regional Validation**: Cross-checks recommendations against district normal profiles.
6.  **Confidence Fusion**: Merges ML, Agronomy, and Regional scores with a risk penalty subtraction.
7.  **Consistency Assertion**: Enforces zero intersection between recommended and not recommended lists.
