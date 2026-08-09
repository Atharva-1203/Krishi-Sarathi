# Krishi Sarathi: Out-of-Distribution (OOD) Analysis

This report documents the range checking and validation boundaries.

---

## 1. Out-of-Distribution Philosophy
When a query contains variables that sit outside the training manifold (e.g. soil Nitrogen = 900), the model must not return a high-confidence recommendation. It should flag the input as anomalous and explain why.

---

## 2. OOD States & Thresholds

We classify input scopes into three distinct bands:

### A. NORMAL
- **Threshold**: Inputs sit within standard training bounds.
- **Action**: Predicts crops with standard calibrated probabilities.

### B. CAUTION
- **Threshold**: Inputs are within valid ranges, but sit in the tail ($p_{01}$ or $p_{99}$) of the training distribution:
  - $N > 140$ or $P > 145$ or $K > 205$
  - Temperature $< 10^\circ\text{C}$ or Humidity $< 15\%$
  - pH $< 4.5$ or $> 8.5$
  - Rainfall $< 30\text{mm}$ or $> 300\text{mm}$
- **Action**: Runs prediction but attaches warnings detailing which parameters are extreme.

### C. OUT_OF_DISTRIBUTION
- **Threshold**: Inputs exceed physical scale (e.g., pH $< 0.0$ or $> 14.0$, or continuous parameter outside range gates).
- **Action**: Blocks execution at the request boundary, returning HTTP 422.
