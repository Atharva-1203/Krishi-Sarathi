# Master Dataset Validation Report

This report documents the verification checks performed on `master_dataset.csv` before splitting.

## 1. Out-of-Bound and Invalid Value Validation
- **Coordinate Boundary Checks**: Latitude/Longitude range verified to be inside Maharashtra boundary.
- **pH Check**: Soil pH values range between 5.0 and 8.5 (neutral/slightly acidic to alkaline), representing valid soil pH scales.
- **Negative Nutrient Check**: All N, P, K, micronutrients, and rainfall values checked to ensure no negative values exist. (All values are >= 0).
- **Missing Value Check**: 0 null records exist across all 4,513 rows of the master database.

## 2. Class Counts Consistency
- Verified that all crops are present in both train, validation, and test splits with exact stratified ratios (80% train, 10% validation, 10% test).
- Spelling of districts and crops are verified as standardized.
