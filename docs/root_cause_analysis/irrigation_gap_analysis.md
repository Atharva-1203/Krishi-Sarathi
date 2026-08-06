# Irrigation Gap Analysis & Omitted Variable Bias

### The Problem:
Sugarcane is grown in Solapur (mean rainfall 481mm) and Sangli (mean rainfall 514mm). In the dataset, sugarcane records in these districts show higher rainfall numbers.
This occurs because:
1.  **Omitted Irrigation Feature**: The dataset does not include a binary indicator for `Irrigation_Available`.
2.  **Model Blindness**: The model is blind to whether water comes from rainfall or river-fed canals.
3.  **Inference Distortion**: The dataset records rainfall but does not explicitly indicate irrigation availability. Therefore, historical Sugarcane records from lower-rainfall districts may reflect irrigated cultivation, a distinction the model cannot infer.
