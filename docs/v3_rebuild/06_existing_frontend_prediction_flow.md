# V3 Rebuild: 06 Existing Frontend Prediction Flow

This document traces the data flow from UI interaction down to backend service consumption.

## 1. User Form Input & Validation
*   **Form File**: `frontend/src/components/PredictionDashboard.tsx`
*   **Validation Schema**: Defined using `zod` with the following validation bounds:
    *   `District`: Non-empty string
    *   `Soil_Color`: Non-empty string
    *   `N`: 0 to 300
    *   `P`: 0 to 200
    *   `K`: 0 to 500
    *   `pH`: 3.5 to 10.0
    *   `Temperature`: 10 to 50
    *   `Humidity`: 10 to 100
    *   `Rainfall`: 100 to 3000
*   **Submit Behavior**: Executes `onSubmit` which submits a JSON post payload to `${apiUrl}/api/v1/predict`.

## 2. Recommendation Rendering
*   **Component**: `frontend/src/components/ResultsDisplay.tsx`
*   **Visual Layout**:
    1.  **Disclaimer Banner**: States that predictions are based on historical cultivation patterns in Western Maharashtra.
    2.  **Optimal Recommendation Card**: Shows the top-1 recommended crop, match percentage, confidence rating (e.g. `★★★★★ Very Strong`), season, water requirement, and a generated description (translated to Marathi if language is toggled).
    3.  **Technical XAI Section (Collapsible)**: Displays:
        *   Metrics like statistical confidence, agronomic confidence, regional suitability, stability index, and risk level.
        *   A Parameter Compliance checklist checking N, P, K, pH, rainfall, and temperature boundaries.
        *   Action plans recommending soil neutralizers or fertilizer types.
    4.  **Secondary Options**: Displays alternative crops.
    5.  **Not Recommended Crops**: Displays secondary crops that were not recommended, along with specific reasons (e.g., *"Soil pH is too acidic"*).
    6.  **Report Printing**: Generates a print window containing a structured recommendation report with translation support.
