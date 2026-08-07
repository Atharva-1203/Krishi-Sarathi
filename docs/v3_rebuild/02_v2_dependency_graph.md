# V3 Rebuild: 02 V2 Dependency Graph

This document details the dependency graph and pipeline trace of the V2 prediction engine.

## 1. Flowchart of the Prediction Pipeline

```mermaid
graph TD
    subgraph Frontend (Next.js)
        UI[PredictionDashboard.tsx] -->|POST JSON payload| API_CALL
        UI -->|Renders output| RES[ResultsDisplay.tsx]
    end

    subgraph API Route (FastAPI)
        API_CALL -->|/api/v1/predict| ROUTER[predict.py Router]
        ROUTER -->|Validates schemas/request.py| REQ_VAL[PredictRequest]
    end

    subgraph Business Logic Layer
        REQ_VAL -->|Calls predict_single| SERV[PredictionService.py]
        SERV -->|Extracts query dict| FB[SharedFeatureBuilder.py]
        FB -->|Extracts raw 7 columns| DF_Q[pd.DataFrame]
    end

    subgraph ML Pipeline & Storage
        DF_Q -->|Aligns order| ML_LOADER[model_loader.py]
        ML_LOADER -->|Reads path from Config| CONFIG[config.py BASE_DIR]
        ML_LOADER -->|Loads standard scaler| PREP_PKL[preprocessor.pkl]
        ML_LOADER -->|Loads model| MOD_PKL[model.pkl]
        ML_LOADER -->|Loads label encoder| LE_PKL[label_encoder.pkl]
        ML_LOADER -->|Loads feature order| FEAT_ORDER[feature_order.json]
        
        PREP_PKL -->|Applies transform| SCALED_X[Scaled X_query]
        MOD_PKL -->|Runs predict_proba| PROBA[Probabilities]
    end

    subgraph Explainability & Fusion
        SCALED_X -->|Computes SHAP| SHAP[shap_engine.py]
        SHAP -->|Constructs text| EXP_SERV[explanation_service.py]
        
        PROBA -->|Fuses with crop limits| FUSION[Three-Layer Decision Fusion]
        FUSION -->|Runs 5 perturbation checks| PERTURB[Perturbation Stability Index]
        
        EXP_SERV -->|Final JSON| API_RES[PredictResponse]
        PERTURB -->|Final JSON| API_RES
        API_RES -->|HTTP 200 OK| RES
    end
```

## 2. Key Codebase Dependencies
*   **`backend/app/api/routes/predict.py`**
    *   Imports: `backend/app/schemas/request.py`, `backend/app/schemas/response.py`, `backend/app/services/prediction_service.py`, `backend/app/ml/model_loader.py`, `backend/app/exceptions/custom_exceptions.py`
*   **`backend/app/services/prediction_service.py`**
    *   Imports: `backend/app/ml/model_loader.py`, `backend/app/ml/shap_engine.py`, `backend/app/core/constants.py`, `backend/app/services/explanation_service.py`, `ml/preprocessing/shared_feature_builder.py`
*   **`backend/app/ml/shap_engine.py`**
    *   Imports: `backend/app/ml/model_loader.py`
*   **`backend/app/ml/model_loader.py`**
    *   Imports: `backend/app/core/config.py`, `backend/app/core/logging.py`
