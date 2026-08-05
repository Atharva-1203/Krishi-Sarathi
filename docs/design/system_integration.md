# Krishi Sarathi - System Integration Report

This document details the end-to-end integration of BHOOMI geoportal soil datasets, Pune Division climate histories, and ExtraTrees classifiers.

## 1. Unified Pipeline Architecture
- **Raw Data Compilation**: Blended 779K Soil Health Cards with cumulative annual rainfalls.
- **ML Preprocessing Engine**: Applies categorical One-Hot transforms and RobustScaling.
- **Explainable API Layer**: Calculates local force contributions using TreeSHAP on queries.
- **Next.js React Client**: Displays confidence bands, interactive SVG maps, and exports printable reports.
