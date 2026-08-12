# 🌾 Krishi Sarathi (कृषि सारथी)
### AI-Powered Agricultural Decision Intelligence Platform

> **Predict. Explain. Simulate. Evaluate Risk. Optimize Profit. Decide.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Framework: Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-black)](frontend/)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue)](backend/)
[![Model: ExtraTrees](https://img.shields.io/badge/ML%20Model-ExtraTrees-green)](backend/app/models/)

---

## 🌟 Executive Summary

**Krishi Sarathi** is an agricultural decision-intelligence platform built to bridge the gap between agronomic crop suitability prediction and real-world farm financial decision-making. 

Rather than functioning merely as a black-box crop classifier, Krishi Sarathi combines **location-blind agronomic ML modelling**, a **785,857-observation regional agricultural observatory**, and a **decoupled Profit-First decision engine** to deliver actionable, risk-adjusted farming advice.

---

## 🏛️ 3-Layer System Architecture

```text
                               KRISHI SARATHI PLATFORM
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       │                                  │                                  │
       ▼                                  ▼                                  ▼
 LAYER 1: AGRONOMIC ML             LAYER 2: AGRICULTURAL             LAYER 3: PROFIT-FIRST
    SUITABILITY ENGINE                OBSERVATORY                       DECISION ENGINE
 (Location-Blind 7 Features)       (785,857 Evidence Base)             (Decoupled Layer)
       │                                  │                                  │
       ▼                                  ▼                                  ▼
 • 7 Agronomic Parameters           • 779,144 Soil Health Cards        • Expected Revenue (₹/ha)
 • Platt Sigmoid Calibration        • 13,200 IMD Climate Grid Days     • Cultivation Cost (₹/ha)
 • 22 Physiology Crops              • 4,513 DES Yield Records          • Water Demand & Price Volatility
 • Explainability & Sensitivity     • Shannon Diversity Index          • Risk-Adjusted Profit (₹)
 • OOD Safety Gates                 • Herfindahl Concentration         • Economic Signal Badges
```

### 1. Layer 1 — Agronomic Suitability ML Engine
- **Input Features (7)**: Nitrogen ($N$), Phosphorus ($P$), Potassium ($K$), Temperature (°C), Humidity (%), Soil pH, Rainfall (mm).
- **Core Model**: ExtraTrees Classifier with Platt Sigmoid Probability Calibration.
- **Location Blindness**: Uses continuous physical parameters rather than administrative coordinates to guarantee 100% spatial generalization.

### 2. Layer 2 — Maharashtra Agricultural Observatory
- **Evidence Base**: Integrates 779,144 Soil Health Cards with 13,200 IMD weather grid records and 4,513 DES crop statistics across 34 districts of Maharashtra.
- **Spatial Intelligence**: Provides regional soil health distributions, 11-year rainfall trends, Shannon Crop Diversity Index ($H$), and Herfindahl-Hirschman Concentration Index ($HHI$).

### 3. Layer 3 — Independent Profit-First Engine
- **Decoupled Financial Support**: Computes Expected Revenue, Cultivation Cost, Net Profit, Water Demand, Market Volatility Risk, and Risk-Adjusted Returns.
- **Strategic Principle**: Explicitly highlights **"Highest Agronomic Suitability ≠ Highest Economic Return"**. Does NOT alter or modify core ML suitability probabilities.

---

## 📊 Verified ML Benchmarks & Data Scale

```text
===================================================================================================
VERIFIED ML MODEL BENCHMARKS (EXTRA-TREES CLASSIFIER + PLATT SIGMOID CALIBRATION)
===================================================================================================
Metric                                Gold Core (2.2K Rows, 22 Crops)   Gold+Silver (81.7K Rows, 43 Crops)
---------------------------------------------------------------------------------------------------
Stratified Test Accuracy                     98.86%                                96.76%
Macro F1-Score                               98.86%                                85.82%
Multi-Class Brier Score                      0.0135                                0.0453
Expected Calibration Error (ECE)             0.0494                                0.0209 (Highly Calibrated)
Sugarcane Default Bias                        0.0%                                  0.0%
Inference Latency                             ~1.3 ms                               ~1.5 ms
Location Blindness                          100.0% (Zero Spatial Leakage)        100.0% (Zero Spatial Leakage)
===================================================================================================
```

---

## 🚀 Key Platform Features

- **Interactive What-If Agriculture Simulator**: Perturb soil NPK, pH, or rainfall to observe instant recommendation shifts.
- **Explainability & Limiting Parameter Audit**: Identifies top parameter drivers and flags limiting factors relative to crop medians.
- **Out-of-Distribution (OOD) Safety**: Built-in boundary validation and entropy uncertainty estimation gates.
- **Farm Digital Twin Profile**: Unified abstraction combining Soil, Climate, Water, Agronomic Match, and Financial Return.
- **7-Page PDF Advisory Exporter**: Downloadable advisory reports covering Farm Profile, Crop Recommendations, Economic Outlook, Soil Chemistry vs Medians, IMD Weather History, Risk Audit, and Data Provenance.

---

## 🛠️ Local Development & Quickstart

### 1. Prerequisites
- Python 3.10+
- Node.js 18+

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Activate venv (Windows: venv\Scripts\activate | Linux/Mac: source venv/bin/activate)
pip install -r requirements.txt
python app/start_server.py
# Backend serves on http://127.0.0.1:8000 (Swagger docs: http://127.0.0.1:8000/docs)
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend serves on http://127.0.0.1:3000
```

### 4. Running Verification Suite
```bash
# Backend pytest suite
cd backend
pytest app/tests/test_api.py

# Frontend production build
cd frontend
npm run build
```

---

## 📄 Data Provenance & Disclaimers

Every dataset is linked to official government and research authorities:
- **ICAR / FAO**: Crop Physiology Trial Corpora
- **Soil Health Card Scheme**: Department of Agriculture, Govt of Maharashtra (`soilhealth.dac.gov.in`)
- **IMD Weather Grid**: India Meteorological Department (`mausam.imd.gov.in`)
- **DES & CACP**: Directorate of Economics & Statistics (`eands.dacnet.nic.in`)
- **AGMARKNET**: Mandi Price Benchmarks (`agmarknet.gov.in`)

*Disclaimer: Krishi Sarathi provides agricultural decision-support estimates. Financial outputs are indicative benchmarks and should be cross-verified with local government agricultural officers.*

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for details.
