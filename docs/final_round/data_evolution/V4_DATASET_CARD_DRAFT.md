# Dataset Card Draft: Krishi Sarathi V4 Labeled Corpus

This document acts as the structural datasheet for the proposed V4 crop recommendation dataset.

---

## 1. Dataset Overview
- **Name**: Krishi Sarathi V4 Combined Crop Suitability Dataset
- **Total Records**: 2,200 (Clean base) | ~6,713 (Target candidate size with downsampling)
- **Granularity**: Farm-level soil profiles.
- **Language**: English.

---

## 2. Feature Contract Details

- `N` (Nitrogen): kg/ha | Continuous scale $[0, 140]$.
- `P` (Phosphorus): kg/ha | Continuous scale $[0, 145]$.
- `K` (Potassium): kg/ha | Continuous scale $[0, 205]$.
- `pH` (Acidity): pH index | Continuous scale $[3.5, 9.9]$.
- `temperature` (Celsius): temperature index | Continuous scale $[10, 50]$.
- `humidity` (%): humidity index | Continuous scale $[15, 100]$.
- `rainfall` (mm): average rainfall | Continuous scale $[30, 300]$.

---

## 3. Data Cleaning & Cleaning Rules
1.  **Deduplication**: Exact duplicate rows are permanently removed.
2.  **Boundary Filters**: Inputs sitting outside physical bounds (e.g. pH $< 3.5$ or $> 9.9$) are dropped.
3.  **Sugarcane Bias Correction**: Enforce stratified downsampling to cap maximum sugarcane representation to 100 rows, preventing frequency bias.
4.  **No Spatial coordinates**: Coordinates and administrative tags are removed to prevent location memorization.
