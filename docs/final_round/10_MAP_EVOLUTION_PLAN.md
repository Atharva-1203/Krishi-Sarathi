# Krishi Sarathi: Maharashtra Map & Analytics Evolution Plan

This document outlines the upgrade roadmap for the regional Maharashtra Agricultural Intelligence layer.

---

## 1. Core Map Architecture (Separation of Concerns)
- **Decoupled Workflow**: The GIS map remains computationally independent of the live prediction engine. Live agronomic checks evaluate continuous features blind to location, while the map visualizes macro-telemetry from the 7.8 lakh government SHC database.

---

## 2. Advanced Map Visualizations

### A. Choropleth Map Layers
- Color-codes district SVG polygons based on a dynamic Soil Quality Index (SQI):
  $$\text{SQI} = w_1 \cdot \text{pH} + w_2 \cdot \text{OC} + w_3 \cdot \text{NPK}$$
- Allows users to toggle views between NPK averages, rainfall indices, organic carbon, and cycle counts.

### B. Year-Over-Year Trends & Rain Anomalies
- Visualizes historical district-wise rainfall grids (IMD sourced) from 2015 to 2025:
  - Annual totals vs. moving averages.
  - Departure from normal indices (drought warnings).

### C. District Crop Diversification Indices
- Evaluates district crop concentration using Shannon Entropy and Herfindahl-Hirschman Indices (HHI) to highlight regional cultivation variety:
  - Low index: High crop concentration (heavy monoculture risk, such as Western Maharashtra sugarcane concentration).
  - High index: Crop diversification (balanced regional farming).

---

## 3. Data Provenance Transparency
- **Soil Chemistry**: Maharashtra Soil Health Card Database (Department of Agriculture, Govt. of Maharashtra).
- **Rainfall Metrics**: Indian Meteorological Department (IMD) District Rain Monitoring Product.
- **Yield Statistics**: Directorate of Economics & Statistics (DES) agricultural estimates.
