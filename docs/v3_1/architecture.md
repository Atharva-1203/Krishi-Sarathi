# V3.1 Upgrade: System Architecture Design

This document details the architectural layout of the V3.1 Decision Support System.

## 1. Upgraded Block Diagram

```
                              +--------------------------+
                              |      Farmer's Input      |
                              +-------------+------------+
                                            |
                                            v
                              +--------------------------+
                              |      V3.1 Predictor      |
                              +------+------------+------+
                                     |            |
             +-----------------------+            +-----------------------+
             v                                                            v
+--------------------------+                                 +--------------------------+
|  Calibrated Classifier   |                                 | AgronomicProfileMatcher  |
|      (ExtraTrees)        |                                 | (Statistical Similarity) |
+------------+-------------+                                 +------------+-------------+
             |                                                            |
             v (Calibrated Probas)                                        v (Compatibility Scorecard)
+-------------------------------------------------------------------------+---------------------+
|                                   V3.1 Unified Decision Layer                                 |
+-----------------------------------------------------------------------------------------------+
                                                |
                                                v
                              +--------------------------+
                              |  Deep Explanation Engine | (Why/Why-Not, Sensitivity, What-If)
                              +-------------+------------+
                                            |
                                            v
                              +--------------------------+
                              |    V3.1 Visual UI        | (Radar, Heatmap, Distribution bars)
                              +--------------------------+
```

## 2. Component Explanations
1.  **AgronomicProfileMatcher**: Compares the user input to the empirical statistical distributions (minimum, median, standard deviation, Q1, Q3, p10, p90) calculated from the training set for all 22 crop classes.
2.  **Crop Profiles & Metadata**: Provides crop taxonomy and descriptive characteristics without altering ML predictions.
3.  **What-If & Sensitivity Analyzers**: Allows on-the-fly perturbations to see class boundaries shifting.
