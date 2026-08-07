# Krishi Sarathi V3: Final Local Demonstration Report

This report serves as the comprehensive handoff and execution guide for the Krishi Sarathi V3 Crop Prediction Engine. All components have been completely rebuilt from a clean slate.

---

## 1. Localhost Startup Instructions

Follow these instructions to run the V3 application on your local development environment.

### A. FastAPI Python Backend
1.  **Navigate to the project root**:
    ```bash
    cd d:\Techrush
    ```
2.  **Activate your virtual environment**:
    *   On Windows (PowerShell):
        ```powershell
        .venv\Scripts\Activate.ps1
        ```
    *   On Linux/macOS:
        ```bash
        source .venv/bin/activate
        ```
3.  **Start the FastAPI development server**:
    ```bash
    uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
    ```
    *   The backend will start on [http://127.0.0.1:8000](http://127.0.0.1:8000).
    *   Swagger documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### B. Next.js Frontend
1.  **Navigate to the frontend directory**:
    ```bash
    cd d:\Techrush\frontend
    ```
2.  **Install dependencies** (if not already installed):
    ```bash
    npm install
    ```
3.  **Start the frontend development server**:
    ```bash
    npm run dev
    ```
    *   The frontend will start on [http://localhost:3000](http://localhost:3000).

---

## 2. Baseline Judge Scenarios

The following 10 baseline scenarios represent various agricultural profiles. They are verified to run against the V3 endpoint and return deterministic, calibrated crop suitabilities.

### Scenario 1: Optimal Rice Profile
*   **Inputs**: `N=90`, `P=42`, `K=43`, `temperature=23.6`, `humidity=80.3`, `ph=6.7`, `rainfall=220.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Rice**
*   **Significance**: High rainfall and high humidity are the primary drivers for Rice.

### Scenario 2: Optimal Maize Profile
*   **Inputs**: `N=70`, `P=48`, `K=30`, `temperature=28.1`, `humidity=70.5`, `ph=6.2`, `rainfall=90.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Maize**
*   **Significance**: Represents a standard grain crop configuration with moderate rainfall.

### Scenario 3: Optimal Chickpea Profile
*   **Inputs**: `N=40`, `P=60`, `K=80`, `temperature=17.0`, `humidity=16.0`, `ph=7.0`, `rainfall=80.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Chickpea**
*   **Significance**: Low temperature and low humidity are crucial indicators for chickpea suitability.

### Scenario 4: Optimal Cotton Profile
*   **Inputs**: `N=120`, `P=40`, `K=20`, `temperature=24.0`, `humidity=75.0`, `ph=7.5`, `rainfall=90.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Cotton**
*   **Significance**: Heavy nitrogen and alkaline soil with moderate precipitation support cotton growth.

### Scenario 5: Optimal Mango Profile
*   **Inputs**: `N=30`, `P=28`, `K=35`, `temperature=31.2`, `humidity=50.2`, `ph=5.8`, `rainfall=95.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Mango**
*   **Significance**: High temperatures and moderate humidity correspond to the tropical profile for mangoes.

### Scenario 6: Extreme High Rainfall (Out-of-Distribution Alert)
*   **Inputs**: `N=50`, `P=50`, `K=50`, `temperature=25.0`, `humidity=60.0`, `ph=6.5`, `rainfall=500.0`
*   **OOD Alert**: `OUT_OF_DISTRIBUTION` (1 warning)
*   **Warning message**: `"Feature 'rainfall' has value 500.00 which is outside the validated training range [20.21, 298.56]."`
*   **Significance**: Demonstrates the OOD layer detecting inputs that would cause standard classifiers to silently extrapolate.

### Scenario 7: Extreme High Nitrogen (Out-of-Distribution Alert)
*   **Inputs**: `N=300.0`, `P=50`, `K=50`, `temperature=25.0`, `humidity=60.0`, `ph=6.5`, `rainfall=150.0`
*   **OOD Alert**: `OUT_OF_DISTRIBUTION` (1 warning)
*   **Warning message**: `"Feature 'N' has value 300.00 which is outside the validated training range [0.00, 140.00]."`
*   **Significance**: Enforces hard boundaries on fertilizer application features.

### Scenario 8: Optimal Watermelon Profile
*   **Inputs**: `N=100`, `P=12`, `K=50`, `temperature=25.5`, `humidity=82.0`, `ph=6.5`, `rainfall=50.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Watermelon**
*   **Significance**: Balanced soil with dry environment and moderate temperatures fit watermelon.

### Scenario 9: Optimal Coffee Profile
*   **Inputs**: `N=100`, `P=28`, `K=30`, `temperature=26.5`, `humidity=55.0`, `ph=6.8`, `rainfall=150.0`
*   **OOD Alert**: `NORMAL` (0 warnings)
*   **Expected Top Prediction**: **Coffee**
*   **Significance**: Moderate warm climate with high nitrogen fits coffee plants.

### Scenario 10: Acidic Soil Boundary (Caution Alert)
*   **Inputs**: `N=50`, `P=50`, `K=50`, `temperature=25.0`, `humidity=60.0`, `ph=3.9`, `rainfall=150.0`
*   **OOD Alert**: `CAUTION` (1 warning)
*   **Warning message**: `"Feature 'ph' has value 3.90 which is in the extreme tail of the training distribution [min: 3.50, p01: 4.61]."`
*   **Significance**: Catches near-boundary inputs (values between p01 and min) and alerts the user without discarding predictions.
