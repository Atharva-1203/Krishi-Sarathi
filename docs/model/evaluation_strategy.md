# ML Evaluation Strategy

This document outlines the evaluation strategy used to assess model performance.

## 1. Cross-Validation and Splits
- **Training Set (3,611 rows)**: Subject to **Stratified 5-Fold Cross Validation** during hyperparameter search.
- **Hold-out Validation Set (451 rows)**: Used as an early-stopping dataset during gradient boosting iterations.
- **Final Test Set (451 rows)**: Held out and only evaluated once to run final metrics before release.

## 2. Evaluation Metrics

1. **Top-3 Accuracy**:
   - *Logic*: A prediction is correct if the true crop is in the model's top 3 predicted classes.
   - *Justification*: Aligns perfectly with the primary objective of recommending the top 3 crops.
2. **F1-Score (Macro)**:
   - *Justification*: Evaluates average performance across all crop classes, preventing minority classes (like Masoor) from being ignored.
3. **Log Loss**:
   - *Justification*: Evaluates probability calibration, ensuring the model's confidence scores are statistically reliable.
4. **Confusion Matrix**:
   - *Justification*: Isolates misclassification patterns between crops.
