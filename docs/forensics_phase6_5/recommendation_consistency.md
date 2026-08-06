# Recommendation Consistency Engine Specification


## Canonical Decision Object (Enterprise+ Standard)

Every prediction response returns a unified JSON schema ensuring that warnings, explanations, scores, and fallbacks arise from the same single decision structure:

```json
{
  "crop": "Sugarcane",
  "conditional_crop_name": "Sugarcane (only with reliable irrigation)",
  "statistical_confidence": 0.57,
  "agronomic_confidence": 0.70,
  "regional_suitability": 0.60,
  "final_score": 0.53,
  "risk_level": "Moderate",
  "decision_type": "Conditional",
  "decision_trace": [
    "Historical Similarity: 57%",
    "pH Suitability check passed.",
    "Nutrient N check passed."
  ],
  "parameter_compliance": {
    "Rainfall": false,
    "Temperature": true,
    "Soil pH": true
  }
}
```
