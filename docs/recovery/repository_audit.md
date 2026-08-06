# Repository Forensic Audit Report (Phase 7.0 Rescue)

This report captures the structural layout, prediction dependency flows, and dead code verification status of the Krishi Sarathi repository.

---

## 1. Prediction Flow Dependency Graph
```
[React Frontend Form]
       ↓ (POST API payload query)
[FastAPI /api/v1/predict]
       ↓ (Validates schemas/request.py schema)
[PredictionService.predict_single]
       ↓
       ├─→ [ModelLoader (app/ml/model_loader.py)] (loads RandomForest/preprocessor binaries)
       ├─→ [NPK, Weather, Ratio Feature Engineering]
       ├─→ [SHAP Engine (app/ml/shap_engine.py)] (SHAP explainability)
       ├─→ [Agronomic Validator (app/services/prediction_service.py limits)]
       ├─→ [Regional Validator (Expected Crops limits)]
       ├─→ [Risk Scorer & Concurrency Tracer]
       ↓ (Consistency Assertion & Mutual Exclusivity Filter)
[PredictResponse serialization (schemas/response.py)]
       ↓ (HTTP Response)
[React ResultsDisplay components rendering]
```

---

## 2. Technical Debt Verification

### Dead Code & Duplicate Logic Status:
- **`backend/app/models/prediction_engine.py`**: Identified as obsolete dead code (redundant prediction class `KrishiSarathiPredictionEngine`). **DELETED**.
- **`backend/app/utils/`**: Confirmed empty. No duplicate utility libraries are present.
- **Model Loaders**: Confirmed that only `backend/app/ml/model_loader.py` is used by the FastAPI routing layer. No duplicate unpickling pipelines exist.
- **Preprocessor Pipelines**: Confirmed that only `KrishiSarathiPreprocessor` is used for inference feature scaling.

---

## 3. Conclusion
The repository has been pruned of its main duplicate codebase. The backend prediction service is now the single source of truth for crop recommendation metrics.
