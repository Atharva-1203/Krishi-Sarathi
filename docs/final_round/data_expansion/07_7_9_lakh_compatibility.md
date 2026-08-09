# Government Database Feature Compatibility Report (7.9L)

This document evaluates the feature contract compatibility of the 7.9L database.

---

## 1. Feature Coverage Matrix

We score the Soil Health Card database against our current 7-parameter predictor contract:

| Feature | Present? | Unit | Resolution | Type | Can Join? |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Nitrogen (N)** | 🟢 Yes | kg/ha | Farm-level | Continuous | Direct |
| **Phosphorus (P)**| 🟢 Yes | kg/ha | Farm-level | Continuous | Direct |
| **Potassium (K)** | 🟢 Yes | kg/ha | Farm-level | Continuous | Direct |
| **pH Acidity** | 🟢 Yes | pH Index | Farm-level | Continuous | Direct |
| **Temperature** | ❌ No | Celsius | N/A | Missing | Proxy only |
| **Humidity** | ❌ No | % | N/A | Missing | Proxy only |
| **Rainfall** | ❌ No | mm | N/A | Missing | Proxy only |

---

## 2. Incompatibility Analysis
- **Missing Climate Features**: The government Soil Health Cards do not capture meteorological variables (temperature, humidity, rainfall). 
- **Scale Discrepancies**: While the V3 predictor contract maps N/P/K in $kg/ha$ ranges, government cards often report parts-per-million (ppm) or local indices, shifting distribution scales.
- **Verdict**: Direct merging is impossible due to missing climate parameters and scale mismatches.
