# Krishi Sarathi - API Integration Sheet

Details our FastAPI endpoints, request headers, and routing mechanisms.

## 1. Served Endpoints
- **Health Check**: `GET /api/v1/health` (pings uvicorn server liveness).
- **Model Inference**: `POST /api/v1/predict` (returns crop classifications and local SHAPs).

## 2. Latency Metrics
- **Mean Inference Time**: `12.5 ms` (using warm pre-loaded models and pickle namespaces).
