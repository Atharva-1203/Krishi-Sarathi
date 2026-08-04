# Agro-Ecology Relevance to ML Model

Agro-ecology provides critical weather proxies and climate constraints for the ML crop recommendation model:

- **Length of Growing Period (LGP)**: Act as a vital constraint on crop maturity. If a district has an LGP of 90-120 days (semi-arid Deccan), recommending long-duration sugarcane (requires 300+ days) is biologically impossible without perennial irrigation.
- **Aridity Index (AI)**: Combines rainfall and PET. Highly correlated with dryland cropping suitability. Recommends millet and pulses in low AI (<0.4) zones and paddy in high AI (>0.8) zones.
- **AET/PET Ratio**: Represents crop water stress index. Can be used for feature engineering to identify droughts and select drought-resistant cultivars.
- **Rainfall (1992 vs 2018)**: Demonstrates climate shift trends, allowing the model to adjust confidence scores in areas experiencing significant rainfall reduction (e.g. rising aridity in parts of western Vidarbha).
