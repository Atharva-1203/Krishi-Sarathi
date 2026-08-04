# SHAP Explainability Pipeline Design

This document details the explainability architecture for translating crop predictions into natural language justifications.

## 1. Global Explanations (Feature Importance)
- Use **TreeSHAP** over the training dataset.
- Generate **SHAP Summary Plots** to show which parameters (e.g. Rainfall or pH) have the highest influence on recommendations.

## 2. Local Explanations (Force Plots)
- For every individual query:
  - Generate a **SHAP Force Plot** showing the positive/negative pressure of N, P, K, pH, and Rainfall.
  - **Natural Language Generator (NLG)**: Parse the SHAP values:
    - If `pH SHAP value < 0` for Rice: output *"Rice is not recommended because your soil pH is too alkaline."*
    - If `Rainfall SHAP value > 0` for Sugarcane: output *"Sugarcane is recommended due to sufficient rainfall."*
