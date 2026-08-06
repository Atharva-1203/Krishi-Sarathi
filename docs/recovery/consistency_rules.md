# Consistency Invariants & Constraint Rules (Phase 7.0)

E-agriculture MLOps constraints enforced by Krishi Sarathi.

---

## 1. System Invariants

### I1: Probability Summation
All predicted output classes probability scores must sum strictly to $1.0000$ (with float precision $\le 1e-4$).

### I2: Mutual Exclusivity
$$\text{Recommended Crops} \cap \text{Not Recommended Crops} = \varnothing$$
Crops recommended in `top_recommendations` must never appear in `not_recommended` rejection details, avoiding conflicting user recommendations.

### I3: Alignment of Warnings and Parameter Compliance
- If a biological parameter check (e.g. Rainfall) fails (`false` in compliance mapping), the crop item must carry an corresponding `agronomic_warning` or fallback description.
- Conversely, warnings cannot be triggered if all compliance parameters pass successfully (`true`).

### I4: Dynamic Risk Calibration
- Risk index must derive strictly from parameter compliance failures count:
  - 0 failures: **Very Low** risk.
  - 1 failure: **Low** risk.
  - 2 failures: **Moderate** risk.
  - 3+ failures: **High** or **Critical** risk.

---

## 2. Enforcement Mechanism
Validation checkpoints are evaluated dynamically at the end of `predict_single` serving loops. If any check fails, the API terminates request handling with a validation error, preventing corrupt recommendations from reaching React browsers.
