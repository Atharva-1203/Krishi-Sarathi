# V3 Rebuild: 14 Map Separation Report

This document details the architectural separation between the Maharashtra Government Geoportal Map and the V3 crop recommendation engine.

## 1. Decoupled Architecture

```
                    +--------------------+
                    |    Prediction Form |
                    |  (7 parameters only) |
                    +---------+----------+
                              |
                              v
                    +--------------------+
                    |  FastAPI V3 API    |  <-- Pure ML Inference (ExtraTrees)
                    +---------+----------+
                              |
                              v
                    +--------------------+
                    |    Crop Results    |
                    +--------------------+

Government Soil Cards + Rainfall Data --+
                                        |
                                        v
                            +-----------------------+
                            | Maharashtra Map / UI  | <-- Pure Analytics
                            +-----------------------+
```

## 2. Core Isolation Standards
1.  **No Feedback Loops**: District coordinates or map boundary indices cannot inject parameters into the backend prediction payload.
2.  **Explicit Documentation**: The map dashboards explicitly contain the notice: *"Map layers show historical government records and soil card indices. These are for region visualization and do not alter the crop recommendation model outputs."*
3.  **Endpoint Independence**: The map layers communicate with legacy metadata endpoints or spatial files, completely isolated from `POST /api/v3/predict`.
