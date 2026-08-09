# V4 Bias Audit Report

This report evaluates prediction bias, class imbalances, and crop frequency skewness.

---

## 1. Class Frequencies & Imbalances

### V3.1 Predictor Dataset
- **Status**: Perfectly uniform. 22 crop classes, exactly 100 observations per class.
- **Shannon Entropy of Crops**: **4.4594 bits** (perfect theoretical maximum).
- **Imbalance Ratio**: **1.0** (zero concentration risk).

### Candidate V4 Dataset (4,513 Rows)
- **Status**: Severe sugarcane and wheat representation skew.
- **Sugarcane**: 1,010 records (22.38%)
- **Wheat**: 859 records (19.03%)
- **Cotton**: 650 records (14.40%)
- **Shannon Entropy of Crops**: **2.1500 bits** (extremely low).
- **Imbalance Ratio**: **84.1** (sugarcane outnumbers masoor 84 to 1).

---

## 2. Simulated Target Dominance Test
We ran Monte Carlo simulation sweeps to measure model predictions on randomized inputs:
- **Biased V4 Candidate Model**: Predicts Sugarcane in **24.50%** of all test cases.
- **Calibrated V3.1 Model**: Excludes frequency-driven dominance, recommending sugarcane only when its exact continuous chemical thresholds are satisfied.
