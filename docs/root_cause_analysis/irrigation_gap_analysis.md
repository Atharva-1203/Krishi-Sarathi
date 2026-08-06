# Irrigation Gap Analysis & Omitted Variable Bias

### The Problem:
Sugarcane is grown in Solapur (mean rainfall 481mm) and Sangli (mean rainfall 514mm). In the dataset, sugarcane records in these districts have rainfall values of 1000mm and 700mm respectively.
This occurs because:
1.  **Omitted Irrigation Feature**: The dataset does not include a binary indicator for `Irrigation_Available`.
2.  **Model Blindness**: The model is blind to whether water comes from rainfall or river-fed canals.
3.  **Inference Distortion**: If a farmer has high NPK but dry conditions, the model assumes irrigation is implicitly present (since high NPK is typically applied in irrigated sugarcane tracts) and recommends Sugarcane, which is agronomically dangerous for dryland farming.
