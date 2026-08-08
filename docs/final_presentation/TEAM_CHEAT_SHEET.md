# Krishi Sarathi: Final Presentation Team Cheat Sheet

Read this 10 minutes before the presentation to align on all facts and numbers.

---

## 1. Project Identity
- **Name**: Krishi Sarathi (AI-Powered Crop Recommendation & Soil Intelligence Platform)
- **Framework**: Hybrid Crop Predictor + Maharashtra GIS Soil Analytics.

## 2. Core Problem & Solution
- **Problem**: Habit-based or geographic default crop selections lead to soil degradation and crop failures.
- **Solution**: Matches exact soil chemistry and weather inputs to crop physiological envelopes using machine learning.

## 3. Telemetry Numbers (Memorize These!)
- **ML Training Samples**: 2,200 observations (100 balanced samples per crop class).
- **Target Crop Classes**: 22 unique crop classes.
- **Agronomic Input Features**: 7 features strictly: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, Rainfall.
- **Maharashtra Map Dataset**: 779,144 government soil cards across 32 districts.

## 4. Machine Learning Specs
- **Model**: ExtraTrees (Extremely Randomized Trees) Classifier.
- **Why ExtraTrees?** Randomizes split thresholds to reduce generalization variance, producing stable bounds and avoiding overfitting.
- **Accuracy**: **99.39%** on validation test set.
- **Macro-F1**: **99.40%** (indicates perfect performance balance across all 22 crops).
- **Calibration**: Sigmoid Platt Scaling to output true agronomic probabilities.
- **OOD Security**: Range check gates block physically impossible values and flag caution thresholds.
- **Sugarcane Bias**: Reduced to **0.00%** on random inputs by removing geographic attributes from training.

## 5. Technology Stack
- **Frontend client**: Next.js 15 (React 19), TailwindCSS, Framer Motion.
- **Backend API**: FastAPI (Python), Pydantic v2 validation.
- **Hosting**: Vercel (Frontend), Dockerized container (Backend).

## 6. Key presentation Points
- **Decoupled Architecture**: Crop prediction does **not** check district or geography. Decoupling is mandatory to prevent sugarcane bias. The Maharashtra map is a separate analytics layer.
- **Suitability Margin Gap**: Absolute probability gap between top-1 and top-2 predictions.
- **Parameter Fit Alignment**: Graphical progress bars comparing inputs to crop medians.

## 7. Limitations & Round 2
- **Limitations**: Advisory system only; does not factor in market pricing or irrigation costs.
- **Round-2 Roadmap**: Target 100,000+ data samples, integrate weather forecasts and satellite NDVI sensors.
