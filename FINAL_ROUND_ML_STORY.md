# Krishi Sarathi: Final Round ML Story

This document outlines the data science narrative of Krishi Sarathi for presentation slides and pitch scripts.

---

## 1. The Slide Narrative

### Slide 1: The Scale Dilemma
- **Problem**: Our baseline crop prediction model was trained on only 2,200 observations. To qualify for the final round, we investigated whether we could scale this to 100k–200k+ observations.
- **The Challenge**: The government Soil Health Card database has 7.9 lakh records, but contains zero crop labels and is missing temperature, humidity, and rainfall readings.

### Slide 2: Why Naive Merging is Dangerous
- **Ecological Fallacy**: Assigning labels based on district-level dominant crops (e.g. labeling all soil cards in Pune as sugarcane) leaks geographical metadata. The model learns to recommend sugarcane based on latitude and location defaults rather than evaluating pure soil chemistry.
- **Proxy Imputations**: Filling missing climate parameters with fixed default averages introduces artificial correlations that degrade generalization.

### Slide 3: The Decoupled Data Solution (Scientific Integrity over Raw Volume)
- Rather than forcing raw, unlabelled records into predictor training, we decoupled the architecture:
  1.  **Generalized Crop Predictor**: Kept trained on the balanced 2,200-sample dataset, completely blind to location coordinates and administrative names.
  2.  **GIS Map Observatory**: Fed by the 7.8 lakh government soil cards and IMD weather logs to render district rankings, soil quality indices (SQI), and Shannon crop diversity curves.

### Slide 4: Trust, Safety & Calibration
- **Platt Sigmoid Calibration**: Maps raw decision tree splits into calibrated suitability probabilities.
- **Out-of-Distribution (OOD) Gates**: Blocks physically impossible inputs (like pH of 8049 or negative nutrients) at the API gateway and warns users about unusual soil conditions.
- **Robustness**: Verifies that model predictions remain stable under $\pm 5\%$ parameter drifts.
