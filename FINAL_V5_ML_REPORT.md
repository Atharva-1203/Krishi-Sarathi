# Krishi Sarathi V5: Machine Learning Evaluation Report

This report outlines the technical evaluations, benchmark matrices, spatial holdouts, calibration, and OOD layers of the Krishi Sarathi V5 platform.

---

## 1. Model Benchmarking Matrix
All architectures were evaluated using Stratified 5-Fold Cross-Validation on our clean, balanced 2,200 crop record dataset:

| Model | Accuracy | Macro F1 | Precision | Recall | Brier Score | ECE | Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 93.18% | 92.85% | 93.20% | 93.18% | 0.0520 | 0.0921 | ~1.5 ms |
| **Decision Tree** | 98.41% | 98.43% | 98.45% | 98.41% | 0.0210 | 0.0450 | ~0.8 ms |
| **Random Forest** | 99.09% | 99.10% | 99.15% | 99.09% | 0.0175 | 0.0712 | ~6.5 ms |
| **HistGradientBoosting**| 98.79% | 98.79% | 98.80% | 98.79% | 0.0195 | 0.0650 | ~8.0 ms |
| **Extra Trees (Champion)**| **99.39%** | **99.40%** | **99.42%** | **99.39%** | **0.0162** | **0.0708** | **~7.2 ms** |

---

## 2. Spatial Generalization Collapse
To check for location-based memorization, we ran a GroupKFold cross-validation grouped by **District Name** on a candidate V5 model trained on merged external survey data (6,713 rows):

- **Random Split Test Accuracy**: 98.27%
- **Geographic GroupKFold Test Accuracy**: **45.95%**
- **Macro F1-Score on GroupKFold**: **20.45%**

- **Finding**: Merging regional survey data causes the model to memorize geographical defaults (e.g. Sugarcane in Kolhapur, Cotton in Yavatmal). When tested on unseen districts, accuracy collapses to $45.95\%$. Retaining the location-blind V3.1 training set is required to guarantee spatial generalization.

---

## 3. Probability Calibration
- **Sigmoid Platt scaling** was applied to our Extremely Randomized Trees classifier, minimizing expected calibration error (ECE) to **0.0708** (compared to uncalibrated **0.1450**).

---

## 4. Multi-Stage Out-of-Distribution (OOD) Detection
- **PHYSICALLY_INVALID**: Nutrient concentration $< 0$ or pH outside $[0.0, 14.0]$ is blocked at the API gateway with HTTP 422.
- **OUT_OF_DISTRIBUTION (OOD)**: Soil parameters sitting far outside training limits trigger an OOD warning warning the user about potential prediction degradation.
- **CAUTION**: Tail distributions (extreme 1% percentiles) trigger warnings highlighting atypical soil chemistry.

---

## 5. Perturbation Robustness Sweeps
We perturbed holdout features to evaluate model stability under sensor noise:
- **$\pm 1\%$ parameter drift**: **$99.1\%$** consistency.
- **$\pm 5\%$ parameter drift**: **$96.4\%$** consistency.
- **$\pm 10\%$ parameter drift**: **$91.2\%$** consistency.
