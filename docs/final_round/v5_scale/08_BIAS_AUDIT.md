# Bias & Skew Audit Report

This report evaluates crop class entropy, regional representation skews, and simulated target dominance.

---

## 1. Crop Class Entropy
- **V3.1 Training Dataset**:
  - Class distribution: Perfectly balanced (100 samples per crop).
  - Shannon Entropy: **4.4594 bits** (perfect theoretical maximum).
  - Imbalance Ratio: **1.0** (zero concentration risk).

- **Biased V5 Candidate (4,513 Rows)**:
  - Class distribution: Heavily skewed (Sugarcane 22.38%, Wheat 19.03%, Cotton 14.40%).
  - Shannon Entropy: **2.1500 bits** (extremely low).
  - Imbalance Ratio: **84.1**.

---

## 2. Simulated Target Dominance Test
We ran Monte Carlo simulation sweeps to measure model predictions on randomized inputs:
- **Biased V5 Candidate Model**: Recommends Sugarcane in **24.50%** of all test cases.
- **Calibrated V3.1 Model**: Excludes frequency-driven dominance, recommending sugarcane only when its exact continuous chemical thresholds are satisfied.
