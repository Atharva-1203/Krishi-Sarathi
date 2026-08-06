# Chapter 15: Edge Case Validation

We tested the API with extreme and impossible values to ensure robust validation:
- **pH = 0 / pH = 14**: Gracefully rejected by Pydantic validators (`ge=0`, `le=14`).
- **Rainfall = 8000mm**: Rejected by validators (`le=5000`).
- **Negative Nitrogen**: Rejected by validators (`ge=0`).
