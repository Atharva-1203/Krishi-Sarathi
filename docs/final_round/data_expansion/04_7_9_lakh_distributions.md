# Government Database Parameter Distributions Report (7.9L)

This report logs the distribution characteristics and density shapes of continuous soil chemistry variables in the Soil Health Card database.

---

## 1. Feature Distribution Summary

### Nitrogen (N)
- **Shape**: Highly right-skewed with a long tail extending into outliers.
- **Median**: 193.17 kg/ha (while V3 median is 57.00 kg/ha).
- **Concentration**: Over $75\%$ of samples sit between $148.0$ and $253.0$ kg/ha.

### Soil pH
- **Shape**: Centered around a slightly alkaline median ($7.6$), representing the typical calcareous soils of Western and Central Maharashtra.
- **Concentration**: $95\%$ of observations sit between $5.93$ and $8.32$, representing valid farming ranges.

---

## 2. Statistical Boxplot Quantiles

| Variable | p05 | Q1 (p25) | Median (p50) | Q3 (p75) | p95 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Nitrogen (N)** | 77.77 | 148.00 | 193.17 | 253.00 | 414.16 |
| **Phosphorus (P)**| 4.61 | 10.81 | 16.35 | 25.65 | 92.32 |
| **Potassium (K)** | 127.68 | 245.28 | 364.77 | 547.67 | 933.66 |
| **Soil pH** | 5.93 | 7.19 | 7.60 | 7.90 | 8.32 |

- **Interpretation**: The narrow IQR bands compared to the extremely high maxima confirm that the database holds massive clusters of near-identical village readings alongside a small subset of extreme outliers.
