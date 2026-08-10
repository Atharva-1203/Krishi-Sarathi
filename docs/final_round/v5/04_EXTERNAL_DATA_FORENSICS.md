# External Data Quality Audit

This document reports the quality forensics of the external 4,513-row survey candidate dataset.

---

## 1. Crop Skews & Entropy
We evaluated the class distribution of the 4,513 crop observations:

- **Sugarcane**: 1,010 records (22.38%)
- **Wheat**: 859 records (19.03%)
- **Cotton**: 650 records (14.40%)
- **Shannon Entropy**: **2.1500 bits** (extremely low; perfect entropy for 16 classes is $4.0$ bits).
- **Imbalance Ratio**: **84.1** (Sugarcane outnumbers Masoor 84 to 1).

---

## 2. Imputation and Bias Risks
1.  **Missing Humidity**: The survey dataset lacks relative humidity. In the processed master file, humidity was imputed using a fixed regional default value per district/season.
2.  **Imputation Leakage**: Trees split on these static values (e.g. splitting on humidity $91.99\%$ to identify Sugarcane), memorizing regional proxies rather than learning general chemical bounds.
3.  **Frequency Dominance**: Training on this dataset results in a default sugarcane prediction rate of $24.50\%$ on random inputs.
