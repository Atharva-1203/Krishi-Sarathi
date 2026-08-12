# 📈 Model Evaluation & Benchmarks

## Benchmark Comparison Matrix

| Model Candidate | Dataset | Test Acc | Macro F1 | Brier Score | ECE | Inference Latency |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **ExtraTrees (Champion)** | ICAR GOLD (2.2K) | **98.86%** | **98.86%** | **0.0135** | **0.0494** | **1.3 ms** |
| Random Forest | ICAR GOLD (2.2K) | 98.41% | 98.40% | 0.0152 | 0.0521 | 2.1 ms |
| XGBoost | ICAR GOLD (2.2K) | 98.18% | 98.15% | 0.0189 | 0.0610 | 3.4 ms |
| CatBoost | ICAR GOLD (2.2K) | 97.95% | 97.92% | 0.0210 | 0.0685 | 4.8 ms |
| **ExtraTrees (V6 Expanded)** | Gold+Silver (81.7K) | **96.76%** | **85.82%** | **0.0453** | **0.0209** | **1.5 ms** |
