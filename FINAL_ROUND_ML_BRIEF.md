# Krishi Sarathi: Final Round ML Brief (Presentation & Judge Q&A Guide)

This document is a beginner-friendly guide summarizing the agricultural machine learning and data evolution story of Krishi Sarathi. Use this to prepare for pitch presentation slides and judge questioning.

---

## 1. The Core ML Pitch (In 3 Sentences)
- **What is Krishi Sarathi?**: A crop recommendation and agricultural decision-support platform.
- **The Core ML Innovation**: We strictly decouple **universal agronomic crop prediction** (which is location-blind and bias-free) from **Maharashtra regional agricultural intelligence** (which processes approximately 7.8 lakh government Soil Health Cards).
- **The Technical Advantage**: Our predictor evaluates continuous soil chemistry through a Platt-calibrated ExtraTrees model with built-in Out-of-Distribution (OOD) protection, while our GIS Map independently maps regional crop diversity, rainfall anomalies, and soil indices.

---

## 2. The Evolution Story (Slide Narrative)
1.  **V1 / V2 (The Legacy Prototypes)**: Legacy classifiers included geographical features (like District names and coordinates) in model training. This caused spatial leakage—the model memorized administrative boundaries and defaults (such as western districts cultivating sugarcane) instead of evaluating soil suitability, leading to high default crop bias.
2.  **V3.1 (The Calibrated Champion)**: We stripped all location parameters from model training. The prediction engine is geography-blind, trained on a balanced 2,200 crop record dataset.
3.  **V4 Data Feasibility Phase**: We audited approximately 7.9 lakh government Soil Health Cards. We discovered that this database is unlabelled, lacks climate parameters, and contains extreme outliers (e.g. pH up to 8049).
4.  **The Decoupled Architecture**: Instead of forcing raw soil records into training and introducing sugarcane defaults, we decoupled the architecture. The Crop Predictor remains trained on the clean, balanced dataset, while the 7.8 lakh records power the dynamic GIS map observatory, district rankings, and crop diversity indexes (Shannon entropy).

---

## 3. Anticipated Judge Questions & Defensible Answers

### Q1: "Why is your training dataset only 2,200 rows when you have 7.9 lakh government records?"
- **Answer**: *"The 7.9 lakh government Soil Health Card database contains raw soil chemistry readings but lacks target crop recommendation labels and climate parameters (temperature, humidity, rainfall). Trying to join crop outcomes using district-level averages commits an ecological fallacy and introduces location leakage. We chose to keep our crop predictor trained on a clean, balanced agricultural dataset to preserve generalization, and utilized the 7.8 lakh records to build our decoupled Maharashtra GIS map observatory."*

### Q2: "How do you prevent sugarcane dominance or regional defaults in predictions?"
- **Answer**: *"Our predictor contract is location-blind. It has no variables for coordinates, district name, or division. Node splits in our Extremely Randomized Trees (ExtraTrees) classifier are based strictly on agronomic parameters ($N, P, K$, pH, moisture). This ensures a farm is recommended sugarcane only when its exact soil chemistry requirements are met, rather than defaulting because the farm is located in Pune."*

### Q3: "What happens when a farmer enters impossible or anomalous values?"
- **Answer**: *"We have implemented a multi-stage Out-of-Distribution (OOD) scanner. Inputs are evaluated against training distribution bounds. Standard parameters map normally; tail parameters trigger a CAUTION warning. Values exceeding physical scales (such as pH of 15.0 or negative nitrogen values) are blocked at the API gateway with HTTP 422 to prevent model hallucinations."*

### Q4: "Why did you choose ExtraTrees over standard Random Forests or Neural Networks?"
- **Answer**: *"ExtraTrees selects split thresholds randomly rather than searching for the most discriminative threshold. This stronger randomization acts as a regularizer, preventing overfitting on continuous soil parameters. Additionally, when combined with Sigmoid Platt Scaling, ExtraTrees yields the lowest multi-class Brier score (0.0162) and calibration error (0.0708), providing highly reliable probabilities."*
