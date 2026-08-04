# Model Error Analysis Report

This report audits the classification failures of the production model `ExtraTrees`.

## 1. Class-wise Auditing
- Minor crops (like Masoor) exhibit slight recall deficits due to small data representation (12 samples).
- Grapes and Grains exhibit high classification fidelity (>95%) driven by unique soil pH and K signatures.
