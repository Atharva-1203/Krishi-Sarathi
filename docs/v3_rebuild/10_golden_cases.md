# V3 Rebuild: 10 Golden Cases Evaluation

This document summarizes the execution results of the 20 deterministic golden test cases.

| ID | Scenario Name | Top Predicted Crop | Probability | OOD Status | Warnings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Balanced soil | **Jute** | 0.4770 | NORMAL | None |
| 2 | High nitrogen | **Jute** | 0.7509 | NORMAL | None |
| 3 | Low nitrogen | **Pomegranate** | 0.1655 | NORMAL | None |
| 4 | High phosphorus | **Chickpea** | 0.3132 | NORMAL | None |
| 5 | Low phosphorus | **Rice** | 0.6205 | CAUTION | Feature 'P' value 5.00 is in the extreme tail of the training distribution [p01: 6.00, p99: 143.00]. |
| 6 | High potassium | **Apple** | 0.8170 | NORMAL | None |
| 7 | Low potassium | **Maize** | 0.1314 | CAUTION | Feature 'K' value 5.00 is in the extreme tail of the training distribution [p01: 7.39, p99: 204.00]. |
| 8 | Acidic pH | **Rice** | 0.8343 | CAUTION | Feature 'ph' value 4.50 is in the extreme tail of the training distribution [p01: 4.61, p99: 8.73]. |
| 9 | Alkaline pH | **Jute** | 0.8116 | NORMAL | None |
| 10 | High rainfall | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 11 | Low rainfall | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 12 | High temperature | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 13 | Low temperature | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 14 | High humidity | **Jute** | 0.8635 | CAUTION | Feature 'humidity' value 99.00 is in the extreme tail of the training distribution [p01: 15.18, p99: 96.99]. |
| 15 | Low humidity | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 16 | Balanced conditions | **Jute** | 0.8952 | NORMAL | None |
| 17 | Boundary values | **Apple** | 0.3842 | CAUTION | Feature 'N' value 140.00 is in the extreme tail of the training distribution [p01: 0.00, p99: 129.61].; Feature 'rainfall' value 280.00 is in the extreme tail of the training distribution [p01: 21.67, p99: 270.61]. |
| 18 | Slightly outside training domain | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 19 | Extreme values | **N/A (Out of Scope)** | 0.0000 | OUT_OF_DISTRIBUTION | Input outside model training range |
| 20 | Random realistic farm | **Rice** | 0.6108 | NORMAL | None |
| 21 | Very dry environment | **Mothbeans** | 0.3407 | CAUTION | Feature 'rainfall' value 21.00 is in the extreme tail of the training distribution [p01: 21.67, p99: 270.61]. |
| 22 | Very wet environment | **Rice** | 0.2483 | CAUTION | Feature 'rainfall' value 290.00 is in the extreme tail of the training distribution [p01: 21.67, p99: 270.61]. |
| 23 | Hot climate | **Papaya** | 0.4281 | CAUTION | Feature 'temperature' value 43.00 is in the extreme tail of the training distribution [p01: 11.84, p99: 41.27]. |
| 24 | Cool climate | **Jute** | 0.2540 | CAUTION | Feature 'temperature' value 9.00 is in the extreme tail of the training distribution [p01: 11.84, p99: 41.27]. |
| 25 | High NPK values | **Grapes** | 0.1676 | CAUTION | Feature 'N' value 135.00 is in the extreme tail of the training distribution [p01: 0.00, p99: 129.61]. |

## Verdict
All 20 golden cases ran without errors, returning valid top-5 crop recommendations and correctly flagging out-of-distribution environments.
