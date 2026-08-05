# Frontend UX/UI Audit - Krishi Sarathi

This audit outlines issues in the current user interface and interactions.

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| Hardcoded Pune selection | High | `PredictionDashboard.tsx` | Replace default value with `""` (No District Selected) |
| Hardcoded Pune map focus | High | `MaharashtraMap.tsx` | Reset map state to neutral on mount, prompting explicit selection |
| Non-functional map controls | Medium | `ZoomControls.tsx` | Remove empty or non-functional placeholder button triggers |
| Direct SHAP math labels | Low | `ResultsDisplay.tsx` | Replace with reader-friendly "AI Feature Influence" progress bars |
