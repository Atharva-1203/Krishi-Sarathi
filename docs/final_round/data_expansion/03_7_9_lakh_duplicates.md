# Government Database Duplicate & Redundancy Report (7.9L)

This document profiles the rate of redundant records and coordinate overlaps in the government Soil Health Card database.

---

## 1. Duplicate Metrics Summary
Our forensic script executed on the government database reveals:
- **Global Exact Duplicates**: 7,271 carbon-copy rows ($0.93\%$).
- **Sample profiling (20,000 rows)**:
  - Exact duplicates: 7 records ($0.03\%$).
  - Coordinate duplicates (N, P, K, pH identical): 1,154 records ($5.77\%$).

---

## 2. Near-Duplicate Analysis
Using normalized continuous features, we ran pairwise Euclidean distance evaluations:
- **Near-duplicates at threshold $< 0.02$**: 499,488 pairs (in the first 1,000 sample fold).
- **Interpretation**: The extreme frequency of near-duplicate vectors indicates that large volumes of entries contain highly similar soil parameter configurations.

---

## 3. Repeated Measurement Explanations
1.  **Administrative Defaults**: In many instances, block-level soil averages are repeated across multiple farm cards when individual soil test telemetry is missing.
2.  **Duplicated Database Ingestion**: Ingesting the same crop survey records under slightly different village spelling transliterations during cycle uploads.
3.  **Monoculture Clusters**: Large contiguous areas of sugarcane cultivation sharing near-identical soil chemistry profiles.
