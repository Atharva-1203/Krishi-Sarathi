# Outlier & Dataset Anomaly Analysis Report (Phase 7.0)

Quality audit scanning for spatial anomalies, outliers, and feature leakage on Krishi Sarathi datasets.

---

## 1. Spatial & District-level Soil Discrepancy
Western Maharashtra soil profiles exhibit distinct local clusters:
- **Kolhapur division**: Characterized by high organic carbon ($\text{OC} > 0.8\%$) and acidic properties ($\text{pH} < 6.0$).
- **Solapur division**: Characterized by low organic carbon ($\text{OC} < 0.45\%$) and alkaline soil properties ($\text{pH} > 7.5$).

### Imputation Bias:
Using a global mean/median imputer for missing parameters distorts regional patterns. For instance, replacing missing pH in Kolhapur with a global median ($7.2$) would lead to incorrect crop suitability predictions. To solve this, **district-specific soil health defaults** are dynamically loaded.

---

## 2. Impossible Values & Quality Check
- **Soil pH range checks**: All records lie within $[4.2, 9.2]$.
- **Nutrient boundary check**: $N, P, K$ values are strictly positive.
- **Drought-zone irrigation signals**: Lower-rainfall districts (like Solapur, average $481.1\text{mm}$) cultivate Sugarcane and Rice. The decision engine maps these records to conditional warnings specifying drip/sprinkler/borewell irrigation.
