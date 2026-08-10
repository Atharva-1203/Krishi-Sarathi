# Data Expansion & Forensic Strategy (V5 Final Evolution)

This document records our scientific strategy for dataset scaling and re-investigation.

---

## 1. 2,200 Labeled Samples vs. 779K Soil Cards
- **The Predictor Dataset (2,200 Rows)**: A balanced, location-blind crop recommendation corpus containing 22 crop classes with exactly 100 rows each. Features cover N, P, K, pH, temperature, humidity, and rainfall.
- **The Soil Health Card Database (779,144 Rows)**: An unlabeled regional soil diagnostic registry. Scanning its schema confirms it lacks humidity and rainfall measurements, and has no target crop label fields.

---

## 2. Integration Strategies Evaluated

### Strategy A: Direct Supervised Merge (No-Go)
Concatenating the datasets directly requires assigning pseudo-labels based on district crop dominance, or imputing climate fields with static defaults. This introduces geographic leakage, causing the ML models to memorize location proxies rather than learn crop agronomy bounds.

### Strategy B: Unsupervised Representations (Go)
We extract representation vectors (e.g. soil quality indices and N-P-K clusters) from the 779k database, which are served as independent context layers in our Map Observatory.

### Strategy C: Contextual Similarity Bridge (Go)
For any prediction query, the system retrieves the nearest regional soil cards by computing the Euclidean distance in N-P-K-pH space.
