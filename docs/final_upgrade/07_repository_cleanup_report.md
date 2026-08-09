# Krishi Sarathi: Repository Cleanup Report

This report documents the verification, archiving, and cleanup of files in the repository.

---

## 1. Archiving Summary
To prevent compilation conflicts and model mismatches:
- **Legacy ML Pipelines**: Moved to `docs/archive/` (such as `Krishi_Sarathi_ML_Pipeline.ipynb`).
- **Obsolete Pickles**: Archived legacy V2 models (`label_encoder.pkl`, `legacy/model.pkl`, `legacy/preprocessor.pkl`).

---

## 2. Removed Items (Caches & Logs)
We cleared transient local cache files to keep the repository clean for git tracking:
- **Python Caches**: `__pycache__/` and `.pytest_cache/` directories.
- **Next.js Caches**: `.next/` build artifacts (regenerated dynamically during build phase).
- **Temporary logs**: CatBoost training telemetry folders (`catboost_info/`) and scratch debug files.

---

## 3. Retained Core Assets
The following directories remain active and protected:
- `backend/app/ml/v3/`: Contains the active inference code (`predictor.py`, `feature_contract.py`, `validator.py`, `profile_matcher.py`).
- `ml/models/v3/`: Contains the active calibrated ExtraTrees model checkpoint (`model.pkl`, `preprocessor.pkl`, `metadata.json`).
- `frontend/src/`: Core Next.js React 19 visual component layouts.
- `frontend/public/maps/`: Decoupled GIS soil database JSON averages for Maharashtra map representation.
