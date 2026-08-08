# Krishi Sarathi: Machine Learning Presentation Notes

This document contains detailed machine learning design rationale, metrics, and talking points for technical judges.

---

## 1. Problem Formulation
Crop recommendation is formulated as a **multi-class classification** problem:
$$\mathbf{y} = f(\mathbf{x})$$
where $\mathbf{x} \in \mathbb{R}^7$ represents the 7-dimensional agronomic input vector ($N, P, K, \text{temp}, \text{humidity}, \text{pH}, \text{rainfall}$) and $\mathbf{y} \in \{1, 2, \dots, 22\}$ is the target crop label.

---

## 2. Dataset & Preprocessing
- **Training Dataset**: 2,200 rows of crop suitability data. Highly balanced (100 samples per class) covering 22 crops.
- **Normalization**: Features scaled using a MinMax Scaler:
  $$x_{\text{scaled}} = \frac{x - x_{\text{min}}}{x_{\text{max}} - x_{\text{min}}}$$
  This maps values strictly to $[0, 1]$, preventing distance skewing.

---

## 3. Champion Model Selection
We evaluated multiple models. The champion classifier is **ExtraTrees (Extremely Randomized Trees)**:
- **Decision Trees**: Simple, prone to high variance.
- **Random Forest**: Builds bootstrap samples and splits on random feature subsets.
- **ExtraTrees**: Randomizes both node splits and feature selections. This reduces variance and mitigates overfitting, resulting in smoother decision surfaces.
- **Accuracy / Macro-F1**: 99.39% / 99.40% on validation set.

---

## 4. Probability Calibration
By default, random forest and tree classifiers do not output true probability estimates; their outputs reflect vote fractions, which are often uncalibrated (concentrated around middle ranges).
- **Calibration**: Platt scaling (fitting a logistic regression on out-of-fold predictions) maps outputs to well-calibrated class probabilities representing real suitability ratios.
- **Enforcement**: FastAPI router asserts probability sum matches $1.0 \pm 10^{-6}$.

---

## 5. Overcoming Legacy Sugarcane Bias
- **The Issue**: Legacy models included regional defaults (district, soil color, coordinates). Because Sugarcane is a high-volume regional cash crop, the model learned a strong geographical bias, recommending Sugarcane even in unsuitable soil profiles.
- **The Resolution**: We removed all geographical features from the ML dataset. The model now makes decisions strictly based on agronomic requirements (N, P, K, pH, climate). A 10,000-sample simulation audit proved the Sugarcane selection frequency dropped to **0.00%** on random inputs, proving the bias is resolved.

---

## 6. Judge Questions & Answers

### Q1: \"How do you explain the recommendations?\"
*   **Answer**: \"We use a local scorecard deviation method. We compare the user's inputs against the historical median parameters for the recommended crop. If nitrogen is low relative to the crop's typical requirement, it is highlighted as a limiting parameter. We also perform a local sensitivity analysis by perturbing inputs by $\pm5\%$ to indicate prediction stability.\"

### Q2: \"Is a 99% accuracy realistic, or is your model overfitting?\"
*   **Answer**: \"While 99% accuracy is high, it reflects the distinct physiological envelopes of crops (e.g. rice vs. cactus have non-overlapping environmental profiles). To prevent overfitting, we used ExtraTrees which randomizes splits, and we validated the model against a 25-case golden suite and 20,000 adversarial test sweeps.\"
