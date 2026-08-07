# V3 Rebuild: 01 V2 Prediction Engine Analysis

This document provides a technical analysis of the legacy V2 prediction engine in `PredictionService` and `KrishiSarathiPredictionEngine`.

## 1. Input parameters and Preprocessing
The V2 backend expects a wide payload consisting of 9 mandatory inputs plus 8 optional inputs:
*   **Mandatory Inputs**: `District`, `Soil_Color`, `N`, `P`, `K`, `pH`, `Temperature`, `Humidity`, `Rainfall`.
*   **Optional Inputs**: `OC`, `EC`, `B`, `Fe`, `Mn`, `Cu`, `Zn`, `S`.

### Feature Engineering
For model inference, the V2 engine utilizes `SharedFeatureBuilder` and `KrishiSarathiPreprocessor` to perform:
1.  **District Default Imputation**: Soil parameters (`OC`, `EC`, etc.) are looked up from a hardcoded table `DISTRICT_SOIL_DEFAULTS` containing soil values for Pune, Satara, Kolhapur, Sangli, and Solapur.
2.  **Rainfall normal mapping**: Looks up a hardcoded district normal rainfall value and calculates `Rainfall_Deviation`.
3.  **Nutrient ratios**: Derives `N_P_Ratio`, `N_K_Ratio`, `P_K_Ratio`.
4.  **Soil Health Heuristics**: Computes an artificial `Soil_Health_Score` based on pH range, nutrient boundaries, and organic carbon level.
5.  **One-Hot Encoding**: Manually one-hot encodes soil color, district, growing season, and organic carbon class.

## 2. Multi-Layer Decision Fusion
Instead of letting the ML model make the final decision, V2 calculates a composite `final_score` by fusing three weights and subtracting a risk penalty:
$$\text{final\_score} = (\text{prob} \times 0.40) + (\text{agronomic\_confidence} \times 0.35) + (\text{regional\_suitability} \times 0.25) - \text{risk\_penalty}$$

*   **Model Probability (40% Weight)**: Raw output from the classifier's `predict_proba()`.
*   **Agronomic Confidence (35% Weight)**: A score built by checking if the environmental values lie within a hardcoded dict `CROP_BIOLOGICAL_LIMITS`. If they do, it adds fractional scores (35% for rainfall, 20% for temperature, 15% for pH, 10% each for N, P, K).
*   **Regional Suitability (25% Weight)**: Hardcoded crop priorities by district. If the predicted crop matches the district's expected crops, it receives a score of `1.0`, otherwise `0.80`.
*   **Risk Penalty**: Deducts `0.15` for rainfall deviation, and `0.05` for temperature/pH/nutrient violations.

## 3. Sugarcane and Special Penalties
*   If the predicted crop is **Sugarcane**, V2 intercepts the result. If rainfall is below 1000mm, it appends a warning: *"This recommendation conflicts with typical rainfall requirements for Sugarcane (above 1000mm preferred). Confirm perennial canal or drip irrigation."*
*   If it is **Rice** and rainfall is below 1000mm, it appends: *"Rice requires waterlogging conditions (above 1000mm preferred). Verify flood irrigation availability."*
*   The raw ML model's prediction is completely overshadowed by these overrides.

## 4. Competing Implementations
*   **`backend/app/services/prediction_service.py`**: Active inference pathway used by `/api/v1/predict` (executes the three-layer fusion, SHAP explanations, and 5-stage perturbation stability checks).
*   **`backend/app/models/prediction_engine.py`**: Active in duplicate local test paths. It contains hardcoded input clippers (e.g. pH is forced to 7.0 if out of range, negative nutrients are replaced with medians), regional defaults, and simple explanation logic.
