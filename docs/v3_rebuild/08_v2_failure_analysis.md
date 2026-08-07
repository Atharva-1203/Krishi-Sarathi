# V3 Rebuild: 08 V2 Failure Analysis

This document details the diagnostic and structural failures identified in the legacy V2 prediction system.

## 1. Roots of the Sugarcane Bias
The persistent sugarcane bias stems from:
1.  **Imbalanced Training Records**: The legacy `master_dataset.csv` has highly skewed class representations, especially in the Pune and Kolhapur districts, where Sugarcane is the dominant crop.
2.  **District Imputation Corollaries**: Serving inputs without explicit soil metrics are auto-filled with high-nitrogen and organic carbon soil values mapped from the selected district, which closely matches Sugarcane's biological profile.
3.  **Regional Prior Boosting**: The fusion equation assigns 25% weight to `regional_suitability`. In districts like Pune or Kolhapur, Sugarcane is in the expected list, immediately boosting its score over other crops.

## 2. Training-Serving Drift
The V2 model experienced training-serving drift because:
1.  **Divergent Pipelines**: Training was performed on a dataset with pre-engineered columns, whereas serving performed row-by-row feature mapping, ratio calculations, and boundary lookups using slightly different code paths.
2.  **Feature Overwrites**: The backend server silently overrides parts of the user request (like adding organic carbon values based on location) after pydantic parsing, causing the model to receive inputs different from what the user submitted.

## 3. Lack of Out-of-Distribution (OOD) Protection
The model lacks support validation. If a user inputs extremely high nutrient values (e.g. N = 500, P = 300) that are physically impossible or far beyond the training data's max (which is around 140), the model still returns predictions with high confidence, rather than alerting the user that the input lies outside the valid range.

## 4. Complex Post-Processing overrides
Rather than relying on model outputs, the system attempts to fix bias by writing specific penalties and overrides (e.g. suppressing Sugarcane probabilities if rainfall is low). This creates fragile, unmaintainable, and scientifically indefensible heuristics.
