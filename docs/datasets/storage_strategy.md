# Krishi Sarathi - Data Storage Strategy

This document describes how the project manages large datasets (such as raw soil KML files) that exceed the GitHub file size limits.

## 1. Large Files Constraints
- **GitHub limit**: GitHub restricts files larger than 100 MB, and issues warnings for files larger than 50 MB.
- **Krishi Sarathi dataset sizes**:
  - `datasets/raw/soil_health/`: Contains 186 georeferenced KML files totaling 1.73 GB. Several files (e.g. Satara, Nashik, Chandrapur) exceed 50 MB individually.
  - `datasets/processed/soil_health/soil_health_database.csv`: Size is 87.8 MB.

## 2. Storage Guidelines

### A. Git LFS (Large File Storage)
For files exceeding 50 MB that need to remain tracked under version control, configure Git LFS:
```bash
# Initialize LFS
git lfs install

# Track large files
git lfs track "datasets/raw/soil_health/*.kml"
git lfs track "datasets/processed/soil_health/*.csv"

# Commit attributes
git add .gitattributes
```

### B. Raw Cache Ignore (Recommended)
Alternatively, keep large raw dataset directories ignored in `.gitignore` and write python down-stream fetch scripts (`scripts/download_data.py`) to download the raw KML archive from public cloud object storage (e.g., Google Cloud Storage bucket) during pipeline initialization.
