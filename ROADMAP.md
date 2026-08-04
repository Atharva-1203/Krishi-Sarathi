# Krishi Sarathi Project Roadmap

This document outlines the milestones for building and deploying the explainable crop recommendation platform.

---

## 🗺️ Project Milestones

### Milestone 1: Repository Engineering (Current)
- [x] Audit legacy repository (288 files mapped)
- [x] Establish Git-ready directory structure
- [x] Configure issue templates, codeowners, and pull request rules
- [x] Set Git LFS storage guidelines

### Milestone 2: Data Engineering & Standardization
- [ ] Run spelling standardization engines for district/taluka keys
- [ ] Impute missing nutrient values using localized taluka medians
- [ ] Implement coordinates filtering for state boundary points

### Milestone 3: Feature Engineering
- [ ] Scale and normalize N, P, K, and pH variables
- [ ] Perform log-transformations for Electrical Conductivity (EC)
- [ ] Encode district/taluka target features and growing seasons
- [ ] Cluster geographic coordinates using spatial algorithms

### Milestone 4: Machine Learning Core
- [ ] Train XGBoost, LightGBM, and CatBoost multiclass classifiers
- [ ] Tune hyperparameters using stratified K-Fold cross-validation
- [ ] Evaluate performance metrics (F1-score, LogLoss, Confusion Matrix)

### Milestone 5: Explainable AI (XAI)
- [ ] Integrate SHAP (SHapley Additive exPlanations)
- [ ] Compute local force plots for individual farm recommendations
- [ ] Compute global feature importances for regional agriculture planning

### Milestone 6: Backend Development
- [ ] Build FastAPI server with prediction and explainability endpoints
- [ ] Implement caching layer for fast geospatial queries

### Milestone 7: Frontend Visualization
- [ ] Design React/Next.js client interface
- [ ] Integrate interactive maps showing soil health distributions

### Milestone 8: Deployment
- [ ] Containerize applications using Docker
- [ ] Deploy server and frontend to public cloud infrastructure
