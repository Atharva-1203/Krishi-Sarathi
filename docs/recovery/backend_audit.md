# Backend Architecture Audit & Verification (Phase 7.0)

Certification of backend pipeline unity and single source of truth routing.

---

## 1. Unified Prediction Pipeline
The API prediction service maps all incoming farmer requests strictly through `PredictionService.predict_single` in `backend/app/services/prediction_service.py`.

- **No duplicate routes**: Checked `backend/app/api/routes/predict.py`. It imports and calls only `PredictionService.predict_single`.
- **Zero independent calculations**: No routing controllers, request serializers, or response handlers run their own agronomic checks or confidence scoring logic.

---

## 2. Preprocessor Instance Verification
Only `model_loader.preprocessor` (which is an instance of `KrishiSarathiPreprocessor`) loaded during startup parses input arrays.
There are no other preprocessor objects, scaling configurations, or median lookup dictionaries in active use.

---

## 3. Single Canonical Decision Object
The response returned by `PredictionService.predict_single` strictly maps to `PredictResponse` pydantic model inside `backend/app/schemas/response.py`.
Every downstream client (Next.js components, history store, PDF/Twin certificates) receives this exact identical object.
No modules perform post-inference overrides.
