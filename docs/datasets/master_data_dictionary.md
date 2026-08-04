# Krishi Sarathi - Master Data Dictionary

This master data dictionary consolidates all soil chemical points, soil physical attributes, and climate parameters into a single document.

---

## 1. Primary Geolocated Soil Chemical Features (Soil Health Card)

| Feature | Data Type | Unit | Description | Missing % | Primary Role |
|---------|-----------|------|-------------|-----------|--------------|
| **Latitude** | Float | Decimal Degrees | Latitude coordinate of the soil test | 0.0% | Spatial referencing & clustering |
| **Longitude** | Float | Decimal Degrees | Longitude coordinate of the soil test | 0.0% | Spatial referencing & clustering |
| **N** | Float | kg/ha | Available Nitrogen content of the farm plot | 0.01% | Primary nutrient input |
| **P** | Float | kg/ha | Available Phosphorus content of the farm plot | 0.03% | Primary nutrient input |
| **K** | Float | kg/ha | Available Potassium content of the farm plot | 0.03% | Primary nutrient input |
| **pH** | Float | Scale (0-14) | Soil acidity/alkalinity balance | 0.03% | Soil chemical constraint |
| **OC** | Float | % | Organic Carbon content of the soil | 0.02% | Soil fertility indicator |
| **EC** | Float | dS/m | Electrical Conductivity (salinity indicator) | 0.00% | Salinity constraint |
| **B** | Float | ppm | Available Boron content | 0.38% | Micronutrient constraint |
| **Fe** | Float | ppm | Available Iron content | 11.20% | Micronutrient constraint |
| **Mn** | Float | ppm | Available Manganese content | 0.02% | Micronutrient constraint |
| **Cu** | Float | ppm | Available Copper content | 0.02% | Micronutrient constraint |
| **Zn** | Float | ppm | Available Zinc content | 0.01% | Micronutrient constraint |
| **S** | Float | ppm | Available Sulphur content | 0.39% | Secondary nutrient constraint |

---

## 2. Spatial Soil Physical Features (BHOOMI Geoportal)

| Feature | Data Type | Unit | Description | Source Mapping |
|---------|-----------|------|-------------|----------------|
| **Soil Depth** | String | Category | Depth classification (e.g. Shallow, Very Deep) | `soils/soil_depth.csv` |
| **Soil Texture** | String | Category | Soil texture classification (e.g. Clayey, Loamy) | `soils/soil_texture.csv` |
| **Soil Type** | String | Category | Soil type (e.g. Black Soil, Red Soil) | `soils/soil_types.csv` |
| **Erosion** | String | Category | Soil erosion risk (e.g. Moderate, Severe) | `land_degradation/erosion.csv` |
| **Land Capability** | String | Category | Soil land use classification (Class I-VIII) | `land_use/land_capability.csv` |

---

## 3. Climate & Temporal Features (Mahavedh Portal)

| Feature | Data Type | Unit | Description | Primary Role |
|---------|-----------|------|-------------|--------------|
| **Rainfall** | Float | mm | Sowing season (monsoon) cumulative precipitation | Climate driver |
| **Rainfall Category**| String | Category | Precipitation category (Deficit, Excess, Normal) | Ordinal climate feature |
| **Growing Season** | String | One-Hot | Monsoon (Kharif), Winter (Rabi), Summer | Temporal context |
