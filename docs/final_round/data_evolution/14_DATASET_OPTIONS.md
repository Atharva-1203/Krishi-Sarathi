# Krishi Sarathi: Dataset Options Comparison

This document evaluates dataset expansion strategies for the Final Round.

---

## 1. Option Comparison Matrix

We profile five candidate options:

### OPTION A: Keep Current 2,200 Dataset
- **Samples**: 2,200
- **Advantages**: Perfectly balanced, verified accuracy, zero spatial bias.
- **Disadvantages**: Small size can look less impressive at first glance.
- **Leakage/Bias Risk**: None.
- **Scientific Defensibility**: High.

### OPTION B: Expand Using Labeled Repositories
- **Samples**: ~6,713
- **Advantages**: Increases sample size; keeps clean features.
- **Disadvantages**: Requires downsampling to resolve sugarcane bias.
- **Leakage/Bias Risk**: Low (requires strict filtering).
- **Scientific Defensibility**: Moderate.

### OPTION C: Decoupled Data Architecture (Option A + Option C)
- **Samples**: 2,200 (Predictor) | 779,144 (Map)
- **Advantages**: Protects predictor validation, while displaying government-scale analytics.
- **Disadvantages**: decpouled workflows.
- **Leakage/Bias Risk**: None.
- **Scientific Defensibility**: **Highest (Recommended).**

### OPTION D: Blind Merge of 7.9L Database
- **Samples**: ~780,000
- **Advantages**: Huge sample size.
- **Disadvantages**: Introduces extreme noise, spatial leakage, and sugarcane bias.
- **Leakage/Bias Risk**: Extreme.
- **Scientific Defensibility**: **Invalid.**
