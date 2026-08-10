# External Datasets Catalog

This document registers candidate meteorological and agricultural registries evaluated for target dataset expansion.

---

## 1. Candidate Source Catalog

| Dataset | Source | URL | Country | Rows | Features | Crop Labels | Soil | Climate | Geography | Time | License | Quality | Compatible? |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Kaggle Crop** | Peer Research | [Supplement](https://kaggle.com) | India | 2,200 | 8 | 22 | Yes | Yes | Blind | Static | CC-BY | Excellent | **🟢 YES** |
| **Crop-Fertilizer** | Regional Survey | [Survey](https://kaggle.com) | India | 4,513 | 11 | 16 | Yes | Skew | District | 2015-17 | Open | Moderate | **❌ NO** |
| **SHC Database** | soilhealth.dac.gov.in | [SHC Portal](https://soilhealth.dac.gov.in) | India | 779k | 18 | 0 | Yes | No | Yes | Cycles | GODL | Contaminated | **❌ NO** |
| **IMD Gridded** | IMD Pune | [IMD Pune](https://imdpune.gov.in) | India | Gridded | Precipitation | 0 | No | Yes | Yes | 1901-26 | Research | Excellent | **🟢 Map Only** |
| **DES APY** | desagri.gov.in | [DES Agri](https://desagri.gov.in) | India | District | Yield/Area | Yes | No | No | Yes | 1997-25 | GODL | High | **🟢 Map Only** |

---

## 2. Evaluation Results
1.  **Meteorological & Yield Data (IMD/DES)**: Fully validated and highly useful for visual map layers, but contains no farm-level soil chemistry, preventing direct integration into predictor training.
2.  **External Tabular Datasets**: Exclude Candidate B (4,513 rows) due to missing humidity features and sugarcane dominance.
