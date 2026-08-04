# Dataset Merge and Integration Strategy

This document describes how to join the Phase 2 Rainfall Database with the Phase 1 soils and agro-ecological datasets, and outlines potential conflicts and standardization dictionaries.

## 1. Primary and Secondary Keys
- **Primary Key (Rainfall Database)**: `[District, Year, Season]`
- **Join Key (Spatial soil/Agro-ecological mapping)**: `[District]`

To perform a join:
1. Aggregate the rainfall database to historical averages (e.g., mean monsoon rainfall per district) or join dynamically by matching the crop sowing `Year` and `District` of a soil sample.
2. The primary spatial merge field is the **District**.

## 2. Spatial Scale Conflicts and Solutions
- **Palghar Boundary Mismatch**:
  - *Conflict*: Soils (Phase 1) has 35 districts (Palghar is merged in Thane). Rainfall (Phase 2) has 34 districts (Palghar is separate).
  - *Strategy*: When joining, map Palghar's rainfall record (`District == 'Palghar'`) to Thane's soil mappings, or merge Palghar and Thane rainfall records using an area-weighted average:
    $$\text{Rainfall}_{\text{Merged}} = \frac{\text{Rainfall}_{\text{Thane}} \times \text{Area}_{\text{Thane}} + \text{Rainfall}_{\text{Palghar}} \times \text{Area}_{\text{Palghar}}}{\text{Area}_{\text{Thane}} + \text{Area}_{\text{Palghar}}}$$

- **District Rename Standardization Map**:
  Ensure that name columns are standardized before joining. Use this lookup map:

| Soil Database Name | Rainfall Database Name | Standard Merge Key |
|--------------------|------------------------|--------------------|
| `AHMADNAGAR` | `Ahmednagar` / `Ahilyanagar` | `Ahmednagar` |
| `BID` | `Beed` / `Bid` | `Beed` |
| `GONDIYA` | `Gondia` / `Gondiya` | `Gondia` |
| `NASIK` | `Nashik` / `Nasik` | `Nashik` |
| `RAIGARH` | `Raigad` / `Raigadh` | `Raigad` |
| `OSMANABAD` | `Dharashiv` / `Osmanabad` | `Osmanabad` |
| `AURANGABAD` | `Chhatrapati Sambhajinagar` | `Aurangabad` |
| `AMARAVATI` | `Amravati` | `Amravati` |
| `PARBHANI` | `Parabhani` | `Parbhani` |

## 3. Recommended Joining Workflow
1. Apply spelling standardization to both datasets.
2. Filter out Mumbai City and Mumbai Suburban from the soil database (they have no matching rainfall data).
3. If predicting a specific crop yield in year $T$, select rainfall for year $T$ and join with the static soil map of the district.
