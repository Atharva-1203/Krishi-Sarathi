# Experiment Log Template

Use this template to document every model training run.

```markdown
## Experiment ID: EXP_XXX
- **Date**: YYYY-MM-DD
- **Model Type**: [CatBoost / LightGBM / Random Forest]
- **Dataset version**: `datasets/final/master_dataset.csv`
- **Features Used**: [Mandatory / All / Ratios Included]

### Hyperparameters
- Learning Rate:
- Depth:
- L2 Reg:

### Metrics
- Accuracy (Train/Test):
- F1-Score (Macro):
- Top-3 Accuracy:
- LogLoss:

### Decisions & Notes
- [Approved / Discarded / Fallback]
- Explanation of changes.
```
