# V3 Rebuild: 13 Frontend Validation Report

This document outlines the validation criteria and user interface contract changes applied to the Next.js frontend application.

## 1. Unified 7-Parameter Form Schema
The frontend validation schema in `PredictionDashboard.tsx` is updated to exclude legacy location-based variables. The new schema enforces boundaries matching the training bounds:

*   **N (Nitrogen)**: `z.number().min(0, "Min Nitrogen is 0").max(140, "Max Nitrogen is 140")`
*   **P (Phosphorus)**: `z.number().min(5, "Min Phosphorus is 5").max(145, "Max Phosphorus is 145")`
*   **K (Potassium)**: `z.number().min(5, "Min Potassium is 5").max(205, "Max Potassium is 205")`
*   **pH**: `z.number().min(3.5, "Min pH is 3.5").max(10.0, "Max pH is 10.0")`
*   **Temperature**: `z.number().min(8, "Min Temp is 8").max(45, "Max Temp is 45")`
*   **Humidity**: `z.number().min(14, "Min Humidity is 14").max(100, "Max Humidity is 100")`
*   **Rainfall**: `z.number().min(20, "Min Rainfall is 20").max(300, "Max Rainfall is 300")`

## 2. Decoupled Fields
*   `District` and `Soil Color` dropdowns are completely removed from the prediction request body. They are visually separated or migrated to independent map/analytics pages to prevent users from believing they influence machine predictions.

## 3. Results Panel Schema Alignment
The visual card display in `ResultsDisplay.tsx` is simplified to parse the V3 API response:
1.  **Top recommendations**: Array of `{ rank, crop, probability }`. Shows probability percentages directly (e.g. 98.4%).
2.  **OOD Warning Banner**: Rendered in caution-yellow or danger-red if `ood=true`. Shows warnings: *"Input is outside the validated training range."*
3.  **Simple Explanations**: Lists supporting features and limiting features directly under the recommendation card.
