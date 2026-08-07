# V3 Model Loading Forensic & Root Cause Report

## 1. Original Failure Description
When attempting to access the prediction view, the user interface crashed or froze, rendering the predictor unavailable and preventing form submission.

## 2. Investigation and Root Cause
*   **File Responsible**: `frontend/src/components/PredictionDashboard.tsx` (specifically line 220).
*   **Error Message**: `Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')`
*   **Root Cause**: React-hook-form's `watch("ph")` returned `undefined` during early component mount, form reset, or history clears. Calling `watchPH.toFixed(1)` directly on an uninitialized/undefined value raised a fatal rendering TypeError, freezing the React layout and blocking form submission to the FastAPI backend.

## 3. Corrective Fix
*   **Applied Solution**: Implemented a safety nullish coalescing guard on the watched form state:
    ```typescript
    const watchPH = watch("ph") ?? 6.5;
    ```
*   This guarantees that `watchPH` always resolves to a valid float before calling `.toFixed(1)` or running agronomic category checks.

## 4. Serving Environment Details
*   **Model Class**: `CalibratedClassifierCV` (wrapping champion `ExtraTreesClassifier`)
*   **Preprocessor**: `V3Preprocessor` (StandardScaler pipeline)
*   **Feature Contract**:
    1. `N` (Nitrogen)
    2. `P` (Phosphorus)
    3. `K` (Potassium)
    4. `temperature` (Temperature)
    5. `humidity` (Humidity)
    6. `ph` (Soil pH)
    7. `rainfall` (Rainfall)
*   **Python Version**: `3.11`
*   **scikit-learn Version**: `1.5.1`
*   **API Routing**: Decoupled POST `/api/v3/predict` and GET `/api/v3/model`
