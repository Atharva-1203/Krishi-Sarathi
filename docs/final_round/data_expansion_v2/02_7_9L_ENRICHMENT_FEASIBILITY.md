# Government Database Enrichment Feasibility (7.9L)

This document evaluates the scientific validity of enriching the 7.9L Soil Health Card database with external climate and crop statistics.

---

## 1. Candidate Join Keys & Resolution Analysis

We evaluated three potential strategies to join target crop labels and weather to the 7.9L soil records:

### Key 1: Latitude / Longitude Coordinates
- **Weather Source**: IMD gridded daily rainfall ($0.25^\circ \times 0.25^\circ$).
- **Crop Source**: None (farm crop survey coords are closed/proprietary).
- **Feasibility**: High for weather interpolation, but **0 matches for crop outcomes**.

### Key 2: Village / Taluka Name
- **Weather Source**: Block-level rain gauges.
- **Crop Source**: Village-level crop registry (e-Pik Pahani).
- **Feasibility**: Extremely high ambiguity. Over $87\%$ of village transliterations in the database contain naming spelling discrepancies. Even when matched, a village has dozens of active crops, preventing a unique 1-to-1 join.

### Key 3: District Name
- **Weather Source**: District rainfall averages.
- **Crop Source**: DES District Crop Production Yield summaries.
- **Feasibility**: 100% physically matched.
- **Scientific Verdict**: **Strictly Prohibited (Ecological Fallacy).** Assigning a district-wide dominant crop (sugarcane in Kolhapur, cotton in Yavatmal) to every soil record in that district leaks location. The model would learn administrative defaults instead of agronomic chemistry limits.

---

## 2. Enrichment Summary
- **Raw records**: 779,144
- **Cleaned records**: 722,342
- **Usable records with farm-level crops**: **0**
- **Decision**: **NO-GO on training enrichment.** Decouple the data: the 779,144 records must remain as observational GIS layers and must not be used to train the classification models.
