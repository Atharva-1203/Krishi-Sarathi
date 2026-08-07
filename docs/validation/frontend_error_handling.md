# Frontend Error Handling & State Machine

This document registers the Next.js frontend prediction state machine rules.

## 1. Unified State Machine
```typescript
type PredictionState =
  | "idle"
  | "validating"
  | "loading"
  | "success"
  | "validation_error"
  | "out_of_scope"
  | "server_error"
  | "network_error"
  | "timeout";
```
Every query request is guaranteed to transition to exactly one of the terminal states (`success`, `validation_error`, `out_of_scope`, `server_error`, `network_error`, `timeout`), completely eliminating loading locks or infinite spinners.

## 2. Request Timeout & Cleanup
*   An `AbortController` signal is passed to the fetch hook.
*   A `setTimeout` trigger aborts the connection after **12 seconds** of latency, transitioning the UI to a timeout error card.
*   The `loading` state hook is updated in a `finally` block to guarantee it is set to `false` when connections terminate or error.
