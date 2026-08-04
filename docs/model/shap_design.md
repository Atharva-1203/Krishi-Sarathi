# SHAP Explainability Design

This document maps explainability configurations for the project stakeholders.

## 1. Explainability Roles

### A. Farmers
- **Display**: Plain-text crop feedback.
- **Explainability**: SHAP Local Force Plots are parsed by a Natural Language Generator (NLG):
  - *Positive influence*: *"Sugarcane is recommended because of your district's abundant rainfall."*
  - *Negative influence*: *"Wheat is not recommended because your Nitrogen level is below optimal requirements."*

### B. Judges & Researchers
- **Display**: SHAP waterfall plots and global summary beeswarm plots.
- **Explainability**: Demonstrates the global features driving recommendations across Western Maharashtra.

### C. Developers
- **Display**: SHAP dependence plots.
- **Explainability**: Analyzes feature interactions (e.g. how pH interacts with different soil colors).
