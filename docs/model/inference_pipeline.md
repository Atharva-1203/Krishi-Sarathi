# Inference Prediction Pipeline

This document describes the prediction flow when FastAPI receives a farmer query.

## 1. In-API Prediction Flow
1. **User input validation**: Checks query matches `predict_input_schema.json`.
2. **Feature Enrichment**: Lat/Long coordinates lookup Satara/Solapur taluka medians (micronutrients) and historical rain normals.
3. **Preprocessing**: Numeric StandardScaler and categorical mapping.
4. **Predict Proba**: Model outputs probability scores for all 16 crops.
5. **Class ranking**: Ranks top 3 crops with calibrated scores.
6. **TreeSHAP local explanation**: Runs force values for top-1 recommended crop.
7. **NLG translation**: Generates farmer-friendly markdown feedback text.
