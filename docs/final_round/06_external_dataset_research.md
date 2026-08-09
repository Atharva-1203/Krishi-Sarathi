# Krishi Sarathi: External Dataset Research & Provenance

This report documents public agricultural and meteorological databases evaluated for model scaling.

---

## 1. Evaluated Public Sources

### A. Directorate of Economics & Statistics (DES)
- **Source**: Ministry of Agriculture & Farmers Welfare, Government of India.
- **Data Exposed**: Crop area, production, and yield estimates at district granularity.
- **Coverage**: All states of India, annual intervals.
- **Relevance**: Decoupled GIS Map historical stats.
- **License**: Government Open Data License - India (GODL).

### B. Indian Meteorological Department (IMD)
- **Source**: Ministry of Earth Sciences, Government of India.
- **Data Exposed**: Daily/monthly gridded rainfall and temperature metrics at district resolution.
- **Coverage**: Temporal range: 1901–present.
- **Relevance**: Decoupled GIS Map analytics and rain anomaly statistics.
- **License**: Non-commercial research license.

---

## 2. Dataset Integration Catalog

| Source | Parameters | Geographic | Target Quality | Compatibility Verdict |
| :--- | :--- | :---: | :---: | :--- |
| **DES Portal** | Area, Yield, Production | National | High | **Analytical Map Layer only** |
| **IMD Grids** | Rainfall, Temp | National | High | **Analytical Map Layer only** |
| **FAOSTAT** | Yield, Fertilizer | Global | Moderate | **Incompatible** (No micro-climate features) |
