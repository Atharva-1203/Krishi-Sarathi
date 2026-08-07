# V3 Rebuild: 08 Input Domain & OOD Protection Report

This document summarizes the validation bounds established to detect out-of-distribution (OOD) parameters.

## 1. Feature Support Boundaries
| Feature | Valid Min | Valid Max | 1st Percentile | 99th Percentile |
| :--- | :--- | :--- | :--- | :--- |
| N | 0.00 | 140.00 | 0.00 | 129.61 |
| P | 5.00 | 145.00 | 6.00 | 143.00 |
| K | 5.00 | 205.00 | 7.39 | 204.00 |
| temperature | 8.83 | 43.36 | 11.84 | 41.27 |
| humidity | 14.26 | 99.98 | 15.18 | 96.99 |
| ph | 3.50 | 9.94 | 4.61 | 8.73 |
| rainfall | 20.21 | 298.56 | 21.67 | 270.61 |

## 2. OOD Heuristics
Any input values falling strictly outside `[Valid Min, Valid Max]` are classified as **OUT_OF_DISTRIBUTION**. Values falling between the 1st percentile and min, or the 99th percentile and max are marked as **CAUTION** alerts. These checks are run prior to scaling, and appropriate error/warnings are logged in the API response.
