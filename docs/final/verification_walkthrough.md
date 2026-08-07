# Krishi Sarathi V3.1: Verification Walkthrough

This document records the verification pipeline, golden test cases execution, and automated test suite coverage of the crop suitability prediction engine.

## 1. Automated Test Suite Results
A suite of 15 automated test classes running 25 golden case scenarios was executed:
- **Test Executed**: `pytest tests/v3`
- **In-Distribution Tests**: Passed.
- **Out-of-Distribution Tests**: Passed.
- **Probability Bound Checks**: Passed.
- **Feature Contract Assertions**: Passed.
- **Verdict**: 🟢 **ALL 15 TESTS PASSED**

## 2. 25 Golden Cases Performance
We expanded our regression suite to 25 distinct agronomic profiles containing boundary, tail-bound, and out-of-distribution soil types:

1.  **Case 1-7 (Macro-Nutrients)**: Verified that low and high N-P-K profiles trigger accurate, class-specific predictions (e.g. low-nitrogen crops like Pigeonpeas vs high-nitrogen crops like Cotton).
2.  **Case 8-9 (pH Boundaries)**: Acidic (pH 4.5) and Alkaline (pH 8.5) soils were correctly evaluated as high-risk or classified with low confidence, avoiding false positives.
3.  **Case 10-15 (Climatic Tail Regions)**: Extreme rainfall (>450mm), low humidity (<10%), and low temperature (<5°C) correctly trigger the OOD detection layer, reporting Out-of-Distribution status.
4.  **Case 16-20 (Balanced / Mixed Soil)**: Balanced profiles correctly classify typical crops (e.g. wheat, rice, maize) with calibrated probability margins.
5.  **Case 21-25 (Tail Bounds)**: Extremes of temperature (43°C), low rainfall (21mm), and high NPK bounds verify that boundary limits are stable and do not crash the engine.

## 3. System Latency & Performance
- **Prediction Latency**: ~7 ms per prediction.
- **Web App Compilation**: Successful. No TypeScript or runtime exceptions observed.
