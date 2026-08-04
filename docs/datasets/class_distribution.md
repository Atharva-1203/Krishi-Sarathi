# Target Class and Districts Distribution

This report details the distribution of our target variable `Crop` across the dataset.

## 1. Target Crop Distribution
- Sugarcane: 1,010
- Wheat: 859
- Cotton: 650
- Sorghum: 394
- Maize: 350
- Rice: 309
- Groundnut: 177
- Pigeonpea: 126
- Ginger: 125
- Grapes: 125
- Urad: 99
- Moong: 99
- Chickpea: 78
- Turmeric: 55
- Soyabean: 45
- Masoor: 12

## 2. Class Imbalance Strategy
- **Imbalance**: High class imbalance exists between Sugarcane/Wheat (highly represented) and Soyabean/Masoor (under-represented).
- **Recommendation**:
  - Use **stratified splitting** (already implemented) to ensure all subsets represent minority classes.
  - Employ **class weighting** in loss functions during LightGBM/CatBoost training instead of SMOTE, as synthetic oversampling of soil attributes can create invalid chemical combinations.
