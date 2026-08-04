# Administrative Units Relevance to ML Model

- **Primary Join Key**: The `geoportal_spelling` column serves as the critical join key to merge spatial soil, degradation, and physiography data with local meteorological data (Temperature, Rainfall, Humidity) and district crop yield records.
- **Granular Recommendations**: Crop recommendations must be contextualized at the district/block level due to regional microclimates and administrative planning differences.
- **Explainability**: Spatial groupings allow the explainable ML model to report geographic confidence variations (e.g., higher recommendation accuracy in Vidarbha vs. Konkan regions).
