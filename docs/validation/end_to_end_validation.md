# Named Agronomic Scenarios Validation

This document verifies the end-to-end classification behavior across the 12 named agronomic scenarios.

| Scenario | Input Parameters | Expected Status | Actual Status | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **1. Balanced soil** | `N: 50, P: 50, K: 50, pH: 6.5, Rain: 150` | `success` | `success` | **PASS** |
| **2. Very dry** | `N: 50, P: 50, K: 50, pH: 6.5, Rain: 21` | `success` | `success` | **PASS** |
| **3. Very wet** | `N: 50, P: 50, K: 50, pH: 6.5, Rain: 290` | `success` | `success` | **PASS** |
| **4. High NPK** | `N: 135, P: 135, K: 200, pH: 7.0, Rain: 150` | `success` | `success` | **PASS** |
| **5. Low NPK** | `N: 5, P: 10, K: 10, pH: 6.5, Rain: 150` | `success` | `success` | **PASS** |
| **6. Acidic soil** | `N: 50, P: 50, K: 50, pH: 3.6, Rain: 150` | `success` | `success` | **PASS** |
| **7. Alkaline soil** | `N: 50, P: 50, K: 50, pH: 9.8, Rain: 150` | `success` | `success` | **PASS** |
| **8. Hot climate** | `N: 50, P: 50, K: 50, pH: 6.5, Temp: 43` | `success` | `success` | **PASS** |
| **9. Cool climate** | `N: 50, P: 50, K: 50, pH: 6.5, Temp: 9` | `success` | `success` | **PASS** |
| **10. Completely invalid** | `N: -5, P: 50, K: 50, pH: 15.0, Rain: 150` | `validation_error` | `validation_error` | **PASS** |
| **11. Out-of-model-support**| `N: 200, P: 50, K: 50, pH: 6.5, Rain: 150` | `out_of_scope` | `out_of_scope` | **PASS** |
| **12. Boundary** | `N: 140, P: 145, K: 205, pH: 9.93, Rain: 298.5` | `success` | `success` | **PASS** |
