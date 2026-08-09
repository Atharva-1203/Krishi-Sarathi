# Krishi Sarathi: Feature Evolution Study

This document evaluates the potential integration of new agronomic and meteorological parameters.

---

## 1. Feature Candidates Analysis

To expand crop prediction accuracy, we evaluated five future features:

### Organic Carbon (OC) & Electrical Conductivity (EC)
- **Presence**: Available in 7.9L government database.
- **Inference Feasibility**: **Low**. Farmers rarely know their soil's EC or OC metrics without deep laboratory testing, making them difficult parameters to input at serving time.
- **Verdict**: **Exclude** from prediction contract; keep inside GIS map layers.

### Soil Moisture
- **Presence**: Can be derived from satellite hydrology portals.
- **Inference Feasibility**: Moderate (requires regional API lookups).
- **Verdict**: Candidate for Round 2.

### Rainfall departure / Seasonality
- **Presence**: Available in IMD datasets.
- **Inference Feasibility**: High (based on date/region).
- **Verdict**: Candidate for Round 2.
