# Soil Health Data Quality and Inconsistency Report

This report evaluates database anomalies, missing values, duplicates, and naming variations in the compiled Soil Health Card database.

## 1. District Nomenclature & Spelling Variations
- **The Issue**: The portal utilizes various spelling forms for the same districts (e.g. `AHMADNAGAR` vs `AHILYANAGAR`, `AMARAVATI` vs `AMRAVATI`, `BID` vs `BEED`, `Jalana` vs `Jalna`).
- **Resolution**: A mapping dictionary was implemented in the python compiler to standardize all spelling variations to their standard English names (e.g., AHMADNAGAR $ightarrow$ Ahmednagar, BID $ightarrow$ Beed).

## 2. Empty District Properties in KML
- **The Issue**: For approximately 680,000 points, the description tag inside the KML files lacked the `DISTRICT` attribute.
- **Resolution**: Our pipeline resolved this by extracting the district fallback name directly from the KML filename itself (e.g. `SATARA_2023-24.kml` yields `Satara`), ensuring 100% district naming coverage.

## 3. Boundary Points from Neighboring States
- **The Issue**: A small number of points fell in boundary regions representing districts of other states (e.g., Belgaum in Karnataka, Valsad in Gujarat).
- **Resolution**: These points were filtered out of the final compiled database to restrict observations purely to the 34 agricultural districts of Maharashtra.

## 4. Null & Missing Nutrient Values
- **Completeness**: Out of 780,499 parsed records:
  - Nitrogen (N): 53 nulls (<0.01%)
  - Phosphorus (P): 188 nulls (<0.03%)
  - Potassium (K): 178 nulls (<0.03%)
  - pH: 216 nulls (<0.03%)
  - Micronutrient Iron (Fe): 88,665 nulls (~11%)
- **Action**: Do not fabricate these missing values. Let the ML model handle them using imputation (e.g., median values of the corresponding Taluka) during model training, or drop these rows since they represent a negligible fraction of the overall database.
