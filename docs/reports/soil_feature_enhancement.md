# Soil Feature Enhancement Recommendations

This document outlines richer statistical aggregations of our 779,144 Soil Health Card records to capture local soil chemistry diversity.

## 1. Advanced Statistical Aggregations
Instead of simple medians, we recommend calculating the following features at the Taluka level:
- **Standard Deviation (SD)**: Measures localized variation in N, P, K. High SD indicates diverse soil quality within the same sub-district.
- **25th & 75th Percentile**: Captures nutrient boundaries (e.g. baseline deficiencies).
- **Shannon Entropy (Micronutrient Diversity)**: Combined index representing the balance of B, Fe, Mn, Cu, Zn, S.
