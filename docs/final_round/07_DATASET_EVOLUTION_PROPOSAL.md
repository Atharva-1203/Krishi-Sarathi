# Krishi Sarathi: Dataset Evolution Proposal

This report evaluates our data strategy options for the Final Round Upgrade (Phase 10).

---

## 1. Data Integration Strategies

| Option | Strategy | Benefits | Drawbacks | Recommendation |
| :--- | :--- | :--- | :--- | :---: |
| **Option A** | Blind merge of 2,200 and 7.9 lakh rows | High sample count | Destabilizes boundaries, introduces regional bias | ❌ REJECTED |
| **Option B** | Synthetic data augmentation on V3 data | More training rows | Destabilizes validation accuracy and calibration | ❌ REJECTED |
| **Option C** | **Decoupled Architecture** (Separate datasets) | Preserves V3 calibration; powers Map GIS layer | Decoupled prediction flows | **🟢 RECOMMENDED** |
| **Option D** | Pre-training on 7.9L and fine-tuning on V3 | Uses large scale | High model size, lacks climate features during pre-training | ❌ REJECTED |

---

## 2. Recommended Strategy details

We recommend **Option C (Decoupled Data Architecture)**:
1.  **Prediction Model**: Train the live Crop Predictor strictly on the balanced 2,200-sample dataset, maintaining its 99.39% accuracy, low Brier score, and zero geographical bias.
2.  **GIS Map layer**: Feed the 7.9 lakh government database averages exclusively into the interactive choropleth map. This enables rich regional analytics (diversity index, historical crop dominance, soil averages) without contaminating live predictions.
