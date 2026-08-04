# Phase 1 Data Quality and Inconsistency Report

This report documents spatial, nomenclature, and database inconsistencies identified during the analysis of the Maharashtra BHOOMI Geoportal. These anomalies must be addressed during the preprocessing phase before training the ML crop recommendation model.

## 1. Missing Values and Nulls
- **Calcareousness & Sodicity (`Calc_D_T`, `Sodi_D_T`)**: Contains 'NA' values (amounting to ~3-5% of geographic records). These correspond to rocky terrain, waterbodies, and urban settlements where soil survey could not be conducted.
- **Groundwater Salinity (`Gwat_D_T`)**: Highly sparse data points. Contains ~20% null/undefined values in the 1:250K soils dataset.
- **Socio-Economic Data**: Completely missing for tribal districts' interior forest villages.

## 2. Duplicate and Overlapping Classifications
- **Soil Taxonomy (`Taxa_D_T`)**: Several spelling variations represent the same USDA taxonomic class (e.g. `Fluventic Ustropept` vs. `Fluventic Ustropepts` in the 1:250K soils list). These must be cleaned and collapsed into a single categorical class.
- **Water Bodies & Settlements**: Represented twice. Once in the `SurF_D_T` (Landforms) list as 'Waterbodies' / 'Settlements' and again in the soil attribute columns. These must be masked out uniformly.

## 3. Nomenclature and Spelling Inconsistencies (Primary Join Keys)
There are significant spelling mismatches between the BHOOMI Geoportal database spelling and standard Government spelling (LGD standards). If left uncorrected, spatial joins will fail:

| Geoportal Spelling | Standard Spelling (LGD) | Census 2011 standard | Impact on Spatial Join |
|--------------------|-------------------------|----------------------|------------------------|
| `AMARAVATI` | AMRAVATI | AMRAVATI | Mismatch will drop Amravati weather data |
| `BID` | BEED | BEED | Drops Beed district records |
| `GONDIYA` | GONDIA | GONDIA | Drops Gondia district records |
| `NASIK` | NASHIK | NASHIK | Drops Nashik district records |
| `RAIGARH` | RAIGAD | RAIGAD | Drops Raigad coastal district records |
| `SUBURBAN MUMBAI` | MUMBAI SUBURBAN | MUMBAI SUBURBAN | Drops Mumbai Suburban records |
| `AHMADNAGAR` | AHMEDNAGAR | AHMEDNAGAR | Drops Ahmednagar district records |

## 4. Spatial Inconsistencies
- **Administrative Split**: The geoportal lists Thane as a single unified district (`THANE`). However, in 2014, **Palghar** district was carved out of Thane. Any external crop yield dataset containing Palghar will fail to join with the soil layers unless Palghar's boundaries are merged back into Thane, or Palghar soils are extracted using spatial intersection.
- **Scale Discrepancies**: Soils are mapped at 1:250,000 scale but Agro-Ecology is mapped at 1:1,000,000 scale. Soil properties vary at much finer resolutions than climatic boundaries, leading to boundary mismatches when intersected.

## 5. Recommendations for Preprocessing
1. **Categorical Collapsing**: Standardize taxonomic spelling strings using a cleaning lookup map (e.g., map `Fluventic Ustropept` to `Fluventic Ustropepts`).
2. **Nomenclature Mapping**: Apply an explicit spelling correction dictionary to the `geoportal_spelling` column to align it with standard Census/LGD codes before executing tabular joins.
3. **Palghar Boundary Resolution**: Intersect external data for Palghar and Thane using coordinate polygon matching, or assign Palghar data to Thane's soil features for backward compatibility.
4. **Soil Masking**: Exclude all records where `Depth_D_T` is `Rock outcrops`, `Waterbodies`, or `Settlements` from the training dataset.
