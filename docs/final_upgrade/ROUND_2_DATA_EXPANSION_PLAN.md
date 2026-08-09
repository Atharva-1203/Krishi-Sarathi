# Krishi Sarathi: Round 2 Data Expansion Plan

This document outlines our strategy for scaling the Crop Prediction Engine toward a target dataset of **100,000+ high-quality crop records** while maintaining type safety, calibration, and zero default crop bias.

---

## 1. Core Objectives
1.  **Increase Diversity**: Expand supported crop classes from 22 to 50+ classes, adding highly specialized regional commodities, oilseeds, and vegetables.
2.  **Climate Adaptation**: Harmonize raw records with temporal micro-climate indicators (historical temperature and rainfall grids from spatial data points).
3.  **Preserve Model Calibrations**: Ensure the expanded dataset has zero location leakage to protect against crop dominance bias.

---

## 2. Potential Data Sources
- **Government Agricultural Portals (DAC&FW)**: Harvest crop production reports and crop profiles.
- **Academic Research Repositories**: Gather verified physiological crop threshold datasets from FAO, World Bank, and UCI.
- **Soil Health Card Database**: Sample segments of the 7.8 lakh government soil profiles and match them with crop yield survey registries.

---

## 3. Data Harmonization Pipeline

### Step 1: Quality Filtering & Deduplication
- Filter out physical impossibilities (like pH $<0$ or $>14$).
- Remove identical feature rows to prevent data leakage.

### Step 2: Class Balancing
- Enforce a minimum support threshold (e.g. 500 samples per class) to prevent majority crop classes (such as Rice or Wheat) from skewing tree split statistics.

### Step 3: Geographic Bias Prevention
- Strip coordinates, district tags, and soil color variables from inputs before training. The model must remain geography-blind.

### Step 4: Model Tuning & Calibration
- Benchmark ExtraTrees against HistGradientBoosting and CatBoost on the expanded 100k+ dataset.
- Re-fit Sigmoid Platt Scaling to align tree vote percentages with true probability rates.
