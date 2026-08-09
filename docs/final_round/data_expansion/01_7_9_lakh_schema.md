# Government Database Schema Report (7.9L)

This document profiles the file schema and continuous variables of the Soil Health Card database.

---

## 1. Physical Schema Overview
- **Path**: [`datasets/processed/soil_health/soil_health_database.csv`](file:///d:/Techrush/datasets/processed/soil_health/soil_health_database.csv)
- **Total Records**: 779,144
- **Total Columns**: 18

---

## 2. Statistical Profiles of Core Variables

### Nitrogen (N) (kg/ha)
- **Mean**: 217.56 | **Std**: 547.21 | **Missing**: 0.006% | **Uniques**: 41,357
- **Percentiles**:
  - p01: 22.60 | p05: 77.77
  - p25: 148.00 | p50: 193.17 | p75: 253.00
  - p95: 414.16 | p99: 681.43
  - Min: -239.59 | Max: 278,278.0

### Phosphorus (P) (kg/ha)
- **Mean**: 28.19 | **Std**: 242.59 | **Missing**: 0.024% | **Uniques**: 36,073
- **Percentiles**:
  - p01: 1.82 | p05: 4.61
  - p25: 10.81 | p50: 16.35 | p75: 25.65
  - p95: 92.32 | p99: 198.06
  - Min: -119.46 | Max: 193,381.0

### Potassium (K) (kg/ha)
- **Mean**: 431.10 | **Std**: 1307.57 | **Missing**: 0.022% | **Uniques**: 92,182
- **Percentiles**:
  - p01: 31.15 | p05: 127.68
  - p25: 245.28 | p50: 364.77 | p75: 547.67
  - p95: 933.66 | p99: 1309.64
  - Min: 0.00 | Max: 834,062.0

### Soil pH (pH)
- **Mean**: 7.54 | **Std**: 25.20 | **Missing**: 0.027% | **Uniques**: 3,769
- **Percentiles**:
  - p01: 5.00 | p05: 5.93
  - p25: 7.19 | p50: 7.60 | p75: 7.90
  - p95: 8.32 | p99: 8.64
  - Min: -27.31 | Max: 8049.0

### Organic Carbon (OC) (%)
- **Mean**: 1.33% | **Std**: 161.35% | **Missing**: 0.016% | **Uniques**: 15,963
- **Percentiles**:
  - p01: 0.07% | p05: 0.18%
  - p25: 0.34% | p50: 0.47% | p75: 0.66%
  - p95: 1.59% | p99: 3.76%
  - Min: -421.93% | Max: 83,638.0%

### Electrical Conductivity (EC) (dS/m)
- **Mean**: 0.41 | **Std**: 6.57 | **Missing**: 0.003% | **Uniques**: 7,001
- **Percentiles**:
  - p01: 0.02 | p05: 0.05
  - p25: 0.17 | p50: 0.29 | p75: 0.47
  - p95: 0.77 | p99: 1.01
  - Min: -10.67 | Max: 2388.0
