# Krishi Sarathi: Repository Inventory & Audit

This document lists all active and historical files in the Krishi Sarathi repository. Files have been audited and classified according to their purpose.

## 1. Directory Structure Taxonomy

- **frontend/**: Next.js frontend application containing client UI, charts, and GIS map layers.
- **backend/**: FastAPI python server serving machine learning endpoints and validation checks.
- **ml/**: Core Machine Learning models, scaling parameters, profiles, and training data.
- **notebooks/**: Analytical presentation and exploratory data notebooks.
- **docs/**: Architectural maps, presentation notes, and audit validation briefs.
- **tests/**: Automated verification suite covering physical bounds and probability calibration.
- **scripts/**: System verification, simulation, and data generation tasks.
- **datasets/**: Historical Maharashtra governmental agricultural datasets.

## 2. File Inventory

| Path | Type | Purpose | Active? | Used By | Keep/Delete/Archive |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `requirements.txt` | ACTIVE | Project dependencies & configs | Yes | Build Environment | Keep |
| `backend/app/models/legacy/feature_order.json` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/label_encoder.pkl` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/metadata.json` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/model.pkl` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/model_card.md` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/prediction_engine.py` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/models/legacy/preprocessor.pkl` | ARCHIVE | Stale V2 prediction model assets | No | Historical Reference | Archive |
| `backend/app/api/router.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/health.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/metadata.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/model.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/predict.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/predict_v3.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/api/routes/version.py` | BACKEND | Router paths and API endpoints | Yes | FastAPI Server | Keep |
| `backend/app/core/config.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/core/constants.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/core/logging.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/exceptions/custom_exceptions.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/exceptions/handlers.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/schemas/errors.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/schemas/request.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/schemas/response.py` | BACKEND | Server configs, schemas, and handlers | Yes | FastAPI Server | Keep |
| `backend/app/ml/v3/crop_metadata.json` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/crop_profiles.json` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/feature_builder.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/feature_contract.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/model_registry.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/predictor.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/preprocessing.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/profile_matcher.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `backend/app/ml/v3/validator.py` | CORE ML | V3.1 core ML prediction & pipeline classes | Yes | FastAPI Backend | Keep |
| `ml/datasets/crop_recommendation.csv` | CORE ML | Training crop datasets | Yes | ML Pipelines | Keep |
| `ml/datasets/dataset_card.md` | CORE ML | Training crop datasets | Yes | ML Pipelines | Keep |
| `ml/datasets/v3/README.md` | CORE ML | Training crop datasets | Yes | ML Pipelines | Keep |
| `ml/datasets/v3/dataset.csv` | CORE ML | Training crop datasets | Yes | ML Pipelines | Keep |
| `ml/datasets/v3/dataset_card.md` | CORE ML | Training crop datasets | Yes | ML Pipelines | Keep |
| `ml/models/v3/crop_metadata.json` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3/crop_profiles.json` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3/metadata.json` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3/model.pkl` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3/model_card.md` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3/preprocessor.pkl` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `ml/models/v3_registry.json` | CORE ML | V3.1 ExtraTrees model & scaler pickles | Yes | FastAPI Backend | Keep |
| `docs/api/.gitkeep` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/.gitkeep` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/dataset_flow.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/ml_pipeline_architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/pipeline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/architecture/system_design.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/cleanup/dependency_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/cleanup/duplicate_file_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/cleanup/empty_folder_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/cleanup/repository_cleanup_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/cleanup/repository_size_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/.gitkeep` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/class_distribution.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/data_leakage_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/dataset_relationships.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/feature_engineering_plan.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/feature_registry.xlsx` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/feature_selection.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/feature_validation_report.xlsx` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/map_data_source.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/master_data_dictionary.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/master_dataset_catalog.xlsx` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/master_dataset_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/merge_pipeline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/missing_value_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/ml_dataset_schema.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/predict_input_schema.json` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/project_inventory.xlsx` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/spatial_feature_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/storage_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/synthetic_feature_review.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/datasets/temporal_feature_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/animation_guide.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/animation_guidelines.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/api_integration.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/component_catalog.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/component_library.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/deployment_guide.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/design_review_document.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/design_system.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/frontend_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/frontend_backend_contract.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/interaction_flow.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/localization_guide.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/map_architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/map_quality_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/performance_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/prediction_flow.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/release_notes_v1.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/screen_flow.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/system_integration.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/testing_checklist.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/ui_architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/design/wireframe_documentation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final/FINAL_V3_CERTIFICATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final/architecture_and_decoupling.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final/model_card_and_benchmarks.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final/sugarcane_bias_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final/verification_walkthrough.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/backend_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/data_inventory.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/frontend_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/map_data_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/ml_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/prediction_engine_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/repository_final_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/final_audit/sugarcane_bias_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics/agronomic_consistency_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics/dataset_forensics_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics/final_production_signoff.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics/probability_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics/recommendation_engine_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/HACKATHON_CERTIFICATION_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch01_dataset_integrity.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch02_class_imbalance.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch03_feature_leakage.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch05_prediction_diversity.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch10_lodo_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/ch15_edge_cases.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_3/executive_summary.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/PHASE6_5_EXECUTION_WALKTHROUGH.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/SYSTEM_CONSISTENCY_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/api_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/backend_consistency.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/confidence_engine.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/explanation_consistency.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/frontend_consistency.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/history_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/model_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/outlier_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/performance_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/pipeline_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/prediction_diversity.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/presentation_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/probability_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/recommendation_consistency.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/risk_engine.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/forensics_phase6_5/system_architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/master_handbook.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/.gitkeep` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/configuration_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/error_analysis_plan.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/error_handling.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/evaluation_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/expected_feature_importance.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/experiment_management.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/experiment_template.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/feature_engineering.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/feature_pipeline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/hyperparameter_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/inference_pipeline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/model_candidate_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/model_card.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/model_design.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/model_registry.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/model_selection_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/preprocessing_pipeline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/problem_formulation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/security_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/shap_design.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/shap_pipeline_design.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/versioning_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/model/xai_readiness.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/BUG_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/DEPLOYMENT_VALIDATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/FEATURE_CONTRACT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/FINAL_CERTIFICATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/FIX_PLAN.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/MODEL_VALIDATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/OUTLIER_ANALYSIS.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/PIPELINE_PARITY.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/ROOT_CAUSE.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/phase8_audit/SYSTEM_AUDIT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/SYSTEM_REBUILD_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/SYSTEM_RECOVERY_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/backend_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/code_refactor.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/consistency_rules.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/dataset_forensics.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/end_to_end_trace.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/failure_ledger.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/frontend_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/ml_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/outlier_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/performance.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/repository_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/scientific_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/testing.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/recovery/v2_v3_migration_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/.gitkeep` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/EDA_Report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/FINAL_MODEL_APPROVAL.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/GO_NO_GO_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/HACKATHON_READINESS_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/ML_READINESS_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/PHASE_5_6_IMPROVEMENT_PLAN.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/backend_verification_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/benchmark_summary.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/bhoomi_utilization_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/error_analysis_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/final_go_no_go.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/judge_review.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/leaderboard.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/model_robustness_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/model_validation_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/performance_targets.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/production_readiness.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/repository_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/soil_calibration_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/soil_feature_enhancement.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/reports/weather_gap_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/FINAL_ROOT_CAUSE_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/dataset_statistics.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/decision_path_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/irrigation_gap_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/label_quality_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/root_cause_analysis/sugarcane_profile.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_1/FINAL_HACKATHON_VALIDATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_1/architecture.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_1/baseline.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_1/upgrade_plan.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/00_repository_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/01_v2_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/01_v2_prediction_engine_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/02_v2_dependency_graph.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/03_existing_model_inventory.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/04_existing_dataset_inventory.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/04_feature_contract.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/05_existing_api_inventory.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/05_model_benchmark.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/06_existing_frontend_prediction_flow.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/06_sugarcane_bias_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/07_existing_prediction_artifacts.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/07_probability_calibration.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/08_ood_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/08_v2_failure_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/09_api_parity.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/09_v3_rebuild_strategy.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/10_golden_cases.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/11_perturbation_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/12_red_team_testing.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/13_frontend_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/14_map_separation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/15_final_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/FINAL_LOCAL_DEMO_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/FINAL_V3_CERTIFICATION.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/FINAL_V3_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/MODEL_LOADING_ROOT_CAUSE.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/api_parity.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/data_forensics.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/dataset_selection.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/legacy/README.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/model_benchmark.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/ood_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/perturbation_analysis.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/probability_calibration.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/red_team_report.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/v3_rebuild/sugarcane_bias_audit.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/FINAL_VALIDATION_REPORT.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/end_to_end_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/frontend_error_handling.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/input_domain.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/out_of_scope_handling.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/prediction_safety.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/red_team_results.json` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `docs/validation/red_team_validation.md` | DOCUMENTATION | Audit logs, design specs, and validation reports | Yes | Developers / Auditors | Keep |
| `ml/notebooks/.gitkeep` | DOCUMENTATION | Agronomic analysis & model training notebooks | Yes | Data Scientists / Judges | Keep |
| `notebooks/Krishi_Sarathi_ML_Pipeline.ipynb` | DOCUMENTATION | Agronomic analysis & model training notebooks | Yes | Data Scientists / Judges | Keep |
| `frontend/src/app/favicon.ico` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/app/globals.css` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/app/layout.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/app/page.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/AnalyticsPage.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/BackgroundEffects.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/CropExplorer.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/Header.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/InsightsPage.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/LandingPage.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/ModelTransparency.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/PredictionDashboard.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/ResultsDisplay.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/Sidebar.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/ThemeInitializer.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/DistrictPanel.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/DistrictTooltip.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/MaharashtraMap.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/MapLegend.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/SearchDistrict.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/components/maps/ZoomControls.tsx` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/store/language.ts` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/store/theme.ts` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `frontend/src/store/translations.ts` | FRONTEND | React UI pages, maps, and components | Yes | Next.js Web App | Keep |
| `scripts/.gitkeep` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/archive/.gitkeep` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/build_final_dataset.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/clean_data.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/diagnose_v3_model.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/download_data.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/generate_district_soil_data.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/generate_reports.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/merge_data.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/red_team_validation_v3_1.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/sugarcane_bias_simulator.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/system_health_check.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `scripts/verify_data.py` | GENERATED | Maintenance, simulations, and health checks | Yes | Developers / System Checks | Keep |
| `datasets/archive/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_pdfs/DISTRICTWISE APY-2021-22 (1).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/metadata_data_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/metadata_metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/metadata_soil_data_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/reports_merge_strategy.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/reports_project_relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/reports_quality_report.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/reports_soil_feature_engineering.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/archive/duplicate_reports/reports_soil_quality_report.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/administrative_units/data_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/administrative_units/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/administrative_units/relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/agro_ecology/feature_relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/agro_ecology/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/land_degradation/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/land_use/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/physiography/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/reports/feature_engineering.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/reports/project_relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/reports/quality_report.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/soils/feature_relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/soils/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/soils/soil_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/bhoomi_geoportal/watershed/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/rainfall/data_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/rainfall/merge_strategy.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/rainfall/metadata.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/rainfall/project_relevance.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/rainfall/quality_report.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/soil_health/merge_strategy.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/soil_health/soil_data_dictionary.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/soil_health/soil_feature_engineering.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/documentation/soil_health/soil_quality_report.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/master_dataset.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/master_dataset_v1.0.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/test.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/train.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/final/validation.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/integrated/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/integrated/integration_strategy.md` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/administrative_units/administrative_units.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/agro_ecology/agro_regions.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/agro_ecology/rainfall.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/agro_ecology/water_balance.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_degradation/erosion.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_degradation/risk_classes.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_degradation/salinity.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_use/crop_suitability.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_use/land_capability.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/land_use/management_units.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/physiography/landforms.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/physiography/terrain.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_capability.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_constraints.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_depth.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_mapping_units.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_texture.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/soils/soil_types.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/watershed/drainage.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/bhoomi/watershed/watersheds.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/district_season_rainfall.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/district_season_rainfall_cleaned.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/districts.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/rainfall_classification.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/rainfall/season_dictionary.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/soil_health/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/soil_health/soil_dataset_inventory.xlsx` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/processed/soil_health/soil_health_database.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/agriculture_statistics/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/agriculture_statistics/किमान_आधारभूत_किंमत_२०२२.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/bhoomi/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/01 राज्यस्तरीय पिकनिहाय पेरणी अहवाल दि 27_07_2026 अखेरचा (खरीप हंगाम-2026-27).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/02 जिल्हानिहाय एकूण पेरणी अहवाल दि 27_07_2026   अखेरचा (खरीप हंगाम-2026-27).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/03 जिल्हानिहाय पिकनिहाय पेरणी अहवाल अखेरचा दि 27_07_2026   (खरीप हंगाम-2026-27).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/04 विभागस्तरीय पिक गट निहाय पेरणी अहवाल अखेरDivisionwise Sowing Report - KHARIF 2026-27 as on 13_07_2026.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/10 जिल्हानिहाय एकूण पेरणी अहवाल दि 24_03_2026 अखेरचा (रब्बी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/11 जिल्हानिहाय पिकनिहाय पेरणी अहवाल दि 24_03_2026 अखेरचा (रब्बी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/12 विभागस्तरीय पिक गट निहाय पेरणी अहवाल दि 24_03_2026अखेरचा (रब्बी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/5 राज्यस्तरीय पिकनिहाय पेरणी अहवाल दि 05_06_2026 अखेरचा (उन्हाळी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/6 जिल्हानिहाय एकूण पेरणी अहवाल दि 05_06_2026 अखेरचा (उन्हाळी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/7 जिल्हानिहाय पिकनिहाय पेरणी अहवाल दि 05_06_2026 अखेरचा (उन्हाळी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/8 विभागस्तरीय पिक गट निहाय पेरणी अहवाल दि 05_06_2026 अखेरचा (उन्हाळी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/9 राज्यस्तरीय पिकनिहाय पेरणी अहवाल दि 24_03_2026 अखेरचा (रब्बी हंगाम-2025-26).pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICT WISE APY THIRD ADV EST 2025-26.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2019-20.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2020-21.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2021-22.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2022-23.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2023-24.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/DISTRICTWISE APY-2024-25.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2018-19.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2019-20.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2020-21.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2021-22.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2022-23.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2023-24.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/crop_statistics/STATE APY 2024-25.pdf` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2015.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2016.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2017.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2018.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2019.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2020.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2021.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2022.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2023.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2024.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/rainfall/raw_2025.html` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AHILYANAGAR_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AKOLA_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AMRAVATI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AMRAVATI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AMRAVATI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AMRAVATI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/AMRAVATI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BEED_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BHANDARA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BHANDARA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BHANDARA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BHANDARA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BHANDARA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/BULDHANA_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/CHANDRAPUR_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/Chhatrapati Sambhajinagar_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/Chhatrapati Sambhajinagar_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/Chhatrapati Sambhajinagar_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/Chhatrapati Sambhajinagar_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/Chhatrapati Sambhajinagar_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHARASHIV_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHARASHIV_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHARASHIV_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHARASHIV_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHARASHIV_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHULE_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHULE_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHULE_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHULE_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/DHULE_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GADCHIROLI_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GONDIA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GONDIA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GONDIA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GONDIA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/GONDIA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/HINGOLI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/HINGOLI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/HINGOLI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/HINGOLI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/HINGOLI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALGAON_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALGAON_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALGAON_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALGAON_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALGAON_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALNA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALNA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALNA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALNA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/JALNA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/KOLHAPUR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/KOLHAPUR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/KOLHAPUR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/KOLHAPUR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/KOLHAPUR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/LATUR_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NAGPUR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NAGPUR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NAGPUR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NAGPUR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NAGPUR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDED_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDED_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDED_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDED_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDED_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDURBAR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDURBAR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDURBAR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDURBAR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NANDURBAR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/NASHIK_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PALGHAR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PALGHAR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PALGHAR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PALGHAR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PALGHAR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PARBHANI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PARBHANI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PARBHANI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PARBHANI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PARBHANI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/PUNE_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RAIGAD_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RATNAGIRI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RATNAGIRI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RATNAGIRI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RATNAGIRI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/RATNAGIRI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SANGLI_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SANGLI_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SANGLI_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SANGLI_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SANGLI_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SATARA_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SINDHUDURG_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/SOLAPUR_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/THANE_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/THANE_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/THANE_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/THANE_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/THANE_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WARDHA_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/WASHIM_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2015-17.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2017-19.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2019-21.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2023-24.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2024-25.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/YAVATMAL_2025-26.kml` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/soil_health/crop_fertilizer_dataset_raw.csv` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `datasets/raw/weather/.gitkeep` | MAP / ANALYTICS | 7.8-lakh record government soil database | Yes | GIS Map Data generation | Keep |
| `backend/app/tests/benchmark_performance.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `backend/app/tests/redteam_failure_hunt.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `backend/app/tests/test_api.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `backend/app/tests/test_golden_scenarios.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `ml/tests/.gitkeep` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/conftest.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/golden_cases.json` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_api_contract.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_api_parity.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_feature_contract.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_golden_cases.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_model_prediction.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_ood_detection.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_perturbation_stability.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_probability_distribution.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `tests/v3/test_sugarcane_bias.py` | TEST | V3 regression & boundary test suites | Yes | Pytest Runner | Keep |
| `.github/.gitkeep` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/CODEOWNERS` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/ISSUE_TEMPLATE/.gitkeep` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/ISSUE_TEMPLATE/bug_report.md` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/ISSUE_TEMPLATE/feature_request.md` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/pull_request_template.md` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.github/workflows/.gitkeep` | UNKNOWN | Project file in .github | Yes | N/A | Keep |
| `.gitignore` | UNKNOWN | Project file in .gitignore | Yes | N/A | Keep |
| `LICENSE` | UNKNOWN | Project file in LICENSE | Yes | N/A | Keep |
| `README.md` | UNKNOWN | Project file in README.md | Yes | N/A | Keep |
| `assets/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/architecture/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/demo/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/calibration_curve.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/confusion_matrix.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/feature_importance.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/shap_beeswarm.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/shap_dependence.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/shap_summary.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/figures/shap_waterfall.png` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/icons/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/logo/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/maps/district_metadata.json` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/maps/maharashtra.geojson` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/maps/maharashtra.svg` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/maps/maharashtra_raw.geojson` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `assets/screenshots/.gitkeep` | UNKNOWN | Project file in assets | Yes | N/A | Keep |
| `backend/.env.example` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/.gitkeep` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/Dockerfile` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/README.md` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/main.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/audit_dataset.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/feature_builder.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/model_loader.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/preprocessing.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/shap_engine.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/ml/validate_models.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/services/explanation_service.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/services/prediction_service.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/app/start_server.py` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage10_api.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage1_validation.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage2_preprocessing.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage3_features.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage4_model.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage5_agronomy.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage6_regional.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage7_risk.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage8_fusion.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/debug_traces/stage9_decision.json` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/docker-compose.yml` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `backend/requirements.txt` | UNKNOWN | Project file in backend | Yes | N/A | Keep |
| `frontend/.gitignore` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/AGENTS.md` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/CLAUDE.md` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/README.md` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/eslint.config.mjs` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/next-env.d.ts` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/next.config.ts` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/package.json` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/postcss.config.mjs` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/file.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/globe.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/maps/district_metadata.json` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/maps/district_soil_data.json` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/maps/maharashtra.geojson` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/maps/maharashtra.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/next.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/vercel.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/public/window.svg` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `frontend/tsconfig.json` | UNKNOWN | Project file in frontend | Yes | N/A | Keep |
| `ml/README.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/artifacts/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/api.yaml` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/dataset.yaml` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/features.yaml` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/model.yaml` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/predict_input_schema.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/prediction_output_schema.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/configs/training.yaml` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/data/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/evaluation/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E001_DecisionTree/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E002_RandomForest/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E003_ExtraTrees/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E004_XGBoost/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E005_LightGBM/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/E006_CatBoost/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/comparison/benchmark_summary.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/comparison/comparison.csv` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/comparison/comparison.xlsx` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/experiments/comparison/leaderboard.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/explainability/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/feature_engineering/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/inference/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/inference/prediction_engine.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/feature_order.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/label_encoder.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/metadata.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/model_card.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/prediction_engine.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v1_baseline/preprocessor.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/feature_order.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/label_encoder.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/metadata.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/model_card.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/prediction_engine.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/archive/v2_balanced/preprocessor.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/catboost/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/catboost/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/decision_tree/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/decision_tree/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/extra_trees/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/extra_trees/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/lightgbm/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/lightgbm/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/feature_order.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/label_encoder.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/metadata.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/model_card.md` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/prediction_engine.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/production/preprocessor.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/random_forest/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/random_forest/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/registry.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/xgboost/metrics.json` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/models/xgboost/model.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/pipelines/run_benchmark.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/pipelines/train_production.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/preprocessing/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/preprocessing/preprocessor.pkl` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/preprocessing/shared_feature_builder.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/training/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/training/build_profiles_v3_1.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/training/download_dataset.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/training/train.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/training/train_v3.py` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `ml/utils/.gitkeep` | UNKNOWN | Project file in ml | Yes | N/A | Keep |
| `presentation/.gitkeep` | UNKNOWN | Project file in presentation | Yes | N/A | Keep |
| `preview.bat` | UNKNOWN | Project file in preview.bat | Yes | N/A | Keep |
| `preview/about.html` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/consultation.html` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/css/main.css` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/data.html` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/index.html` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/js/main.js` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `preview/results.html` | UNKNOWN | Project file in preview | Yes | N/A | Keep |
| `runtime.txt` | UNKNOWN | Project file in runtime.txt | Yes | N/A | Keep |
| `scratch_test.tmp` | UNKNOWN | Project file in scratch_test.tmp | Yes | N/A | Keep |
