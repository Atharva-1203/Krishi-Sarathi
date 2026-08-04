# Experiment Management Workflow

This document details the naming conventions and approval workflow for ML modeling experiments.

## 1. Experiment Workflow
1. **Define Hypothesis**: Document target features and hyperparameters in `experiment_tracking.md`.
2. **Execute training script** with output logging under `experiments/experiment_XXX/`.
3. **Audit metrics**: Check if F1-macro and Top-3 accuracy exceed production baseline targets.
4. **Approve & Register**: Move model binary to `ml/models/candidate_models/` and update metadata.

## 2. Naming Conventions
- Folder name: `experiment_XXX` (sequential 3-digit tracking).
- Run ID: `EXP_XXX_[MODEL_TYPE]` (e.g. `EXP_003_CATBOOST`).
