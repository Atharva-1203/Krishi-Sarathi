# Data Harmonization Report

This document reports our features normalization, units alignment, and outlier filtration rules.

---

## 1. Units Normalization Standards

To maintain compatibility with our 7-parameter contract:
1.  `N` (Nitrogen): normalized to $kg/ha$ (range $[0, 140]$).
2.  `P` (Phosphorus): normalized to $kg/ha$ (range $[5, 145]$).
3.  `K` (Potassium): normalized to $kg/ha$ (range $[5, 205]$).
4.  `temperature`: Celsius (range $[10, 50]$).
5.  `humidity`: % (range $[15, 100]$).
6.  `ph`: pH scale (range $[3.5, 9.9]$).
7.  `rainfall`: mm (range $[30, 300]$).

---

## 2. Outlier and Anomaly Filtration

- **Category A (Physically Impossible)**:
  - We filter out negative values and extreme pH values ($< 3.5$ or $> 10.0$).
- **Category E (Unit Inconsistencies)**:
  - Nutrient readings $> 10,000$ kg/ha are discarded as data-entry errors.
