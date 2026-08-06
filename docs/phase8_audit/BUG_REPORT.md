# Bug Report

| Severity | Issue | Location |
|---|---|---|
| Critical | Training-serving feature mismatch | `backend/app/services/prediction_service.py` |
| Critical | Serving ranges exceed training support | request schema and frontend form |
| High | Submitted humidity overwritten | `prediction_service.py` |
| High | Season absent from API and defaults to Kharif | `schemas/request.py`, service |
| High | Offline validation skips served feature path | `ml/pipelines/run_benchmark.py` |
| Medium | Hardcoded quality score and metadata | `prediction_service.py` |
| Medium | Extreme class imbalance | `datasets/final/master_dataset.csv` |
| Low | Display-only Cotton/Sugarcane warning fallback | `ResultsDisplay.tsx` |
| Low | Duplicate/unused artifacts | `ml/models`, `ml/inference`, `scripts` |

No frontend code changes probability, ranking, or primary crop. It renders the
API response directly.
