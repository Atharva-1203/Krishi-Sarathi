# Explanation Consistency & Contradiction Detection


## Explanation Synthesis Rules

To prevent contradictions between SHAP text and Agronomic warnings:
- Explanation Service queries the unified `parameter_compliance` checklist.
- If Rainfall is flagged as `false`, the explanation dynamically appends warnings regarding irrigation necessity.
