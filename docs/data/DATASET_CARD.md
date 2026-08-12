# 📊 Dataset Card — Krishi Sarathi Agricultural Data Universe

## Summary of Evidence Base (785,857 Total Observations)

| Dataset | Record Count | Features / Dimensions | Scope / Geography | Primary Usage |
| :--- | :---: | :--- | :--- | :--- |
| **ICAR Crop Physiology Corpus (GOLD)** | 2,200 | $N, P, K, 	ext{temp}, 	ext{humidity}, 	ext{pH}, 	ext{rainfall}$, label | All India Balanced (22 crops) | Core ML Model Training |
| **Maharashtra Soil Health Cards (SILVER)** | 779,144 | $N, P, K, 	ext{pH}, 	ext{OC}, 	ext{EC}, 	ext{Fe}, 	ext{Zn}, 	ext{Mn}, 	ext{Cu}$, District, Village | 34 Districts, Maharashtra | Regional Soil Observatory |
| **IMD 0.25° Weather Grid** | 13,200 | Annual & seasonal rainfall, temperature anomalies | 11-Year Time Series (2015–2025) | Climate Trends & Risk Audit |
| **DES Yield & Area Statistics** | 4,513 | District crop area, production, yield (q/ha) | Maharashtra Districts | Agricultural Trend Analytics |
| **AGMARKNET & CACP Benchmarks** | 22 Crops | Yield benchmarks, Mandi prices, Cultivation costs | Government Schemes 2023-2025 | Decoupled Profit Engine |

## Multi-Tier ML Corpus
- **GOLD Core**: 2,200 balanced ICAR/FAO trial records across 22 crops (98.86% test accuracy).
- **GOLD + SILVER Harmonized**: 81,713 validated observations across 43 crop species (96.76% test accuracy, 0.0209 ECE calibration).
