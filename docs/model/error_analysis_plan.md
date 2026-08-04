# Error Analysis Framework

This document outlines how model classification errors will be isolated and diagnosed.

## 1. Overlap Analysis
- Parse the multi-class Confusion Matrix.
- Focus on crops with high similarity (e.g., Urad vs Moong vs Soybean, or Sorghum vs Pearl Millet) to see if the model confuses them under borderline rainfall values.

## 2. Low-Confidence Auditing
- Isolate test samples where the top prediction probability is `< 0.40`.
- Audit these samples for outlier soil parameters (e.g. highly acidic pH < 5.0) or extreme weather.

## 3. District-Wise Error Auditing
- Group classification error rates by `District` to verify if model performs poorly in satara or sangli due to spatial data density discrepancies.
