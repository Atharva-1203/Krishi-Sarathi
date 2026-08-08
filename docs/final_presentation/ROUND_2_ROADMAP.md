# Krishi Sarathi: Round-2 Advanced Intelligence Roadmap

This document outlines the planned future upgrades for the Krishi Sarathi platform. It distinguishes currently verified capabilities from the Round-2 product roadmap.

---

## 1. Current State (V3.1 - Verified)
- **Model**: Extremely Randomized Trees (ExtraTrees) Classifier.
- **Features**: 7 purely agronomic parameters ($N, P, K, \text{pH}$, temperature, humidity, rainfall).
- **Security**: Type, physical sanity, and training-range validations.
- **Analytics**: Decoupled Maharashtra district averages based on 7.8 lakh records.

---

## 2. Round 2 Advanced Features (Planned Roadmap)

### A. Dataset Scale-Up
- **Target**: Scale from 2,200 to **100,000+ observations**.
- **Expansion**: Double supported crop classes from 22 to 50, adding localized pulses and native cash crops.

### B. Live IoT & API Telemetry Integrations
- **Real-Time Weather Integration**: Fetch real-time rainfall, temperature, and humidity projections from local weather APIs rather than relying strictly on manual estimates.
- **Soil IoT Sensor Integration**: Enable direct data ingestion from hardware soil sensors via API.

### C. Satellite NDVI & Leaf Indexing
- **NDVI Telemetry**: Integrate Copernicus/Sentinel satellite leaf reflectance indices to monitor leaf chlorophyll levels, predicting crop stress before physical symptoms manifest.
- **Crop Disease Classification**: Incorporate a computer vision module to analyze leaf photographs, diagnosing disease vectors.

### D. Quantitative Fertilizer Recommendations
- **Regression Engines**: Build a parallel ML regression model to recommend the precise mass of specific fertilizers (e.g. Urea, Potash, DAP) required to bridge the gap between current soil health and optimal crop medians.

---

## 3. Scope Boundaries & Technical Sincerity

> [!WARNING]
> The features outlined under **Round 2** represent our advanced development roadmap. They are **not** present in the current production demo. The current production demo is strictly focused on providing highly stable, unbiased, and explainable crop suitability advisory recommendations based on soil test card inputs.
