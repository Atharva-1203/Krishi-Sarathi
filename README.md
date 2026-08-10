# Krishi Sarathi (कृषी सारथी)

> **Motto**: शाश्वत शेती – समृद्ध शेतकरी (Sustainable Farming – Prosperous Farmer)
> **Tagline**: ज्ञानसमन्विता कृषिः समृद्धये (Agriculture empowered by knowledge leads to prosperity.)

Krishi Sarathi is an AI-powered agricultural decision intelligence platform. It provides personalized, scientifically backed crop suitability recommendations based strictly on agronomic soil and weather chemistry, integrated with a what-if simulator and farm digital twin.

---

## 1. The Problem
Selecting the wrong crop for a farm's specific soil chemistry and climate leads to soil degradation, yield volatility, and high financial risks. Traditional habit-based farming or regional crop defaults do not account for localized soil depletion. Furthermore, legacy recommendation models suffer from geographic and Cash Crop bias (such as Sugarcane-heavy over-fitting), which recommends cash crops even in drought-prone or acidic soils.

## 2. Our Solution
Krishi Sarathi introduces a two-tier agricultural decision support system:
1.  **AI-Powered Decision Intelligence Engine**: Evaluates 7 physical agronomic parameters ($N, P, K, \text{pH}$, temperature, humidity, rainfall) through a calibrated ExtraTrees Classifier. It is completely blind to geographic markers (district, region, coordinates) to prevent sugarcane bias. Features include:
    - **Farm Digital Twin**: A radial compatibility scorecard representing Soil, Climate, Water, and Climate Risk indicators.
    - **What-If Scenario Simulator**: Sliders to test baseline perturbations ($\pm 20\%$) and inspect sensitivity changes.
    - **Counterfactual Engine**: Suggests soil modifications to achieve suitability for alternative crops.
2.  **Maharashtra Agricultural GIS Analytics**: Serves as a macro-view regional planning dashboard powered by a database of **779,144 government soil cards** to display soil health trends, gridded weather anomaly trends, and Shannon crop diversity, completely decoupled from prediction logic.

---

## 3. System Architecture & Separation

```
                     KRISHI SARATHI
                           │
             ┌─────────────┴─────────────┐
             │                           │
       CROP PREDICTION              MAHARASHTRA
          ENGINE                    DATA ANALYTICS
             │                           │
       7 ML FEATURES               GOVERNMENT/
             │                     REGIONAL DATA
             │                           │
        V3.1 MODEL                 MAP + ANALYTICS
             │
       TOP-5 CROPS
```

*   **Prediction Pipeline**: Inputs ➔ validation check ➔ MinMax Scaling ➔ ExtraTrees ➔ Sigmoid Platt Calibration ➔ What-If sliders ➔ Farm Digital Twin gauges ➔ Counterfactuals.
*   **Decoupled Map Layer**: SVG map powered by 7.7+ lakh government records displaying Soil Quality Index (SQI), gridded rainfall anomalies, yield trends, and Shannon crop diversity graphs. Predictions do not use location, and map statistics do not alter probability vectors.

---

## 4. Technology Stack
- **Frontend client**: Next.js 15 (React 19), TailwindCSS, Framer Motion, Lucide Icons.
- **Backend API**: FastAPI (Python 3.11), Pydantic v2 validation schemas.
- **Machine Learning**: Scikit-Learn, Pandas, NumPy, Matplotlib.

---

## 5. Model Performance Metrics
The champion **ExtraTrees Classifier** yields:
- **Test Accuracy**: **99.39%**
- **Macro F1-Score**: **99.40%**
- **Brier Score**: **0.0162** (calibrated probabilities)
- **Top-5 Recommendation Coverage**: **100.0%**
- **Sugarcane Bias rate**: **0.00%** on random inputs

---

## 6. Project Directory Structure
```
Krishi-Sarathi/
├── frontend/        # React Next.js application
├── backend/         # FastAPI python server
├── ml/              # Core ML models, preprocessing, and datasets
│   ├── datasets/    # Pre-processed V3 training dataset
│   └── models/      # Calibrated V3 ExtraTrees models
├── notebooks/       # Audited data-story Jupyter notebooks (01-09)
├── tests/           # Regression and API verification tests (pytest)
├── docs/            # Presentation notes, briefs, and cheat sheets
└── scripts/         # Automated simulators and health checks
```

---

## 7. Local Setup & Installation

### Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server on port 8000:
   ```bash
   uvicorn app.main:app --host 127.0.0.1 --port 8000
   ```

### Frontend Client Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

---

## 8. Verification & Testing
To execute the automated test suites, run:
```bash
pytest tests/v3 -v
```
This runs 15 validation scripts checking probability math consistency, OOD detection boundaries, and crop bias mitigations.
