# 779K Soil Cards Enrichment Results (V5 Final Evolution)

This document records the statistical distribution audits and spatial mapping results of the 779,144 government soil health card records.

---

## 1. Distribution Shift Metrics

We compared the distribution of soil parameters in the 2,200-row predictor dataset against the 779K Soil Health Cards database:

| Feature | Predictor Mean | Soil Cards Mean | Kolmogorov-Smirnov Stat | Wasserstein Distance | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Nitrogen (N)** | 50.55 | 217.56 | 0.8341 | 167.05 | 🔴 Severe Shift |
| **Phosphorus (P)** | 53.67 | 28.19 | 0.5327 | 30.34 | 🔴 Severe Shift |
| **Potassium (K)** | 48.15 | 431.10 | 0.8823 | 382.97 | 🔴 Severe Shift |
| **Soil pH** | 6.47 | 7.55 | 0.6034 | 0.98 | 🔴 Moderate Shift |

---

## 2. Statistical Findings

### A. Non-Overlapping Decision Manifolds
The Kolmogorov-Smirnov (KS) statistics are close to $1.0$, indicating that the two datasets represent completely different population distributions. The Soil Health Cards reflect real-world, highly alkaline, and potassium-rich soil conditions in Maharashtra, whereas the predictor dataset represents standard agricultural physiological distributions.

### B. Prevention of Ecological Fallacy
Joining district-wide crop yield statistics to individual Soil Health Cards assumes that every farm in a district grows the dominant cash crop. This commits an ecological fallacy and introduces severe location leakage. Node splits would overfit to regional markers (like Nashik coordinates) rather than generalizable chemical boundaries.
