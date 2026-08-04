# Production Performance Targets

This document defines performance SLA targets for our ML system.

| Metric | Target SLA | Metric Unit | Assessment Method |
|--------|------------|-------------|-------------------|
| **Prediction Latency** | < 10 ms | Milliseconds | time.time() difference in API |
| **Explainability Latency** | < 25 ms | Milliseconds | time.time() difference in SHAP |
| **Model Disk Size** | < 20 MB | Megabytes | Disk space check |
| **API Latency (End-to-End)**| < 50 ms | Milliseconds | Benchmarking tool |
| **Throughput** | > 100 req/sec | Requests per second | Load testing |
