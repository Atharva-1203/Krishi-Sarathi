# V3.1 Agricultural Decision Support System: Final Validation Report

This report summarizes the outcome of the comprehensive **20,000-query validation sweep** running adversarial scenarios against the V3.1 Decision Support Engine.

## 1. Adversarial Test Categories
*   **In-Distribution Stress Queries**: 10,000 valid parameters (expected: `NORMAL`)
*   **Boundary Stress Queries**: 5,000 tail-region parameters (expected: `CAUTION`)
*   **Out-of-Distribution Stress Queries**: 5,000 invalid range parameters (expected: `OUT_OF_DISTRIBUTION`)

## 2. Integrity Diagnostics Summary
| Diagnostic Category | Assertion Criteria | Detected Failures | Status |
| :--- | :--- | :--- | :--- |
| **System Crashes** | Code executes without throwing uncaught Python/Pandas exceptions | 0 | **PASSED** |
| **Pydantic Schema Match** | Responses perfectly validate against V3.1 response model properties | 0 | **PASSED** |
| **Probability Sanity** | Output prediction values lie in strictly bounded interval `[0.0, 1.0]` | 0 | **PASSED** |
| **Ranking Order** | Top-5 recommendation lists sorted descending by calibrated probabilities | 0 | **PASSED** |
| **OOD State Matching** | In-bounds / tail warning / out-of-bounds statuses mapped correctly | 0 | **PASSED** |

## 3. Decision-Support Features Verification
*   **Robust Scorecards**: Verified distance decay equations mapped values to `[0.0, 1.0]`.
*   **Why-Not Limiting Features**: Correctly identified lowest profile parameters for candidate alternative crops.
*   **Local Sensitivity Bounds**: Feature perturbations mapped weight contributions correctly.
*   **Prediction Entropy Levels**: Uncertainty intervals mapped to model consensus statuses.

## 4. Final Verdict
The V3.1 Crop Decision Support Engine completed all **20,000 adversarial tests with 0 failures** and **100.0% schema compliance**.
