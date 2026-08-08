# Krishi Sarathi: Complete 5-Minute Hackathon Pitch Script

This script provides a timed, high-impact presentation structure for the final judging round.

---

### ⏱️ [0:00 - 0:30] The Problem: Blind Agriculture
> "Judges, agriculture is facing a quiet crisis. Every day, millions of farmers select crops based on tradition, hearsay, or regional defaults. The result? Suboptimal yields, rapid soil depletion, and devastating crop failures. Agronomic decisions are complex. A farmer cannot mentally calculate how a slightly acidic pH, low phosphorus, and moderate rainfall interact to impact crop health. We need a system that translates soil test cards and climate patterns into precise crop recommendations."

### ⏱️ [0:30 - 1:00] The Solution: Krishi Sarathi
> "We built **Krishi Sarathi**—an AI-powered Crop Recommendation and Agricultural Intelligence platform. Krishi Sarathi takes 7 parameters: Nitrogen, Phosphorus, Potassium, pH, Temperature, Humidity, and Rainfall. By passing these through a calibrated ExtraTrees machine learning classifier, we recommend the top 5 most suitable crops, explain why they fit, highlight limiting factors, and show prediction stability. It is not just prediction; it is explainable decision support."

### ⏱️ [1:00 - 2:00] The Engine: Calibrated ML & Decoupling
> "Our core prediction engine is built on a clean, balanced dataset of 22 crop classes. The model achieves **99.39% accuracy** and a **99.40% Macro-F1 score**. But accuracy is meaningless if a model is biased. Legacy models suffered from severe 'sugarcane bias'—over-recommending cash crops because of regional settings. We fixed this structurally by removing all geographical features (like districts or coordinates) from the model training pipeline. The model now judges crops strictly on agronomy. A 10,000-sample audit verified that sugarcane bias was reduced to 0.00% under random soil queries."

### ⏱️ [2:00 - 2:45] Explainability & Safety
> "When a farmer enters their soil details, we don't just give them a single output. We show them a **Suitability Margin Gap** indicating prediction consensus. We display a **Parameter Fit Alignment** progress bar, showing exactly how their soil compares to the optimal requirements of the crop. And if a user enters impossible or out-of-distribution values—like a pH of 2 or negative rainfall—our validation security layer catches the input and flags it before it can corrupt the model or freeze the UI."

### ⏱️ [2:45 - 3:30] Maharashtra GIS Analytics
> "Beside the crop predictor, we built the Maharashtra Agricultural Intelligence Map. Powered by a database of **779,144 official government soil cards**, it calculates a Soil Quality Index (SQI) across 32 districts. This map provides a macro-view of soil depletion for agricultural planners. Crucially, this map is completely decoupled from the prediction engine, ensuring regional trends do not bias individual recommendations."

### ⏱️ [3:30 - 4:15] Live Demo Walkthrough
> "Let's look at a live example. We input high nitrogen, moderate pH, and high rainfall. The engine instantly recommends **Rice** with 89% probability. The dashboard shows a 'High Margin' confidence gap, and highlights that potassium is the main limiting factor. Next, we input an extreme pH of 2.0. The safety gate immediately triggers, displaying an 'Input Outside Prediction Scope' warning with valid bounds, preventing a crash."

### ⏱️ [4:15 - 5:00] Impact & Future Roadmap
> "Krishi Sarathi provides farmers with scientifically defensible recommendations. In our Round-2 roadmap, we plan to scale to 100,000+ data points, integrate real-time weather API telemetry, and introduce leaf-index NDVI satellite analysis for early disease detection. Krishi Sarathi is here to take the guesswork out of farming. Thank you, and we are open for questions."
