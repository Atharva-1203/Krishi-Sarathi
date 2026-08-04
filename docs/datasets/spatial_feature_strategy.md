# Spatial Information Audit and Strategy

This document evaluates spatial aggregation methods for merging point-level soil health maps with crop labels.

## 1. Evaluation of Spatial Strategies

1. **District Median (Current)**:
   - *Pros*: Simple, zero-missing-values match.
   - *Cons*: High information loss; soil parameters vary wildly within a district.
   
2. **Taluka Median (Recommended)**:
   - *Pros*: Significantly higher spatial resolution. Our Soil Health Card database has Taluka names for 100% of rows.
   - *Cons*: Some minor Talukas may have fewer soil sample points, requiring district fallbacks.

3. **Nearest Soil Point (KNN Mapping)**:
   - *Pros*: Extremely precise (uses Latitude/Longitude coordinates directly).
   - *Cons*: Computationally expensive during inference.

## 2. Recommendation
We recommend transitioning to **Taluka-Level Medians** as the primary join key. This maintains high spatial fidelity while avoiding the computational overhead of point-to-point KNN coordinates calculation.
