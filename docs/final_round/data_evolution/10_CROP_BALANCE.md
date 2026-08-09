# Krishi Sarathi: Crop Balance & Skewness Analysis

This report documents the class balance and skewness within the candidate labeled crop dataset.

---

## 1. Class Frequencies (Crop-Fertilizer Raw)
The 4,513-row `crop_fertilizer_dataset_raw.csv` contains crop labels, but displays severe class imbalances:

- **Sugarcane**: 1,010 records (22.38%)
- **Wheat**: 859 records (19.03%)
- **Cotton**: 650 records (14.40%)
- **Jowar**: 394 records (8.73%)
- **Maize**: 350 (7.76%)
- **Rice**: 309 (6.85%)
- **Groundnut**: 177 (3.92%)
- **Tur**: 126 (2.79%)
- **Grapes / Ginger**: 250 (5.54%)
- **Urad / Moong**: 198 (4.38%)
- **Soybean**: 45 (1.00%)
- **Masoor**: 12 (0.27%)

- **Shannon Entropy of Crops**: **2.15 bits** (V3 has 4.45 bits).
- **Imbalance Ratio (Max/Min)**: **84.1**.

---

## 2. Imbalance Risks
Training a model on this highly skewed dataset presents major risks:
1.  **Sugarcane Bias**: The model over-represents Sugarcane. Under standard test conditions, it will default to recommending sugarcane because it represents nearly a quarter of all training samples.
2.  **Poor Minority Generalization**: Crops like Soyabean (1%) and Masoor (0.2%) will suffer from high false-negative rates due to lack of splitting support.

---

## 3. Mitigation Strategies
If this dataset is ever integrated, we must enforce:
- **Class Weights**: Apply inversely proportional Gini weights.
- **Stratified Downsampling**: Cap maximum samples per class to 100 to enforce a uniform distribution.
