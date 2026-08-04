# Krishi Sarathi - Data Pipeline Design

This document details the cleaning, processing, and merging pipelines.

## 1. Pipeline Stages
1. **Extraction (Stage 1)**: Daily HTML rainfall parser and GraphQL/KML geoserver queries to fetch point nutrients.
2. **Standardization (Stage 2)**: District spelling harmonization, filtering states, handling missing values, and date parsing.
3. **Integration (Stage 3)**: Spatially and temporally merging Point Soil Chemistry + Taluka Soil Physical Maps + District Season Rainfall.
4. **Feature Engineering (Stage 4)**: Normalization, encoding categorical keys, log-transforming EC, and spatial clustering.
