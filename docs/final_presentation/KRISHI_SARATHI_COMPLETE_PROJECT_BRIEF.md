# Krishi Sarathi: Complete Project Brief

This document serves as the master overview of the Krishi Sarathi crop recommendation platform, detailing the problem space, architectural separation of concerns, machine learning engineering, and round-2 roadmap.

---

## 1. Problem Statement
Agriculture faces high yield volatility due to changing climatic conditions and soil depletion. Farmers frequently rely on regional habits or default crop selections, which leads to lower productivity and soil degradation. Crop selection must evaluate multiple agricultural variables (micro-climate and soil chemistry) to align matching crops with precise soil profiles.

## 2. Proposed Solution
Krishi Sarathi is a data-driven decision support system. It provides personalized, scientifically backed crop recommendations by mapping soil chemistry (N, P, K, pH) and micro-climate parameters (temperature, humidity, rainfall) through a calibrated ExtraTrees Classifier.

## 3. Why Existing Approaches Fail
Many existing approaches suffer from:
1.  **Sugarcane Bias**: Over-recommending high-revenue crops due to regional default biases.
2.  **Geographical Overfitting**: Hardcoding district-level defaults instead of evaluating pure soil biology.
3.  **Lack of Safety Nets**: Freezing or yielding nonsensical recommendations when faced with invalid or out-of-distribution soil conditions.

## 4. System Architecture
Our system decouples predictions from analytics:
1.  **Crop Prediction Engine**: Evaluates only the 7 agronomic input features. It is geography-independent.
2.  **Maharashtra Analytics GIS Layer**: Provides regional soil health distribution and district averages. It does **not** feed parameters to or modify the prediction model.

## 5. Dataset
- **Classification Dataset**: 2,200 observations, perfectly balanced with 100 samples per crop class across 22 crop classes.
- **Maharashtra database**: 779,144 government soil health card records, aggregated by district.

## 6. Data Processing
Inputs are normalized using a MinMax Scaler calculated from training data bounds, preventing high-magnitude features (e.g. potassium or rainfall) from overshadowing smaller-scale inputs (e.g. pH).

## 7. Features
- **Nitrogen (N)**: Core vegetative growth parameter.
- **Phosphorus (P)**: Root development and flowering parameter.
- **Potassium (K)**: Disease resistance and water regulation parameter.
- **Temperature**: Thermal limit suitability.
- **Humidity**: Transpiration and moisture suitability.
- **pH**: Soil acidity/alkalinity boundary (crucial for nutrient absorption).
- **Rainfall**: Water requirement threshold.

## 8. Model Selection
Multiple candidate models were trained and benchmarked:
- Logistic Regression (Macro F1: ~93%)
- Decision Tree (Macro F1: ~98%)
- Random Forest (Macro F1: ~99%)
- **Extra Trees** (Macro F1: ~99.4% — Champion)

ExtraTrees was selected as the champion due to its lower boundary variance, stability, and speed.

## 9. Training Methodology
The model was trained on an 80/20 train/test split. Cross-validation was performed to ensure generalization. Feature importances are computed natively from Gini split reductions.

## 10. Evaluation Metrics
- **Accuracy**: 99.39% on validation set.
- **Macro F1-Score**: 99.40% (verifies balanced performance across all classes).
- **Brier Score**: Calibrated probability limits verified.

## 11. Prediction Engine Pipeline
```
Input Query ➔ Pydantic Validation ➔ Range Gate (OOD Check) ➔ MinMax Scaling ➔ ExtraTrees Classifier ➔ Platt Calibration ➔ JSON Output
```

## 12. Explainability
- **Scorecard Suite**: Matches input parameters against typical median parameters for recommended crops.
- **Sensitivity perturbed sweeps**: Simulates $\pm5\%$ shifts to indicate local prediction stability.

## 13. OOD Detection
The model rejects inputs outside physical parameters (pH < 0 or pH > 14) and flags warning flags (CAUTION) when inputs sit in the extreme 1% tail-ends of training parameters.

## 14. Maharashtra Analytics
Provides regional soil chemistry averages and SQI indices dynamically via static JSON data on map hovers.

## 15. Frontend Client
Built with **Next.js 15, React 19, and TailwindCSS**. Integrates interactive SVG maps, dynamic charts, gauge readouts, and detailed explainability panels.

## 16. Backend Server
Built with **FastAPI**. Features strict schema validation, dynamic model loading, error logging, and standard status health routes.

## 17. ML Pipeline
Features automated data pipelines, model registry updates, and modular scripts to regenerate metadata.

## 18. Folder Structure
```
Krishi-Sarathi/
├── frontend/        # React Next.js app
├── backend/         # FastAPI python server
├── ml/              # Model registries and datasets
├── notebooks/       # Audited Jupyter notebooks
├── tests/           # Automated pytest test suites
├── docs/            # Presentation & audit docs
└── scripts/         # Health checks & simulators
```

## 19. Testing
- **15 unit tests** verify API contracts, prediction maths, OOD flags, and sugarcane bias prevention.
- Runs a 10,000-sample randomized Monte Carlo sweep to verify bias elimination.

## 20. Limitations
- Crop recommendation is a suitability advisory, not a guaranteed yield prediction.
- Does not evaluate crop pricing, crop rotations, or irrigation cost variables.

## 21. Why Our Architecture Is Scientifically Defensible
Our architecture maintains clean separation between individual biology (the local farm query) and macro trends (district averages). Recommending crops based on geographical location (like division or district) is a scientific error; it enforces local monocultures rather than matching the soil’s actual agronomic potential.

## 22. Current Version
- **V3.1**: Calibrated ExtraTrees classifier with 7-feature restriction, dynamic OOD guards, and decoupled Maharashtra SQI map visualization.

## 23. Future Work (Round 2 Roadmap)
- Integrate yield prediction regression models.
- Scale training dataset to 100,000+ observations.
- Add real-time weather API integration.
- Incorporate satellite leaf indices (NDVI) and historic soil erosion tracking.
