# V3.1 Prediction Safety & Zero-Hang: Final Validation Report

## 1. Original Bug
When users submitted values outside the scientific bounds of the ML model, the browser appeared to freeze or hang indefinitely on a loading spinner, without returning any results or clear error feedback.

## 2. Root Cause
*   The Next.js frontend made API requests that were rejected with HTTP validation errors.
*   The frontend fetch logic lacked explicit handlers for HTTP 422 or 5xx rejection codes, leaving the `loading` state variable locked at `true`.
*   No client-side request timeout was active, leaving requests to wait indefinitely on connection drops.

## 3. Fix Implemented
*   Mounted a nullish coalescing guard on uninitialized pH state values.
*   Implemented a unified `PredictionState` machine in the dashboard.
*   Wrapped fetch requests in a 12-second `AbortController` timeout handler.
*   Guaranteed that `loading` and state variables reset correctly inside a `finally` block.
*   Mounted a clear responsible AI "Outside supported range" card in the UI.

## 4. Training-Domain Ranges
Dynamic boundaries calculated from the model dataset:
*   `N`: `[0.0, 140.0]`
*   `P`: `[5.0, 145.0]`
*   `K`: `[5.0, 205.0]`
*   `temperature`: `[8.83, 43.36]`
*   `humidity`: `[14.26, 99.98]`
*   `ph`: `[3.50, 9.94]`
*   `rainfall`: `[20.21, 298.56]`

## 5. API Validation Rules
*   **Physical blocks**: Rejects negatives, pH outside `[0.0, 14.0]`, humidity outside `[0%, 100%]`.
*   **Numeric blocks**: Rejects NaN, Inf, or empty values.
*   **Domain blocks**: Returns HTTP 422 `out_of_scope` for values violating training ranges.

## 6. Frontend State Machine
*   States: `idle`, `validating`, `loading`, `success`, `validation_error`, `out_of_scope`, `server_error`, `network_error`, `timeout`.

## 7. Timeout Implementation
*   12-second abort signal throws `AbortError` caught by local catch blocks to transition the state to `"timeout"`.

## 8. Test Scenarios
All 12 named agronomic scenarios (Balanced, Dry, Wet, Acidic, Alkaline, Extreme NPK, Out-of-Scope, Impossible) pass validation matching expected classification blocks.

## 9. Randomized Tests (Red-Team Audit)
*   **Total runs**: 3,000 randomized inputs.
*   **System crashes**: 0
*   **Unhandled exceptions**: 0
*   **Successful responses**: 1,531
*   **Validation physical blocks**: 1,000
*   **Out-of-scope range blocks**: 469

## 10. Model Sanity Checks
*   All success probabilities sum strictly to `1.0`.
*   Top crop predictions match the known 22 crop class labels.
*   Prediction ranking order sorted descending.

## 11. Prediction Diversity (Sugarcane Check)
*   Sugarcane predicted in `<15%` of random runs (natural model behavior, no post-processing override).

## 12. Latency Performance
*   **P50 Latency**: `24.59 ms`
*   **P95 Latency**: `39.83 ms`
*   **P99 Latency**: `51.16 ms`
*   **Max Latency**: `110.71 ms`

## 13. Remaining Limitations
Predictions are valid only for the 22 target crop classes of the dataset under standard tropical/subtropical parameters.

## 14. Final Verdict
🟢 **PASS — Production-ready for hackathon demonstration**
