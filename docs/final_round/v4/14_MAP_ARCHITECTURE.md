# Map & Observational Intelligence Architecture

This document details the decoupled GIS observatory architecture powering regional agricultural intelligence.

---

## 1. High-Level Architecture Flow
```
[GeoJSON Districts] ➔ Mapbox Render ➔ Hover/Click Trigger ➔ JSON Query (district_soil_data.json) ➔ Display Panel (Telemetry + Diversity Indices + Diagnostics)
```

---

## 2. Integrated Data Elements (Map Space Only)

The GIS map displays regional context without altering prediction output:

### A. Soil quality metrics (7.9L Database)
- Extracts average Nitrogen, Phosphorus, Potassium, pH, Organic Carbon, and Electrical Conductivity for each of the 34 districts.
- Computes a composite **Soil Quality Index (SQI)** from 1 (low) to 10 (high) based on nutrient balance.

### B. Meteorological analytics (IMD Database)
- Maps monthly average precipitation curves.
- Displays deviation percentages and wet/dry year classifications.

### C. Crop diversity metrics (DES APY summaries)
- **Shannon Diversity Index ($H$)**: Measures crop richness and evenness:
  \[
  H = -\sum_{i} p_i \ln(p_i)
  \]
- **Herfindahl-Hirschman Index (HHI)**: Quantifies crop concentration to assess monoculture risk:
  \[
  \text{HHI} = \sum_{i} s_i^2
  \]
  where $s_i$ is the percentage share of crop $i$ in the district.
- **Diagnostics**: Provides rotation advice based on local Soil Health Card pH averages.
