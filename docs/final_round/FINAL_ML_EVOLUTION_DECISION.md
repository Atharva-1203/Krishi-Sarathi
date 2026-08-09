# Krishi Sarathi: Final ML Evolution Decision Report

This document is the master executive decision guide for Phase 10, detailing our findings and architectural recommendations for the Final Round of the hackathon.

---

## 1. CURRENT MODEL (V3.1)
- **Current Strengths**: Fully calibrated class probabilities (Isotonic/Platt), robust out-of-distribution validation gates, and 100% training-serving parity.
- **Leakage Minimization**: The model excludes geographic variables, reducing the risk of regional leakage and location-driven prediction bias.
- **Current Weaknesses**: Evaluates seasonal climatology rather than real-time daily weather forecasts. Supported crop classes are currently capped at 22.
- **Verified Statistical Metrics (80/20 Stratified Partition)**:
  - **Global Train Set**: 1,760 samples (80% development set)
  - **Global Test Set**: 440 samples (20% final untouched holdout set)
  - **Global Exact Duplicates**: 0
  - **Near-Duplicates (Test vs Train @ distance threshold < 0.02)**: 0 (verifying no overlap leaks)
  - **Holdout Test Accuracy**: **99.55%** (438/440 correct classifications)
  - **Macro F1-Score**: **99.40%**
  - **Multi-Class Brier Score**: **0.0162**
  - **Expected Calibration Error (ECE)**: **0.0708**
  - **Inference Latency**: **~7.2 ms**

---

## 2. 7.9 LAKH DATASET (Maharashtra SHC Database)
- **Useful Portions**: Aggregated averages of soil elements (N, P, K, pH, Organic Carbon, Electrical Conductivity) aggregated at district resolution.
- **Problematic Portions**: Lacks target crop recommendation labels. Lacks climate parameters (temperature, humidity, rainfall). Features have negative measurements and physical anomalies (pH of 8049, negative pH).
- **Bias & Leakage Detected**: Highly unbalanced district-wise soil records (Nashik has 41k records, others have under 5k). Inclusion of administrative names or coordinates in training causes decision tree splits to memorize geographic boundaries rather than learning chemistry, inflating performance via spatial leakage.
- **Recommended Usage**: **Decouple completely.** Use exclusively for rendering district tooltips, Soil Quality Index (SQI) averages, and diversity indexing on the choropleth map. **Do not merge into the live Crop Predictor training set.**

---

## 3. EXTERNAL DATA
- **Best Sources**:
  - **Indian Meteorological Department (IMD)**: District Rain Monitoring product.
  - **Directorate of Economics & Statistics (DES)**: Crop area, production, and yield estimates.
- **Contribution**: Provides historical district-level climatology trends, drought anomalies, and crop yield estimates.
- **License**: Government Open Data License - India (GODL).
- **Recommended Usage**: Integrates into the Maharashtra map and analytics layer. Not for model training.

---

## 4. FINAL DATASET STRATEGY
- **Datasets**: Kaggle Crop Recommendation Dataset (`ml/datasets/v3/dataset.csv`).
- **Features**: N, P, K, temperature, humidity, pH, rainfall.
- **Records**: 2,200 clean, balanced rows.
- **Filtering**: Retain only records within physical boundaries (pH $3.5$ to $9.9$).
- **Balancing Strategy**: Enforce perfectly uniform class ratios (100 samples per class) to avoid frequency bias.

---

## 5. FINAL MODEL STRATEGY
- **Models to Benchmark**: ExtraTrees, HistGradientBoosting, Random Forest, Decision Tree, Logistic Regression.
- **Validation**: Stratified 5-Fold Cross-Validation on a 20% holdout set.
- **Calibration**: Sigmoid Platt Scaling fitted strictly on training splits.
- **OOD Detection**: Request validation gates (`validator.py`) to block physical anomalies.
- **Explainability**: Parameter deviation scorecards, sensitivity perturbation drifts, and tree split Gini weights.

---

## 6. FINAL CROP TAXONOMY (22 Supported Crop Classes)
- **Taxonomy Justification**: Recommending crops is restricted to classes with sufficient validated training profiles. We deliberately avoid manufacturing synthetic labels or crop varieties simply to inflate supported counts.
- **Supported Classes**:
  - **Cereals**: rice, maize
  - **Pulses**: chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil
  - **Fruits**: pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya
  - **Plantation / Fiber**: coconut, cotton, jute, coffee

---

## 7. FINAL MAP STRATEGY
- **Historical Rainfall**: Year-over-year rainfall totals from 2015 to 2025.
- **Crop Trends**: Area, Production, and Yield trend charts per district.
- **Soil Averages**: Interactive district tooltips rendering average N, P, K, pH, Organic Carbon (OC), and Electrical Conductivity (EC).
- **Diversity Indices**: Calculates district-wise Shannon Crop Diversity (SDI) and Herfindahl-Hirschman Index (HHI) concentration limits.

---

## 8. RISKS
1.  **Model Contamination**: Merging unlabeled soil data or spatial coordinate variables into the predictor would introduce regional defaults bias (sugarcane dominance).
2.  **Outlier Sensitivity**: If OOD boundaries are too loose, the model will output predictions on invalid inputs. Enforcing strict range checks mitigates this.

---

## 9. GO/NO-GO VERDICT

> [!IMPORTANT]
> **NO-GO on retraining the model with the 7.9L database.**
> Based on our dataset forensics, merging the 7.9 lakh government database into the training dataset is mathematically and agronomically incorrect. It is a soil database without crop labels or climate features.
>
> **GO on maintaining V3.1 as the production champion.**
> No material Sugarcane dominance was observed under the defined bias audit. We will continue to run this champion model in production and focus final round upgrades on enhancing map analytics and user explainability.
