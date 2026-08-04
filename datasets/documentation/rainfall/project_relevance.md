# Project Relevance and Usefulness Report

This report evaluates how the compiled historical rainfall database contributes directly to the AI/ML crop recommendation model and explainability features.

## 1. Relevance to Hackathon Problem Statement
- The hackathon requires recommending the Top 3 crops using: Soil NPK, pH, Temperature, Humidity, and **Rainfall**.
- Rainfall is the primary water driver. In Maharashtra, where **over 75% of agriculture is rainfed (dryland)**, monsoon rainfall determines whether a crop succeeds or fails. Recommending a high-water crop (like Sugarcane or Paddy) in a low-rainfall district (like Ahmednagar) without noting historical deficits would lead to crop failure.

## 2. Monthly Rainfall Features vs. Seasonal Averages
- By preserving the monthly columns (`June`, `July`, `August`, `September`), our database allows the ML model to learn the **intra-seasonal distribution** of rainfall, rather than just a single average.
- This is highly relevant because:
  - Heavy rainfall in June stimulates early sowing but can cause seed rot.
  - A dry spell in August (flowering stage) drastically cuts soybean and cotton yields, even if seasonal totals look "normal".
  - Late rains in September can damage mature pods or delay harvest.

## 3. Explainability and Decision Support
- **Departure Percentage & Classification**: These features can be translated into explainable advice in the recommendation interface (e.g. *"Recommending Sorghum over Cotton because this district is experiencing a moderate deficit (-35% from normal) this year."*)
- **Risk Mitigation**: The historical range allows the model to report recommendation confidence. In districts with high rainfall standard deviation (e.g. drought-prone Marathwada), the model can suggest drought-resistant crop options (like pearl millet or pigeon pea) alongside a primary crop.
