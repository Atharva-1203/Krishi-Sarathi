# Large-Scale Training Data Integration

This document details the multi-strategy integration plan to utilize the 779k soil health observations in our architecture.

---

## 1. Selected Integration Strategies

Rather than forcing the raw unlabeled soil health cards directly into predictor training, we implement a decoupled hybrid system:

### STRATEGY C: Unsupervised Representation & Clustering
- The 779k Soil Health Cards are parsed to model the empirical soil distribution of Maharashtra.
- We run K-Means clustering and PCA on the clean soil subset ($722,342$ rows) to map soil quality scores and organic carbon distributions. This establishes regional soil quality baselines displayed in the map panels.

### STRATEGY D: Nearest-Neighbour Similarity Retrieval
- For a given prediction query, the system matches the farmer's continuous soil attributes ($N, P, K$, pH) against the 722,342-record database.
- It displays the typical parameters of the nearest regional cards to provide context on whether the farmer's soil is typical for their district.

### STRATEGY E: Decoupled Observatory
- Weather (IMD precipitation anomalies) and crop yields (DES production area/yields) are joined at the district level to map agricultural indicators.
