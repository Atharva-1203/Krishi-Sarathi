# Krishi Sarathi: Map & Analytics Presentation Notes

This document contains talking points and data details for the Maharashtra Agricultural GIS Map and telemetry database.

---

## 1. Soil Health Card Dataset
- **Volume**: 779,144 physical records (approx. 7.8 lakh records).
- **Source**: National Soil Health Card scheme database.
- **Geographical Scope**: 32 districts of Maharashtra.
- **Parameters**: Macro-nutrients (N, P, K), pH, Organic Carbon (OC), and Electrical Conductivity (EC).

---

## 2. Soil Quality Index (SQI) Formulation
To represent soil health on the GIS map, we calculate a normalized Soil Quality Index (SQI) for each district using weighted averages of primary soil metrics:
$$\text{SQI} = w_1 \bar{N} + w_2 \bar{P} + w_3 \bar{K} + w_4 \bar{\text{pH}} + w_5 \bar{\text{OC}}$$
where parameters are normalized against target optimal ranges and weighted according to agronomic importance (organic carbon and pH are heavily weighted). 

The GIS map colors districts on a gradient:
- **High SQI (Green)**: Optimal soil health.
- **Moderate SQI (Yellow/Orange)**: Mild nutrient depletion.
- **Low SQI (Red)**: Critical nutrient deficiency, requiring fertilization.

---

## 3. Strict Concern Separation (Judges' Key Takeaway)
> [!IMPORTANT]
> **The map database does NOT influence the live crop recommendations.** 
> If a farmer in Pune queries the prediction model, the model does not look up Pune's average nitrogen on the map. It evaluates the exact inputs entered by the farmer. This decoupling is vital: regional averages are useful for government planning, but individual farms need recommendations tailored to their specific soil test, not the district average.

---

## 4. Judge Questions & Answers

### Q1: \"Why did you calculate district soil averages instead of feeding them into the prediction engine?\"
*   **Answer**: \"Feeding district averages into a prediction model creates geographic bias. For example, if a district is historically dominated by sugarcane, the model will learn to recommend sugarcane to anyone in that district, even if their specific soil is dry and acidic. Decoupling the map ensures predictions represent pure agronomic fit, while the map serves as an independent intelligence dashboard.\"

### Q2: \"Where does the map data come from, and is it live?\"
*   **Answer**: \"The map data is compiled from the government's official Soil Health Card database, containing over 7.7 lakh records for Maharashtra. We pre-processed this database to compute district averages, providing a stable baseline of regional soil chemistry.\"
