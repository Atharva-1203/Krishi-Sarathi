# Soils Data Dictionary

This dictionary defines soil parameters represented as database columns inside the BHOOMI Geoportal `1m_soils_state` and `250k_soils_state` tables.

### 1. Soil Depth (`Dept_D_T` / `Depth_D_T`)
- **Type**: Ordinal (Categorical)
- **Allowed Values**: `Extremely shallow` (<10 cm), `Very shallow` (10-25 cm), `Shallow` (25-50 cm), `Moderately shallow` (50-75 cm), `Moderately deep` (75-100 cm), `Deep` (100-150 cm), `Very deep` (>150 cm).

### 2. Soil Texture (`Stex_D_T`)
- **Type**: Categorical
- **Allowed Values**: `Clayey`, `Loamy`, `Sandy`, `Gravelly clay-clay`, `Sandy loam-lomy sand`, `Silty clay-gr. silty clay`.

### 3. Soil pH (`pH_D_T`)
- **Type**: Ordinal (Categorical)
- **Allowed Values**: `Strongly acidic` (<5.0), `Moderately acidic` (5.0-5.5), `Slightly acidic` (5.5-6.5), `Neutral` (6.5-7.5), `Slightly alkaline` (7.5-8.0), `Moderately alkaline` (8.0-8.5).

### 4. Soil Drainage (`Drain_D_T`)
- **Type**: Ordinal
- **Allowed Values**: `Excessive`, `Somewhat excessive`, `Well`, `Moderately well`, `Imperfect`, `Poor`.

### 5. Soil Slope (`Slope_D_T`)
- **Type**: Ordinal
- **Allowed Values**: `Level to nearly level` (0-1%), `Very gently sloping` (1-3%), `Gently sloping` (3-8%), `Moderately sloping` (8-15%), `Moderately steep` (15-30%), `Steeply sloping` (>30%).

### 6. Calcareousness (`Calc_D_T`)
- **Type**: Ordinal
- **Allowed Values**: `Non calcareous`, `Slight`, `Moderate`, `Strong`.

### 7. Salinity (`Salin_D_T`)
- **Type**: Ordinal
- **Allowed Values**: `Negligible`, `Slight`, `Moderate`, `Strong`.

### 8. Sodicity (`Sodi_D_T`)
- **Type**: Ordinal
- **Allowed Values**: `Negligible`, `Slight`, `Moderate`.

### 9. Parent Material (`Pmat_D_T`)
- **Type**: Categorical
- **Allowed Values**: `Basalt`, `Alluvium`, `Colluvium`, `Granite/Gneiss`, `Laterite`, `Sandstone`, `Limestone`, `Schist`.

### 10. Soil Taxonomy (`Taxa_D_T` / `TAXONOMY_I`)
- **Type**: Categorical
- **Allowed Values**: Standard USDA Soil Taxonomy subgroups (e.g. `Typic Chromusterts`, `Lithic Ustorthents`, `Vertic Ustochrepts`).
