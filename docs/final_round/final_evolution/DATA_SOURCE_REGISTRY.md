# Data Source Registry (V5 Final Evolution)

This registry records the specifications, provenance, licenses, and scopes of all agricultural data assets integrated into Krishi Sarathi.

---

## 1. Registry Catalog

### A. Balanced Crop Suitability Dataset (V3.1)
- **Official Source**: UCI / Kaggle Benchmarks
- **URL**: [https://kaggle.com](https://kaggle.com)
- **Organization**: Public Agricultural Research Repositories
- **License**: CC BY 4.0
- **Year**: 2020
- **Geographic Coverage**: Location-blind continuous agronomic features
- **Number of Records**: 2,200
- **Variables**: N, P, K, temperature, humidity, pH, rainfall, label
- **Crop Labels**: 22 crops, perfectly balanced at 100 samples per crop
- **Soil Variables**: N, P, K, pH
- **Climate Variables**: Temperature, humidity, rainfall
- **Spatial Resolution**: Farm-level continuous bounds
- **Temporal Resolution**: Static physiological thresholds
- **Missingness**: 0.0%
- **Duplicates**: 0.0%
- **Known Biases**: None (fully balanced)
- **Potential Leakage**: None (location-blind)
- **Join Keys**: None
- **Training Suitability**: **Eligible (Champion)**

### B. Maharashtra Crop-Fertilizer Dataset (Raw)
- **Official Source**: regional agricultural department surveys
- **URL**: Internal agricultural university registries
- **Organization**: Regional Agricultural Universities, Maharashtra
- **License**: Government Open Data License (GODL) India
- **Year**: 2018
- **Geographic Coverage**: Maharashtra districts (Pune, Nashik, Kolhapur, etc.)
- **Number of Records**: 4,513
- **Variables**: District_Name, Soil_color, Nitrogen, Phosphorus, Potassium, pH, Rainfall, Temperature, Crop, Fertilizer
- **Crop Labels**: 16 crops, skewed (Sugarcane 22.38%, Wheat 19.03%, Cotton 14.40%)
- **Soil Variables**: Nitrogen, Phosphorus, Potassium, pH, Soil color
- **Climate Variables**: Rainfall, Temperature (lacks Humidity)
- **Spatial Resolution**: District-level spatial references
- **Temporal Resolution**: Annual statistics
- **Missingness**: Lacks Humidity parameter completely (100.0% missingness)
- **Duplicates**: 77 feature-only duplicate rows
- **Known Biases**: Heavy cash-crop bias toward sugarcane and wheat
- **Potential Leakage**: Location markers act as prediction shortcuts, causing overfitting
- **Join Keys**: District
- **Training Suitability**: **Ineligible** (rejection due to missing climate features and location leakage)

### C. Maharashtra Soil Health Card Database
- **Official Source**: Soil Health Card Programme Portal
- **URL**: [https://soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)
- **Organization**: Ministry of Agriculture & Farmers Welfare, Govt of India
- **License**: Government Open Data License (GODL) India
- **Year**: 2015-2022
- **Geographic Coverage**: 34 Districts of Maharashtra
- **Number of Records**: 779,144 (703,922 valid after deduplication)
- **Variables**: N, P, K, pH, OC, EC, Fe, Mn, Zn, Cu, S, B, Taluka, Village, District
- **Crop Labels**: None (Unlabeled soil diagnostics)
- **Soil Variables**: N, P, K, pH, OC, EC, Micronutrients
- **Climate Variables**: None
- **Spatial Resolution**: Survey parcel level
- **Temporal Resolution**: Rotational cycle records
- **Missingness**: 0.02% missing values
- **Duplicates**: 7,271 exact duplicates; 5.77% near-duplicates
- **Known Biases**: Skewed toward cash-crop growing districts (Nashik, Chandrapur, Satara, Pune represent >17% of records)
- **Potential Leakage**: High leakage risk if pseudo-labeled using spatial yield statistics
- **Join Keys**: District, Taluka
- **Training Suitability**: **Eligible for Unlabelled Representation Map Analytics ONLY**

### D. IMD Gridded Rainfall Records
- **Official Source**: Indian Meteorological Department (IMD) Pune
- **URL**: [https://imdpune.gov.in](https://imdpune.gov.in)
- **Organization**: Indian Meteorological Department, Ministry of Earth Sciences, Govt of India
- **License**: Open Meteorological Research Use
- **Year**: 2015-2025
- **Geographic Coverage**: Grid cells ($0.25^\circ \times 0.25^\circ$) over Maharashtra
- **Variables**: Gridded daily and monthly precipitation grids
- **Spatial Resolution**: $0.25^\circ \times 0.25^\circ$
- **Temporal Resolution**: Monthly summaries (11 years)
- **Training Suitability**: **Map Layer Climate Analytics ONLY**
