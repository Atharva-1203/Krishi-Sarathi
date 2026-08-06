# Final Certification

## Decision

Targeted engineering repair is the reliable next step. A full rebuild is not
currently evidenced.

## Acceptance criteria for a future repair

- 1,000 sampled training/serving feature vectors exactly match within numeric
  tolerance.
- Probability vectors and ranking match within numeric tolerance.
- Request-schema ranges are justified by training support or explicitly OOD.
- End-to-end tests cover season, humidity, district defaults, rainfall/NPK
  extremes, and response rendering.
- Sugarcane frequency is measured against realistic, logged request data rather
  than uniform synthetic inputs.

Current status: **not certified for scientific production use** because the
feature contract is demonstrably non-identical.
