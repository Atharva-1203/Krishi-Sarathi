# Explainable AI (XAI) Readiness Report

This report evaluates feature human-understandability to prepare natural language crop recommendations.

## 1. Explainability Matrix

| Feature | SHAP Role | User Display | Explanation Method |
|---------|-----------|--------------|--------------------|
| **N, P, K** | Active | Yes | Compare with baseline crop requirement. |
| **pH** | Active | Yes | Explain acidity/alkalinity limits. |
| **Rainfall** | Active | Yes | Correlate with crop water footprints. |
| **NPK Ratios** | Active | No | Keep hidden; too complex for farmers. |
| **Score** | Passive | Yes | Present as a "Soil Wellness Grade (A-F)". |
| **Coords** | Discard | No | Hide; not understandable. |
