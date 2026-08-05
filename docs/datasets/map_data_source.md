# Maharashtra GIS Boundaries Data Source

Details on coordinates extraction and cleaning procedures.

## 1. Geospatial Sources
- **Source**: GADM / India State boundary shapefile collections (WGS84 EPSG:4326 projection format).
- **Format**: Cleaned GeoJSON (`assets/maps/maharashtra.geojson`).

## 2. Spatial Projection & Joins
- **Centroids**: Calculated arithmetic polygons coordinates centroids.
- **District Joins**: Mapped property properties (e.g. `district_name`, `division`, `district_code`) to join with Soil Health Card records (779K cards) and Pune Division rainfalls.
