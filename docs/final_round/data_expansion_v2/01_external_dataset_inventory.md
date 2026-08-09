# External Dataset Inventory (Second-Stage Discovery)

This report logs the results of our exhaustive search across official and academic repositories for labeled crop suitability and soil-climate datasets.

---

## 1. Audited Registries & Repositories

### A. Official Soil Health Card Portal (soilhealth.dac.gov.in)
- **Publisher**: Ministry of Agriculture & Farmers Welfare, Govt of India.
- **Data Granularity**: Farm level (Soil cards).
- **Usable Target**: **None** (contains soil measurements and fertilizer dose recommendations based on STCR equations, but no historical crop yields or observations).
- **License**: Closed / Privacy Protected (raw farm identifiers are anonymized).

### B. India Data Portal (indiadataportal.com)
- **Publisher**: Indian School of Business (ISB) / Government partnerships.
- **Data Granularity**: District/State level aggregated summaries.
- **Usable Target**: **None** (aggregated records do not align with individual farm soil profiles).
- **License**: Open for research.

### C. SoilGrids (isric.org)
- **Publisher**: ISRIC — World Soil Information.
- **Data Granularity**: Gridded spatial interpolation (250m resolution).
- **Usable Target**: **None** (provides predicted spatial soil properties like clay content and bulk density, but no crop labels).
- **License**: CC BY 4.0.

### D. UCI Machine Learning Repository
- **Publisher**: University of California, Irvine.
- **Data Granularity**: Small experimental subsets.
- **Usable Target**: Yes (small localized crop yields, typically $< 500$ rows).
- **License**: Public domain.

---

## 2. Labeled Dataset Candidates Summary

| Candidate Dataset | Source | Samples | Target | Climate? | License | Verdict |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Kaggle Crop Recommend** | Research Supplement | 2,200 | Crop Class | 🟢 Yes | Public | **Usable (V3.1 base)** |
| **Crop-Fertilizer (Raw)** | Regional Survey | 4,513 | Crop Class | ❌ No | Open | **Incompatible (Missing humidity)** |
| **Soil Health Cards** | soilhealth.dac.gov.in| 779,144 | None | ❌ No | Closed | **Incompatible (Unlabeled)** |
| **ISRIC SoilGrids** | isric.org | Gridded | None | ❌ No | CC-BY | **Incompatible (Unlabeled)** |

---

## 3. Findings
No public or government database provides a clean, farm-level join of soil properties, climate variables, and crop labels at the scale of 100k+ rows. Attempting to force a large dataset would require merging administrative statistics, causing spatial leakage and ecological fallacy.
