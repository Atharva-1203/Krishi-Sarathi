# Semi-Supervised Learning Analysis (V5 Final Evolution)

This document reports our evaluation of semi-supervised and self-supervised learning methods on the unlabelled Soil Health Cards database.

---

## 1. Candidate Semi-Supervised Methods Evaluated

### A. Pseudo-Labeling (Self-Training)
- **Methodology**: Train a champion ExtraTrees model on the 2,200 labeled observations. Query the model on the 703,922 valid soil card records. Select predictions with probability $> 95\%$ and merge them back into the training set as `label_type = pseudo`.
- **Verdict**: **Rejected.** Because of the massive distribution shifts, the model assigns high confidence pseudo-labels to cash crops (sugarcane, wheat) in skewed districts. This reinforces frequency-driven biases, causing prediction entropy to collapse.

### B. Autoencoder Representation Embeddings
- **Methodology**: Train a 4-layer fully connected Autoencoder on the 703,922 unlabelled cards to learn a 3-dimensional soil latent representation ($z_1, z_2, z_3$). Use these latent coordinates as extra features in the crop predictor.
- **Verdict**: **Rejected.** The latent representations do not map to physical agronomic boundaries. Models trained with autoencoder embeddings fail to generalize when queried on different soil compositions.

---

## 2. Safety and Transparency Rules
To prevent dataset theatre and ensure scientific auditability, any semi-supervised integrations must follow these rules:
1.  **Mark Labels Clearly**: The dataset schema must contain a `label_type` column distinguishing `observed` vs `pseudo` rows.
2.  **Explicit Exclusion**: User queries on the dashboard must display the real training sample size ($2,200$) separate from unlabelled registry counts ($779K$).
