# Data Join & Integration Strategy

This document details the feasibility and evaluation of joining the 7.9L Soil Health Cards with external agricultural statistics.

---

## 1. Join Keys & Resolutions Feasibility

We evaluated four strategies to join labels and weather observations to the soil records:

### farm-level coordinates (Latitude / Longitude)
- **Status**: 779k cards have coordinates. However, there is no corresponding farm-level coordinate-specific crop outcome database.
- **Feasibility**: **0 matches**.

### Village / Tehsil Name
- **Status**: High spelling cardinality discrepancies across cycle records. Even when matched, a village cultivates multiple crops across varying soil patches, creating label ambiguity.
- **Feasibility**: Highly ambiguous.

### District Name + Cycle Year
- **Status**: 100% matched by merging DES yield files.
- **Scientific Impact**: **Ecological Fallacy.** Assigns district dominant crops (e.g. Pune $\implies$ Sugarcane) to every soil card, causing the model to split nodes on administrative borders rather than crop chemistry.

---

## 2. Decoupled Architecture Design
Fusing crop labels using district default averages represents **manufactured leakage** and is strictly prohibited. To preserve scientific integrity:
- The crop predictor model remains geography-blind, evaluating continuous parameters only.
- The 779k Soil Health Cards are decoupled from model training and display average Soil Quality Indices (SQI) and diversity trends on map panels.
