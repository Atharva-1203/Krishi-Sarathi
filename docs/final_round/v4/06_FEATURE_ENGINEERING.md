# V4 Feature Engineering Report

This document registers our continuous feature evaluations and future integration candidate parameters.

---

## 1. Active Feature Contract (V3.1)
The predictor is trained on 7 continuous features scaled to $[0, 1]$ via MinMaxScaler:
1.  `N` (Nitrogen): kg/ha | Range $[0, 140]$.
2.  `P` (Phosphorus): kg/ha | Range $[5, 145]$.
3.  `K` (Potassium): kg/ha | Range $[5, 205]$.
4.  `temperature`: Celsius | Range $[10, 50]$.
5.  `humidity`: % | Range $[15, 100]$.
6.  `ph`: pH acidity index | Range $[3.5, 9.9]$.
7.  `rainfall`: mm | Range $[30, 300]$.

---

## 2. Future Feature Evaluations

We evaluated four additional parameters for V4:

### Organic Carbon (OC) & Electrical Conductivity (EC)
- **Status**: Present in the 7.9L database.
- **Serving feasibility**: **Low.** Farmers rarely have laboratory metrics for soil organic carbon or electrical conductivity, making them impractical for standard frontend queries.
- **Verdict**: **Exclude** from model training; display inside decoupled GIS Map observatory tooltips.

### Soil Moisture & Rainfall Departure
- **Status**: Can be gridded via satellite telemetry.
- **Verdict**: Candidate for Round 2.
