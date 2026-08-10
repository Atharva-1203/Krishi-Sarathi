# External Data Source Research

This report registers the candidate agricultural databases discovered and evaluated for crop prediction scale-up.

---

## 1. Candidate Source Catalog

| Dataset | Source | URL | Region | Rows | Features | Crop Labels | License | Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Kaggle Crop** | Peer Research | [Supplement](https://kaggle.com) | India | 2,200 | 8 | 22 | CC-BY | **Accepted** |
| **Crop-Fertilizer**| Academic Survey | [Survey](https://kaggle.com) | India | 4,513 | 11 | 16 | Open | **Rejected (No Humidity)** |
| **SHC Database** | soilhealth.dac.gov.in | [SHC Portal](https://soilhealth.dac.gov.in) | India | 779k | 18 | 0 | GODL | **Map Layer Only** |
| **IMD Gridded** | IMD Pune | [IMD Pune](https://imdpune.gov.in) | India | Gridded | Weather | 0 | Research | **Map Layer Only** |
| **DES APY** | desagri.gov.in | [DES Agri](https://desagri.gov.in) | India | District | Production | Yes | GODL | **Map Layer Only** |

---

## 2. Ingestion Suitability Scoring

- **V3.1 Benchmark**: Excellent quality, fully matched features and labels. Scoring: **HIGH**.
- **7.9L Database**: Lacks crop target labels and humidity/rainfall features. Scoring: **REJECT for training; HIGH for GIS observatory**.
- **Crop-Fertilizer Survey (4,513 Rows)**: Lacks relative humidity. Attempting to merge it requires proxy-imputing weather defaults, which introduces artificial features correlation. Scoring: **REJECT**.
