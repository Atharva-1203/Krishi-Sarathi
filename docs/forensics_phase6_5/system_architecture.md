# System Architecture & Decision Flow Diagram


```
[Input Parameter] → [Tracer 1]
       ↓
[Median Imputer] → [Tracer 2]
       ↓
[NPK Ratio Engr] → [Tracer 3]
       ↓
[ExtraTrees ML]  → [Tracer 4]
       ↓
[Agronomic Check]→ [Tracer 5]
       ↓
[Regional Check] → [Tracer 6]
       ↓
[Risk Penalty]   → [Tracer 7]
       ↓
[Decision Fusion]→ [Tracer 8]
       ↓
[Mutual Excl]    → [Tracer 9]
       ↓
[API Serialized] → [Tracer 10]
```
