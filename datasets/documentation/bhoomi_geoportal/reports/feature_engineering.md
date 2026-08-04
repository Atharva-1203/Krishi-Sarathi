# Feature Engineering and Encoding Report

This report outlines the proposed feature categories, encoding methods, and derived variables for the crop recommendation machine learning model.

## 1. Feature Classification

| Variable Name | Description | Category | Recommended Encoding Method |
|---------------|-------------|----------|-----------------------------|
| `lgd_code` | District ID | Spatial / Categorical | One-Hot Encoding (if used as feature) or Geo-spatial coordinates (centroids) |
| `Depth_D_T` | Soil Depth | Ordinal | Label Encoding (e.g., Shallow=1, Med=2, Deep=3) or Target Encoding |
| `Stex_D_T` | Soil Surface Texture | Categorical | One-Hot Encoding |
| `pH_D_T` | Soil pH class | Ordinal | Label Encoding (mapping acidic to alkaline in linear numeric scale) |
| `Drain_D_T` | Drainage | Ordinal | Label Encoding (Poor=1, Imperfect=2, Well=3, Excessive=4) |
| `Slope_D_T` | Terrain Slope | Ordinal | Label Encoding based on slope percentage range |
| `Calc_D_T` | Calcareousness | Ordinal | Label Encoding (Non-calcareous=0, Slight=1, Moderate=2, Strong=3) |
| `Salin_D_T` | Salinity | Ordinal | Label Encoding (Negligible=0, Slight=1, Moderate=2, Strong=3) |
| `Sodi_D_T` | Sodicity | Ordinal | Label Encoding (Negligible=0, Slight=1, Moderate=2) |
| `Pmat_D_T` | Soil Parent Material | Categorical | One-Hot Encoding |
| `Taxa_D_T` | Soil Taxonomy subgroup | Categorical | Target Encoding or Frequency Encoding (high cardinality: 40+ classes) |
| `LGP` (AESR) | Length of Growing Period | Numerical (Derived) | Keep as raw days (e.g. 90, 120, 240) |
| `Aridity` (AER) | Climatic Aridity Index | Numerical (Derived) | Keep as decimal values (e.g. 0.35, 0.85) |

## 2. Potential Engineered / Derived Features
- **Drainage-to-Rainfall Index**: Ratio of Soil Drainage (numerical) to Rainfall (mm). Highlights soils prone to waterlogging (poor drainage + high rainfall) or excessive run-off.
- **Depth-Texture Product**: Product of soil depth score and clay content. Represents the total active soil moisture storage capacity (deep + clayey = high water capacity).
- **Nutrient Lock-down Index**: Boolean indicator derived from Soil pH and Calcareousness. If pH > 7.8 and Calcareousness is "Strong", this index indicates high Phosphorus fixation (lock-down), alerting the model that crops requiring heavy available Phosphorus (like potato or vegetables) will experience stress.

## 3. Normalization Requirements
- **Aridity Index and LGP**: Must be normalized using MinMaxScaler or StandardScaler if using distance-based models (SVM, KNN) or Deep Learning, as their raw ranges (0-1 vs 90-270) differ significantly. Tree-based models (Random Forest, XGBoost) do not require normalization.
