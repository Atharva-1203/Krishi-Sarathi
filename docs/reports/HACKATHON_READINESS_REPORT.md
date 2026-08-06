# Krishi Sarathi — Hackathon Readiness Report (Phase 6.2)

Comprehensive audit overview and production-readiness sign-off scorecard.

---

## 1. Executive Summary
Krishi Sarathi is a data-driven agronomic decision support system designed specifically for Western Maharashtra (Pune Division). The system aggregates regional soil health card coordinates and local monsoon profiles to predict the optimal top-3 crops suited for a farm, along with explanations and warnings for incompatible crops.

This report outlines the scientific validation, ML pipeline forensics, and deployment checks that confirm the system is ready for presentation and production.

---

## 2. Architecture Overview
The system follows a decoupled Next.js frontend and FastAPI backend design:

```
[ Next.js Web Frontend ]
         │
         ▼ (HTTPS POST with soil card attributes)
[ FastAPI Backend /api/v1/predict ]
         │
         ├─► [ KrishiSarathiPreprocessor ] ──► (Numeric Standardization & One-Hot Encoding)
         ├─► [ Balanced RandomForest ]   ──► (Class Probabilities Vector)
         ├─► [ SHAP Explainability ]     ──► (Local Feature Contributions)
         ▼
[ JSON Payload Response ] (Top-3 Recommendations & Not Recommended warnings)
```

---

## 3. Dataset Summary
- **Total Records**: 4,513 rows
- **Columns**: 27 parameters (N, P, K, pH, Rainfall, Temperature, Soil Color, organic carbon, micronutrients, etc.)
- **Class Balance**: 16 target crops. Imbalance ratio was successfully addressed using balanced sample weights.

---

## 4. Machine Learning Summary
We evaluated Decision Trees, Random Forests, Extra Trees, XGBoost, LightGBM, and CatBoost. The **balanced RandomForest** model was selected as the winner, achieving:
- **Top-1 Validation Accuracy**: 99.78%
- **Top-3 Validation Accuracy**: 100.0%
- **Macro F1 Score**: 99.75%
- **Calibration (ECE)**: 0.0170

---

## 5. Feature Engineering Summary
We engineer multiple ratio and deviation features to mimic professional agronomic assessment:
1.  **N-P Ratio**: Evaluates vegetative vs. root development balance.
2.  **N-K Ratio**: Assesses structural cell wall resilience.
3.  **P-K Ratio**: Determines phosphate uptake capacity.
4.  **Rainfall Deviation**: Measures difference from historical district normal.
5.  **Soil Health Score**: Aggregates macro- and micronutrients.

---

## 6. Explainability Summary
Rather than using global model feature importance, Krishi Sarathi runs **TreeSHAP** dynamically at prediction query runtime. This measures exactly how much each soil constituent (e.g., Nitrogen or pH) drove the recommendation *for that specific query*, translating mathematical SHAP signs into natural language explanations.

---

## 7. Performance & Load Benchmarks
Under a stress test of 1,000 requests, the backend demonstrated excellent stability:
- **Average Inference Latency**: 10.42 ms
- **P95 Latency**: 15.62 ms
- **P99 Latency**: 24.06 ms
- **Memory Consumption**: Stable at ~85MB.

---

## 8. Final Decision: GO
The Krishi Sarathi system successfully clears all validation gates, is fully stable, and is ready for live hackathon judging.
