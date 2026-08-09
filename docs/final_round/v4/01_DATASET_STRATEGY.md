# V4 Dataset Strategy Report

This report outlines the data selection, separation, and evolution strategy of Krishi Sarathi.

---

## 1. The Decoupled Data Principle
To prevent geographic bias and sugarcane monoculture dominance in crop recommendations, we enforce a strict separation between **Prediction Input Space** and **Geographical Context Space**:

- **Model Training Space**: Core soil chemistry and meteorological conditions ($N, P, K$, pH, temperature, humidity, rainfall). Coordinates, district names, and administrative boundaries are strictly excluded.
- **GIS Map Space**: District boundaries, latitude/longitude plots, average soil quality indices (SQI), and Shannon crop diversity indices.

---

## 2. Incompatibility of the 7.9L Database
Naively merging the government Soil Health Cards into model training is rejected because:
1.  **Missing Climate Features**: The cards record soil chemistry but lack matching temperature, humidity, and rainfall readings.
2.  **No Crop Target**: The cards represent soil diagnostics, not crop suitability outcomes. Assigning dominant district crops (e.g. Pune $\implies$ Sugarcane) represents manufactured leakage.
