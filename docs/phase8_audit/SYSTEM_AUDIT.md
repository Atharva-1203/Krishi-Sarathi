# System Audit

## Active execution path

`frontend/src/components/PredictionDashboard.tsx` posts the form payload to
`/api/v1/predict`. `backend/app/api/routes/predict.py` validates it with
`PredictRequest` and calls `PredictionService.predict_single`. The service
builds features, invokes `model_loader.preprocessor.transform`, invokes the
loaded RandomForest `predict_proba`, ranks the top three probabilities, and
then adds agronomic, regional, risk, fusion, SHAP, and response metadata.

```mermaid
flowchart LR
  Form --> PredictRequest --> PredictionService --> FeatureBuilder
  FeatureBuilder --> SerializedPreprocessor --> RandomForest --> Ranking
  Ranking --> AgronomyRiskSHAP --> JSON --> ResultsDisplay
```

## Active artifacts

The production loader reads `backend/app/models/model.pkl`. Its SHA-256 is
identical to `ml/models/production/model.pkl` and
`ml/models/random_forest/model.pkl`. It is a 100-tree scikit-learn
`RandomForestClassifier` with 37 input features and 16 classes.

## Non-active artifacts

The standalone `ml/inference/prediction_engine.py`, archived engines,
alternate model folders, experiment folders, preview application, and TODO
data scripts are not on the FastAPI prediction import path. YAML configuration
files are not consumed by the live request path. No files were deleted.
