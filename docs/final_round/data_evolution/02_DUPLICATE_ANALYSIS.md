# Krishi Sarathi: Duplicate & Near-Duplicate Forensics

This report details dataset redundancy and feature-vector overlaps.

---

## 1. Redundancy Metrics

Profiling of the 7.9L government database reveals high duplication rates:

- **Exact Duplicate Rows**: 7,271 records ($0.93\%$) are exact copies.
- **Sample profiling (20,000 records)**:
  - Exact duplicates: 7 ($0.03\%$)
  - Feature-only coordinate duplicates (`N, P, K, pH` matching): 1,154 ($5.77\%$).

---

## 2. Near-Duplicate Analysis
Using normalized continuous features $[N, P, K, pH]$, we calculated pairwise Euclidean distances on a 1,000-sample fold:
- **Near-duplicates at threshold $< 0.02$**: 499,488 pairs.
- **Interpretation**: This extremely high density indicates that many records represent identical or near-identical soil chemistry measurements repeated across multiple rows.

---

## 3. Repeated Records Interpretation
The presence of thousands of near-duplicate feature vectors indicates:
1.  **Shared Village Averages**: Soil health card entries are often copy-pasted or auto-filled with village averages when individual farm tests are missing.
2.  **Duplicated Ingestion**: Ingesting the same survey cycle multiple times under slightly different village transliterations.
3.  **Monoculture Overlap**: Large clusters of farms in Western Maharashtra cultivating sugarcane on highly similar soil types, leading to identical soil telemetry coordinates.
