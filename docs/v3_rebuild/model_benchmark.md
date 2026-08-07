# V3 Rebuild: 05 Model Benchmark Report

This document summarizes the offline performance and benchmark statistics of crop classification models on the V3 stratified splits.

## 1. Benchmarking Metrics

| Model Name | CV-Macro-F1 | Val Accuracy | Val Macro-F1 | Balanced Acc | Log Loss | Brier Score | ECE | Top-3 Acc | Top-5 Acc | Latency (ms) | Size (KB) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| LogisticRegression | 0.9678 ± 0.0063 | 0.9667 | 0.9665 | 0.9667 | 0.2221 | 0.0818 | 0.1363 | 1.0000 | 1.0000 | 0.0085 | 2.4 |
| DecisionTree | 0.9824 ± 0.0123 | 0.9758 | 0.9755 | 0.9758 | 0.8738 | 0.0485 | 0.0242 | 0.9758 | 0.9758 | 0.0082 | 19.0 |
| RandomForest | 0.9928 ± 0.0070 | 0.9909 | 0.9909 | 0.9909 | 0.0649 | 0.0212 | 0.0444 | 1.0000 | 1.0000 | 0.1004 | 3325.0 |
| ExtraTrees | 0.9922 ± 0.0033 | 0.9939 | 0.9939 | 0.9939 | 0.1047 | 0.0308 | 0.0869 | 1.0000 | 1.0000 | 0.1361 | 14255.6 |
| HistGradientBoosting | 0.9909 ± 0.0048 | 0.9879 | 0.9878 | 0.9879 | 0.0834 | 0.0218 | 0.0134 | 0.9970 | 1.0000 | 0.5317 | 3772.5 |
| XGBoost | 0.9915 ± 0.0039 | 0.9848 | 0.9848 | 0.9848 | 0.0659 | 0.0245 | 0.0099 | 1.0000 | 1.0000 | 0.0678 | 1636.2 |
| LightGBM | 0.9889 ± 0.0016 | 0.9939 | 0.9939 | 0.9939 | 0.0399 | 0.0118 | 0.0072 | 0.9970 | 0.9970 | 0.0964 | 4243.0 |
| CatBoost | 0.9863 ± 0.0039 | 0.9909 | 0.9909 | 0.9909 | 0.0306 | 0.0131 | 0.0130 | 1.0000 | 1.0000 | 0.0157 | 1167.3 |
