# V3.1 Upgrade: Implementation Plan

This document details the plan to upgrade the crop prediction engine to V3.1 Decision Support System.

## 1. Upgrades Layout
*   **Step 1: empirical profiles generation**: Process the training dataset `dataset.csv` and extract statistical distributions (median, IQR, p10, p90, min, max, mean, std) for all 22 crop classes. Save to `crop_profiles.json`.
*   **Step 2: crop taxonomy & metadata creation**: Write `crop_metadata.json` containing scientific names, categories, descriptions, water demands, and growing recommendations for all 22 classes.
*   **Step 3: AgronomicProfileMatcher**: Write python matching algorithms that calculate similarity using robust statistics.
*   **Step 4: API Response Upgrades**: Add OOD validation reports, why/why-not explanations, Top-5 comparison matrices, What-If capabilities, and sensitivity details to the POST `/api/v3/predict` response.
*   **Step 5: Frontend Visualization Layers**: Integrate radar charts, heatmap tables, scenario editors, sensitivity indicators, and Crop Explorer tabs.
*   **Step 6: Tests Verification**: Assert mathematical sanity of all new layers.
