# Red-Team Randomized Validation Results

This document summarizes the randomized adversarial audits performed against the V3.1 prediction engine.

## 1. Adversarial Test Sweep (3,000 Attempts)
*   **Valid Random Inputs**: 1,000 cases (expected: `success`)
*   **Physically Invalid Inputs**: 1,000 cases (expected: `validation_error` via NaN/Inf/Negative blocks)
*   **Boundary Inputs**: 500 cases (expected: `success` at min/max limits)
*   **Out-of-Scope Inputs**: 500 cases (expected: `out_of_scope` just outside min/max range)

## 2. Validation Run Outcome
*   **Successful responses**: 1,531
*   **Validation responses**: 1,000
*   **Out-of-scope responses**: 469
*   **Server errors / Unhandled exceptions**: 0 (100% Zero-Hang compliance)
*   **P50 Latency**: `24.59 ms`
*   **P95 Latency**: `39.83 ms`
*   **P99 Latency**: `51.16 ms`
*   **Max Latency**: `110.71 ms`
