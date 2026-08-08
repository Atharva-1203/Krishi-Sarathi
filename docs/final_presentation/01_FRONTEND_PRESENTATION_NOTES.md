# Krishi Sarathi: Frontend Presentation Notes

This document contains talking points, technical details, and potential judge questions for the frontend presentation layer.

---

## 1. Core Technology Stack
- **Framework**: Next.js 15 (React 19)
- **Styling**: TailwindCSS & Custom Vanilla CSS Design System
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

## 2. Key Components & Features
- **Landing Page**: Dynamic counter cards displaying system data volume (2,200 training rows, 779k soil cards, etc.) and a categoric Taxonomic Crop Explorer.
- **Prediction Form**: Integrates live reactive validation triggers (e.g. pH status text updating dynamically on change: Slightly Acidic, Alkaline, Neutral).
- **Results Display**: Renders:
  - **Calibrated Prediction Probability** for the top 5 crop candidates.
  - **Model Suitability Margin Gap** (e.g. HIGH MARGIN >= 10% vs. LOW MARGIN < 10%).
  - **Parameter Fit Alignment** (ASCII progress bars comparing input parameters to median target ranges).
  - **Perturbation sensitivity** and **Global Feature Weights** toggleable tab charts.
- **Maharashtra Map**: Interactive SVG GIS layer displaying Soil Quality Index (SQI) and district chemistry averages on hover tooltip cards.

---

## 3. Judge Questions & Answers

### Q1: \"How does the frontend handle slow backend requests or timeouts?\"
*   **Answer**: \"The frontend implements a strict 12-second timeout using an `AbortController`. If the backend doesn't respond in time, the UI transitions to a clear timeout screen showing a 'Try Again' button, preventing page freezes.\"

### Q2: \"Is the Maharashtra Map displaying prediction outputs?\"
*   **Answer**: \"No. The map layer is strictly an analytics dashboard displaying regional soil health indicators from our 7.8-lakh records government database. The crop prediction engine is independent, evaluating only the 7 soil/weather features entered by the farmer.\"

### Q3: \"What is the Suitability Margin Gap?\"
*   **Answer**: \"It calculates the absolute difference between the top-1 and top-2 prediction probabilities. A high gap indicates a strong model consensus; a low gap warns the farmer that multiple crops are highly competitive for their soil profile.\"
