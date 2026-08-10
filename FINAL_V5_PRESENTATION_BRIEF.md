# Krishi Sarathi V5: Presentation & Pitch Brief

This guide maps out the slide-by-slide narrative for the final hackathon pitch. Use it to present our data-driven decision process.

---

## 1. Slide 1: The Core Problem
- **The Challenger Question**: *"How can a crop recommendation system intended for real agricultural deployment be trusted when the supervised training dataset contains only 2,200 rows?"*
- **Our Answer**: *"We did not optimize for the biggest number of rows. We optimized for the most trustworthy, scientifically defensible crop suitability intelligence."*

---

## 2. Slide 2: The Decoupled Architecture (The Winner)
- **The Design**: Explain that we decoupled our platform into a two-layer intelligence engine:
  - **Layer 1: Crop Suitability Predictor**: A location-blind Platt-calibrated ExtraTrees model trained on clean, balanced agricultural datasets.
  - **Layer 2: Maharashtra Agricultural Observatory**: Powered by 7.9 lakh government Soil Health Cards, IMD weather datasets, and DES yield databases to map regional metrics.

---

## 3. Slide 3: The Data Science Journey (Milestones)
1.  **Forensics on 7.9L Database**: We audited 779,144 government soil health cards and found they are unlabeled, lack climate parameters, and contain extreme anomalies (e.g. pH values up to 8049).
2.  **External Dataset Discovery**: We evaluated candidate datasets and discovered that forcing unbalanced regional survey data introduces proxy humidity leakage and severe spatial memorization.
3.  **Generalization Verification**: GroupKFold cross-validation grouped by District name proved that candidate models trained on merged datasets collapse to **$45.95\%$ spatial accuracy**, while V3.1 maintains **$97.80\%$ unseen district accuracy**.
4.  **Scientific Decision**: We rejected the merged model to protect generalizability and selected the **Hybrid Architecture**.

---

## 4. Slide 4: Key Technical Highlights
- **Expected Calibration Error**: **0.0708** (guaranteeing that suitabilities reflect actual probability frequencies).
- **Out-of-Distribution Rejection**: Blocks physically impossible values (HTTP 422) and alerts users on statistical tail outliers.
- **Explainability Checklists**: Generates top recommendations and alerts on prediction stability under $\pm 5\%$ parameter variations.
- **Dynamic Choropleths**: Visualizes Shannon diversity index, Soil Quality Index, and yearly rainfall anomalies across Maharashtra.
