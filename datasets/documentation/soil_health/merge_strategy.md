# Dataset Merge and Integration Strategy

This document details the spatial and temporal joining strategy to integrate the Phase 3 Soil Health Card Database with Rainfall (Phase 2), BHOOMI Geoportal (Phase 1), and crop statistics.

## 1. Join Keys and Spatial Scale Mapping

We recommend a multi-level join hierarchy:

1. **District-Level Join**:
   - *Primary Join Key*: `District`
   - *Usage*: Link the soil points database with the historical rainfall database (`Project/02_Rainfall/district_season_rainfall.csv`) or district-level crop APY databases.
   
2. **Taluka-Level Join**:
   - *Primary Join Key*: `[District, Taluka]`
   - *Usage*: Match the soil points with localized BHOOMI Geoportal physical mapping layers (e.g. Soil Texture, Depth, Erosion, Land Capability) where sub-district resolutions are available.

3. **Temporal Mapping (Year / Season)**:
   - *Primary Join Key*: `Cycle` (mapped to Sowing `Year`)
   - *Usage*: Since Soil Health Cards are compiled in cycles:
     - `2015-17` matches rainfall of years 2015 and 2016.
     - `2017-19` matches rainfall of years 2017 and 2018.
     - `2023-24` matches rainfall of years 2023.
     - `2024-25` matches rainfall of years 2024.

## 2. Spatial Mapping Alignment
Before performing joins, apply the standard spelling mapping lookup table to ensure join keys align:

| Raw SHC District Name | Standard Soil/Rainfall key |
|-----------------------|----------------------------|
| `AHILYANAGAR` / `AHMADNAGAR` | `Ahmednagar` |
| `BID` | `Beed` |
| `GONDIYA` | `Gondia` |
| `NASIK` | `Nashik` |
| `RAIGARH` / `RAIGADH` | `Raigad` |
| `OSMANABAD` / `DHARASHIV` | `Osmanabad` (or Dharashiv) |
| `AURANGABAD` / `CHHATRAPATI SAMBHAJINAGAR` | `Aurangabad` |
| `AMARAVATI` | `Amravati` |
| `JALANA` | `Jalna` |
| `SINDHUDURGA` | `Sindhudurg` |
