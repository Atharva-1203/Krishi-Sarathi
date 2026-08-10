# Judge Defense Q&A (V5 Final Evolution)

This document prepares the team for final-round judge questioning.

---

## 1. Questions on Dataset Scale

### Q1: "Why is your training set only 2,200 rows when you have 7.9 lakh government cards?"
- **Answer**: *"The 7.9 lakh government Soil Health Card database contains soil diagnostics but lacks crop labels. Trying to join crop outcomes using district-level averages commits an ecological fallacy and introduces location leakage. We chose to keep our crop predictor trained on a clean, balanced agricultural dataset to preserve generalization, and utilized the 7.8 lakh records to build our decoupled Maharashtra GIS Map observatory."*

### Q2: "Why didn't you use semi-supervised learning or clustering to label the cards?"
- **Answer**: *"Semi-supervised labeling assumes the feature distributions of the 2,200 rows map directly to the 7.9L database. However, the 7.9L database contains severe regional skews (e.g. western sugarcane concentration). Semi-supervised labeling would transfer these frequency-driven biases directly into the predictor, causing it to default to regional crops instead of evaluating pure soil suitability."*

---

## 2. Questions on Spatial Leakage & Generalization

### Q3: "How do you prove your model generalizes to new geographic areas?"
- **Answer**: *"Our predictor contract is location-blind. It has no variables for coordinates, district name, or division. Node splits in our Extremely Randomized Trees (ExtraTrees) classifier are based strictly on agronomic parameters ($N, P, K$, pH, moisture). This ensures a farm is recommended sugarcane only when its exact soil chemistry requirements are met, rather than defaulting because the farm is located in Pune. GroupKFold cross-validation grouped by District name proves that our model Generalization accuracy is 97.80%."*

### Q4: "Why did the candidate model trained on merged datasets collapse on spatial holdouts?"
- **Answer**: *"The merged candidate model collapsed to 45.95% spatial accuracy because it learned location-based crop associations from skewed district data. When a district was held out entirely, the model could not evaluate suitability for regional crop varieties it had only seen coupled with specific location variables."*
