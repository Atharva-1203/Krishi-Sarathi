# Krishi Sarathi: Backend Presentation Notes

This document contains talking points, technical details, and potential judge questions for the API and backend serving layer.

---

## 1. Core Technology Stack
- **Framework**: FastAPI (Asynchronous Python Web Framework)
- **Validation**: Pydantic v2
- **Server**: Uvicorn
- **HTTP Client**: HTTPX (for unit tests)

---

## 2. API Data Flow Path
```
Browser Client ➔ HTTP POST /api/v3/predict ➔ Pydantic Validation ➔ Feature Builder (Strict 7-Feature Contract) ➔ OOD Guard Check ➔ MinMax Scaling ➔ ExtraTrees Inference ➔ Platt Scaling Calibration ➔ Explainability metrics (scorecard, sensitivity) ➔ JSON Response ➔ Frontend Client
```

---

## 3. Key Backend Mechanisms
- **Strict Schema Enforcement**: Pydantic parses and enforces float datatypes for the 7 physical input fields (`N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`). Any extra keys or invalid datatypes are rejected immediately with a `422 Unprocessable Entity` response.
- **Dynamic Path Resolution**: Resolves model pickles (`model.pkl`, `preprocessor.pkl`, `metadata.json`) dynamically from environment configurations or local filesystems, supporting containerized builds (Docker, Render, local dev).
- **OOD Detection & Validation Rejections**: If inputs violate physical constraints (e.g. pH outside `[0, 14]` or negative rainfall), it returns `status: out_of_scope` with a `422` status code. Extreme but possible values (in the tail distribution) are processed but flagged with `ood_status: CAUTION` to notify the client.

---

## 4. Judge Questions & Answers

### Q1: \"Why use FastAPI instead of Flask or Django?\"
*   **Answer**: \"FastAPI is built on ASGI, allowing asynchronous processing which speeds up multi-query requests. Additionally, it offers native OpenAPI (Swagger) documentation and integrates Pydantic validation out-of-the-box, ensuring type-safe API boundaries.\"

### Q2: \"How does your server handle out-of-range inputs?\"
*   **Answer**: \"We have a two-layer security validation. First, physical impossibility boundaries (like negative values) are rejected immediately. Second, training bounds (min/max limits of training samples) are checked. If a value falls outside, the request is safely rejected with `status: out_of_scope` rather than feeding invalid inputs into the model and causing numerical errors.\"
