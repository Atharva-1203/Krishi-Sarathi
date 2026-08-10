# Dataset Bias & Class Distribution Report

This report evaluates prediction bias, class imbalances, and geographic/temporal concentration skews.

---

## 1. Class Imbalances

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

## 2. Geographic Concentration (7.9L)
- **Top District**: **Nashik** holds 41,286 records (5.30% of the entire database).
- **Entropy of District spread**: **5.0188 bits** (theoretical maximum is $5.087$ bits).
- **Gini concentration coefficient**: **0.1729** (shows card registrations are relatively evenly distributed across the 34 districts).
- **Finding**: While registrations are balanced, underlying crop specialties are highly skewed. Western districts are dominated by sugarcane, which introduces regional defaults if location variables are included in predictor training.

---

## 3. Simulated Target Dominance Test
We ran Monte Carlo simulation sweeps to measure model predictions on randomized inputs:
- **Biased V4 Candidate Model**: Predicts Sugarcane in **24.50%** of all test cases.
- **Calibrated V3.1 Model**: Excludes frequency-driven dominance, recommending sugarcane only when its exact continuous chemical thresholds are satisfied.
