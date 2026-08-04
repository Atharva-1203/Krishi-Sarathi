# Project Relevance and Dataset Prioritization Report

This report evaluates every dataset available in the Maharashtra BHOOMI Geoportal against the official hackathon problem statement: **Develop an ML model that recommends the Top 3 crops based on N, P, K, pH, Temp, Humidity, and Rainfall.**

Each dataset is prioritized with a clear justification.

## 1. HIGH PRIORITY (Essential for Crop Recommendation Accuracy)

### Soils (`1m_soils_state`, `250k_soils_state`)
- **Justification**: Soil depth, texture, pH, and drainage directly govern the root environment and nutrient transport dynamics. Soil pH directly controls the availability of the input features Nitrogen, Phosphorus, and Potassium (NPK). Clayey texture directly correlates with high water retention, buffering rainfall variations.
- **ML Integration**: Integrated as input features to prevent inappropriate recommendations (e.g. recommending water-heavy rice on shallow, poorly-retaining stony soils).

### Land Use Planning - Crop Suitability (`LUP_CropSut`)
- **Justification**: This contains expert-derived ground truth labels (suitability S1/S2/S3/N) for 26 crops based on decades of agronomical research by ICAR.
- **ML Integration**: Serves as a validation baseline or rule-based filter to cross-check ML recommendations, especially for calculating confidence scores.

### Agro Ecology (`AER_1992`, `AER_2015`, `AESR_1999`)
- **Justification**: Provides the long-term climatic context (LGP, Aridity, Moisture Index) which buffers seasonal weather anomalies.
- **ML Integration**: Provides baseline features for aridity and length of growing periods.

---

## 2. MEDIUM PRIORITY (Improves Explainability & Decision Support)

### Land Degradation (`Harmonised_Data`, `SoilErosionLayer`)
- **Justification**: Saline, sodic, and waterlogged soils restrict crop selection. Sodic soils restrict root growth of sensitive crops, and erosion drains NPK nutrients.
- **ML Integration**: Used as an explainability module ("Brief explanation" requirement) to append warnings to recommendations (e.g. "Sorghum recommended, but soil is moderately sodic; apply gypsum for maximum yield").

### Physiography (`Major_Physiographic_Regions_DistWise`, `Broad_Landforms_DistWise`)
- **Justification**: Elevational classes from SRTM/ALOS and landforms (hills vs. plains) determine air drainage, temperature cooling rates, and water accumulation zones.
- **ML Integration**: Explains temperature variations (microclimates) and drainage behavior.

---

## 3. LOW PRIORITY (Contextual/Hydrological Baseline)

### Watershed Planning (`Major_River_Basins`, `Waterbodies`)
- **Justification**: Useful for identifying surface water proximity for irrigated crops (e.g. sugarcane requires proximity to river basins/reservoirs).
- **ML Integration**: Used in secondary decision-support modules to evaluate irrigation feasibility.

---

## 4. NOT REQUIRED (Outside Hackathon Scope)

### Socio-Economic Data (2011 Census) & Livestock Census (2012)
- **Justification**: Scheduled Castes, Scheduled Tribes, marginal workers, or buffalo/cattle populations do not influence the biophysical requirements (NPK, pH, Temperature, Rainfall) of crop growth.
- **ML Integration**: Excluded to keep the training features completely biophysical and avoid bias.
