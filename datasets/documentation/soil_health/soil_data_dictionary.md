# Soil Health Data Dictionary

This document defines the schema of the compiled `soil_health_database.csv` database, which contains 780,499 geolocated soil points across Maharashtra.

| Column Name | Description | Unit | Datatype | Missing Values | Possible ML Usage |
|-------------|-------------|------|----------|----------------|-------------------|
| **Latitude** | Geographic latitude coordinate of the sample | Decimal Degrees | Float | 0 | Spatial clustering, regional soil zoning, mapping |
| **Longitude** | Geographic longitude coordinate of the sample | Decimal Degrees | Float | 0 | Spatial clustering, regional soil zoning, mapping |
| **Cycle** | Soil Health Card scheme cycle representing sample year | - | String | 0 | Temporal analysis, soil depletion trends |
| **District** | Standardized English name of the district | - | String | 0 | Joining with rainfall and crop databases |
| **Taluka** | Local sub-district administrative unit name | - | String | 0 | Granular regional classification |
| **Village** | Village name where the soil sample was taken | - | String | 0 | Micro-level spatial zoning |
| **N** | Available Nitrogen content | kg/ha | Float | 53 | Core crop recommendation input feature |
| **P** | Available Phosphorus content | kg/ha | Float | 188 | Core crop recommendation input feature |
| **K** | Available Potassium content | kg/ha | Float | 178 | Core crop recommendation input feature |
| **pH** | Soil pH value (acidic/alkaline balance) | pH scale (0-14) | Float | 216 | Core crop suitability indicator |
| **OC** | Soil Organic Carbon content | % | Float | 126 | Overall soil fertility index, carbon mapping |
| **EC** | Electrical Conductivity (soil salinity) | dS/m | Float | 27 | Crop salinity tolerance mapping |
| **B** | Available Boron content | ppm | Float | 2948 | Micronutrient deficiency mapping |
| **Fe** | Available Iron content | ppm | Float | 88665 | Micronutrient deficiency mapping |
| **Mn** | Available Manganese content | ppm | Float | 151 | Micronutrient deficiency mapping |
| **Cu** | Available Copper content | ppm | Float | 179 | Micronutrient deficiency mapping |
| **Zn** | Available Zinc content | ppm | Float | 96 | Micronutrient deficiency mapping |
| **S** | Available Sulphur content | ppm | Float | 3027 | Secondary nutrient deficiency mapping |
