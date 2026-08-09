# Krishi Sarathi: Data Fusion & Join Feasibility Study

This document evaluates the feasibility of joining soil records and agricultural outcome data.

---

## 1. Join Levels & Metrics

We define and evaluate five standard join strategies:

### LEVEL 1: Exact plot/farm + compatible date
- **Availability**: None. Government soil cards are anonymous and lack matching farm-specific crop outcome keys.
- **Feasibility**: **0 matches**.

### LEVEL 2: Exact coordinates + compatible date
- **Availability**: Soil cards have Latitude/Longitude coordinates. However, no coordinate-exact crop survey dataset exists in the workspace.
- **Feasibility**: **0 matches**.

### LEVEL 3: Village + compatible date
- **Availability**: High village cardinality (87% missing in taluka/village listings).
- **Feasibility**: Highly ambiguous; a single village grows up to 10 different crops on varying soil patches.

### LEVEL 4: District + compatible date
- **Availability**: 100% matched by merging DES district-wise summaries.
- **Feasibility**: **Ecological Fallacy**. Assigns Pune's dominant crop (sugarcane) to every soil card in Pune, creating spatial leakage.

---

## 2. Fusion Verdict
Fusing unlabeled soil records with district-level statistics to create training labels is **scientifically invalid**. It leaks location properties and re-introduces sugarcane default bias.
