# Hyperparameter Strategy

This document details the hyperparameter search grids for the candidate models.

## 1. CatBoost Classifier Grid
- `iterations`: [500, 1000, 1500, 2000] (number of trees)
- `learning_rate`: [0.01, 0.03, 0.05, 0.1, 0.2]
- `depth`: [4, 6, 8, 10]
- `l2_leaf_reg`: [1, 3, 5, 7, 10]
- `early_stopping_rounds`: [50] (to prevent overfitting using validation set)

## 2. LightGBM Grid
- `n_estimators`: [100, 500, 1000, 1500]
- `learning_rate`: [0.01, 0.05, 0.1, 0.2]
- `num_leaves`: [15, 31, 63, 127]
- `max_depth`: [-1, 4, 6, 8, 10]
- `subsample`: [0.7, 0.8, 0.9, 1.0]

## 3. Search Method
- Use **RandomizedSearchCV** or **Optuna** over 50 trials to identify the optimal configuration.
