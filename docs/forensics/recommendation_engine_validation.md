# Chapter 8: Model Benchmarks Comparison (V1 Baseline vs V2 Balanced)

| Metric | V1 Baseline (ExtraTrees) | V2 Balanced (RandomForest) |
|--------|--------------------------|----------------------------|
| Top-1 Validation Accuracy | 99.59% | 99.78% |
| Top-3 Validation Accuracy | 100.0% | 100.0% |
| Validation F1-Macro | 99.59% | 99.75% |
| Expected Calibration Error (ECE) | 0.0058 | 0.0170 |
| Average Inference Latency | 7.2 ms | 10.42 ms |
| P95 Latency | 10.0 ms | 15.62 ms |
| P99 Latency | 15.0 ms | 24.06 ms |
