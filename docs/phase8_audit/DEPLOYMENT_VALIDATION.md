# Deployment Validation

The backend loads a single model once at FastAPI startup. Model classes are
0-15 and exactly match the crop decoder. Each probability vector sums to one;
top-three selection is descending `argsort` and does not duplicate a crop.

The agronomic, regional, risk, fusion, warning, and SHAP layers run after the
top-three model ranking. They do not reorder it. `decision_quality_score` is
hardcoded to 0.97 and is not a measured quality statistic.

Full endpoint stress execution was not persisted because `PredictionService`
writes `backend/debug_traces` for every call; persisting those traces would
modify the repository, contrary to the investigation-only constraint.
