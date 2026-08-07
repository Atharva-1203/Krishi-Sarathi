# Map Data Audit

This document inventories the Maharashtra GIS map boundaries, datasets, and static analytics definitions.

## 1. Boundary Files
*   **GeoJSON File**: `frontend/public/maps/maharashtra.geojson` (`5.9 MB`) containing boundary paths for the 36 districts of Maharashtra.
*   **SVG Map File**: `frontend/public/maps/maharashtra.svg` (`691 KB`).

## 2. Interactive Map Layers
*   **Rainfall**: Displays colored bands based on district average rainfall.
*   **Soil Health**: Displays colored bands based on average soil card parameters.
*   **Soil Type**: Groups soils by clayey, sandy, and lateritic categories.

## 3. Decoupling Metrics
*   Map components reference `DISTRICT_METRICS` in `frontend/src/components/maps/DistrictPanel.tsx` and `frontend/public/maps/district_metadata.json`.
*   These statistics are used purely for agricultural intelligence and never fed into the ML recommendation system.
