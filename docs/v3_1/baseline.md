# V3.1 Upgrade: Baseline Metrics Report

This document records the baseline metrics of the stable Krishi Sarathi V3 crop prediction engine.

## 1. Baseline Model Metrics (ExtraTrees Classifier)
*   **Validation Accuracy**: `99.39%`
*   **Validation Macro-F1**: `99.39%`
*   **Balanced Accuracy**: `99.39%`
*   **Log Loss**: `0.1047`
*   **Top-3 Accuracy**: `100.00%`
*   **Top-5 Accuracy**: `100.00%`

## 2. Calibration Metrics (Test Split)
*   **Raw Brier Score**: `0.030424`
*   **Calibrated Brier Score**: `0.016154`
*   **Raw Expected Calibration Error (ECE)**: `0.082061`
*   **Calibrated Expected Calibration Error (ECE)**: `0.070768`

## 3. Inference and Latency
*   **Model Size**: `14.2 MB`
*   **Model Latency (Python)**: `~0.13 ms`
*   **Full API round-trip Latency**: `~12 ms`

## 4. Current Frontend Status
*   **Next.js Compile**: Verified `Ready` with `0` TypeScript/TSX compiler errors.
*   **Features Ingested**: Exactly the 7 features (`N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`).
