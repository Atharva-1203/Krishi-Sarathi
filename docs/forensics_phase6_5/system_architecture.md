# System Architecture & Decision Flow Diagram


## Enterprise+ Decision Architecture

```
[User Soil Input] 
       ↓
[Pydantic Sanitizer & Medians Imputation]
       ↓
[ExtraTrees ML Classifier] ──→ Top-N Probabilities
       ↓
[Agronomic Validator] ──→ Biological Optimums Check
       ↓
[Regional Validator] ──→ Agro-climatic Zone Check
       ↓
[Decision Fusion Engine] ──→ Final Score Card
       ↓
[Consistency Assertion] ──→ Mutual Exclusivity Check
       ↓
[JSON Serialization & React Render]
```
