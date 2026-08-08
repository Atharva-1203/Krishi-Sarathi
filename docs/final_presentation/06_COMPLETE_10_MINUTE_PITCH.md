# Krishi Sarathi: 10-Minute Technical Pitch Script

This script provides an in-depth, structured 10-minute pitch for technical judging panels, highlighting architecture, ML evaluations, and safety design.

---

### Slide 1: Introduction & Problem (1:00)
- **Concept**: Crop failures and low productivity caused by unscientific, habitual crop selection.
- ** agronomic complexity**: Selecting crops requires matching soil chemistry ($N, P, K, \text{pH}$) and micro-climate ($\text{temp}, \text{humidity}, \text{rainfall}$).
- **The solution**: Krishi Sarathi, a calibrated machine learning decision support system.

### Slide 2: Decoupled Architecture (1:00)
- **Core Principle**: Decoupling Crop Prediction from GIS Analytics.
- **Why?** Legacy crop recommendation engines suffered from sugarcane/monoculture bias. By feeding district or coordinates into the model, the model memorized geographic defaults.
- **Architectural Separation**:
  - *Crop Predictor*: Only 7 agronomic inputs. 100% geography-blind.
  - *GIS Map*: Contextual soil health card averages (779,144 records). Cannot alter prediction probability vectors.

### Slide 3: Dataset, Preprocessing, & EDA (1:30)
- **Data Volume**: 2,200 rows, perfectly balanced (100 samples per crop class) across 22 crop classes.
- **Preprocessing**: MinMax scaling maps features to a uniform range $[0, 1]$, protecting model weights from scale bias.
- **EDA Insights**: Strong correlation between Phosphorus (P) and Potassium (K) matches specific agronomic clusters (e.g. Grapes and Apples).

### Slide 4: Champion Model Selection (1:30)
- **Benchmarks**: Evaluated Logistic Regression, Decision Trees, Random Forests, and ExtraTrees.
- **Why ExtraTrees?** ExtraTrees Classifier randomizes node splitting thresholds rather than searching for the most discriminative threshold. This acts as a regularizer, producing smoother decision boundaries and lower generalization variance.
- **Validation Metrics**: Accuracy = 99.39%, Macro-F1 = 99.40%.

### Slide 5: Calibration & Safety Gate (1:30)
- **Calibrated Probabilities**: Fitted using Platt scaling to output true agronomic suitability probabilities instead of simple classifier vote fractions. FastAPI router verifies probability vector sums to $1.0 \pm 10^{-6}$.
- **OOD Safety Gates**: Rejects impossible inputs (e.g., negative rainfall or pH out of 0-14) using a validation layer, returning a clean 422 HTTP response rather than allowing the model to make undefined predictions.

### Slide 6: Explainability Layer (1:30)
- **Local Scorecard Suite**: Compares user input features against the historical medians of the recommended crop. Features with low compatibility are highlighted as limiting parameters.
- **Local Sensitivity**: Perturbs inputs by $\pm5\%$ to test stability.
- **Global Feature Weights**: Displays model Gini importances side-by-side with local explanations.

### Slide 7: Live Technical Demo (1:00)
- **Scenario A**: High nitrogen and high water query resulting in calibrated Rice prediction. Show scorecard progress bars.
- **Scenario B**: Acidic, low-nutrient query resulting in out-of-scope rejection. Demonstrates safety boundaries in real-time.

### Slide 8: Future Work & Conclusion (1:00)
- **Limitations**: Crops recommended are suitability indices; they do not factor in market prices or water source costs.
- **Round-2 Roadmap**: Scale to 100,000+ samples, integrate weather forecasts and satellite NDVI tracking, and build crop disease regression classifiers.
- **Verdict**: A scientifically defensible, decoupled decision engine built for maximum reliability.
