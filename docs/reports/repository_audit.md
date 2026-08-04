# Krishi Sarathi - Repository Audit Report

This report documents the state and classification of all files in the Krishi Sarathi workspace.

## 1. File Count and Volume
- **Total Audited Files**: 288 files
- **Total Workspace Size**: ~1.85 GB
- **Primary Data Layer**:
  - `datasets/raw/soil_health/`: 186 KML files (1.73 GB total) - Geolocated Soil Health Cards.
  - `datasets/processed/soil_health/soil_health_database.csv`: 87.8 MB (779,144 geolocated entries).
  - `datasets/processed/rainfall/`: Historical season rainfall (2015-2025).
  - `datasets/processed/bhoomi/`: Taluka-level soil physical maps (CSVs).

## 2. File Classifications

- **Keep (Production Ready)**:
  - All processed CSV databases and datasets in `datasets/processed/`.
  - All documentation markdown guides and Excel registries in `docs/`.
  
- **Archive (Obsolete / Duplicate)**:
  - Moved duplicate APY PDF `DISTRICTWISE APY-2021-22 (1).pdf` to `datasets/archive/duplicate_pdfs/`.
  - Relocated duplicate markdown reports to `datasets/archive/duplicate_reports/`.

## 3. Engineering Recommendations
- **Git LFS**: Configure Git LFS to track files exceeding 50 MB before pushing to GitHub.
- **Reproducibility**: Ensure all pipeline scripts in `scripts/` are implemented using clean target directories to allow zero-configuration runs.
