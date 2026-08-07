# Backend Audit

This document inventories the FastAPI backend routers, config files, and core service layers.

## 1. Directory Tree
*   `backend/app/main.py`: Configures app instance, CORSMiddleware, lifespan callbacks, and includes routers.
*   `backend/app/api/router.py`: Handles V1 endpoints health checks and metadata.
*   `backend/app/api/routes/predict_v3.py`: Directs V3.1 predict POST and metadata GET requests.
*   `backend/app/core/config.py`: Loads service metadata and environment configurations.
*   `backend/app/core/logging.py`: Configures standard backend print streaming.
*   `backend/app/exceptions/`: Houses error formats for model failure and validation errors.

## 2. Active Integrations
*   FastAPI is configured to serve on `http://127.0.0.1:8000`.
*   Includes full CORS permissions supporting frontend browser fetch queries.
