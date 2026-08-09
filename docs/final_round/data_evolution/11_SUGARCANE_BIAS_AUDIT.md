# Krishi Sarathi: Sugarcane Bias & Dominance Audit

This report evaluates the risk of re-introducing sugarcane default bias into the prediction engine.

---

## 1. Sugarcane Profile in Raw Data
In the 4,513-row dataset:
- **Sugarcane Count**: 1,010 records (22.38% of the total dataset).
- **Physical Bounds**:
  - Nitrogen: min=75, max=150
  - pH: min=6.0, max=8.5
  - Rainfall: min=700mm, max=1500mm

---

## 2. Simulated Dominance Test
We ran Monte Carlo simulation sweeps on a model trained on the raw `crop_fertilizer_dataset_raw.csv`:
- **Top-1 Sugarcane Recommendation Rate**: **24.50%** on random inputs.
- **Why it happens**: Due to the severe class imbalance, decision trees create wide leaf partitions for sugarcane, capturing a disproportionate share of continuous soil space.

---

## 3. Red-Team Verdict
Blindly integrating the 7.9L government database or the 4,513 raw crop dataset directly into the training corpus will **destroy the model's calibration** and re-introduce the legacy Sugarcane bias bug. 

To maintain unbiased recommendations, the prediction engine must remain trained on balanced crop profiles (V3.1 baseline).
