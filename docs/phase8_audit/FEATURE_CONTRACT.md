# Feature Contract

The model expects 37 features: 21 standardized numeric values and 16 one-hot
categorical values. `feature_order.json` exactly matches the serialized
preprocessor order; index ordering and class decoding are therefore verified.

| Feature | Training source | Serving source | Difference |
|---|---|---|---|
| Humidity | Dataset column | `clip(45 + .05*Rainfall - .2*Temperature,30,95)` | Replaced |
| Soil_Health_Score | Dataset column | Hardcoded threshold calculation | Recomputed |
| Growing_Season | Dataset column | Always Kharif through public schema | Missing public input |
| Ratios/deviation | Dataset columns | Recomputed formulas | Matched for stored rows |
| District micronutrients | Dataset/public optional values | District defaults if absent | Hidden defaults |

The public request schema does not include `Growing_Season`; it does include
`Humidity`, but the service ignores its submitted value.
