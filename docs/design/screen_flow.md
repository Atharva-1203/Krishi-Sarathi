# Krishi Sarathi - Screen Flow Diagram

Layout transitions mapping.

```mermaid
graph TD
  Landing[Cinematic Home] -->|Start Analysis| Predictor[Prediction Dashboard]
  Predictor -->|Form Validations| Loading[Inference Shimmer Loader]
  Loading -->|API Success| Results[Suitability Results Page]
  Results -->|Print Report| Print[Window Certificate Overlay]
  Results -->|Save Log| History[Local History Drawer]
  Sidebar[Navigation Menu] -->|Tab Switch| Insights[Maharashtra GIS Map]
  Sidebar -->|Tab Switch| Specs[ML Specifications Page]
```
