# 🤖 Model Card — ExtraTrees Crop Classifier (V3.1)

## Model Details
- **Model Type**: ExtraTreesClassifier (Extremely Randomized Trees)
- **Probability Calibration**: Platt Sigmoid Scaling (`CalibratedClassifierCV`)
- **Number of Estimators**: 100
- **Input Features (7)**: $N$ (kg/ha), $P$ (kg/ha), $K$ (kg/ha), Temperature (°C), Humidity (%), pH, Rainfall (mm)
- **Output Taxonomy**: 22 Crop Classes (or 43 expanded classes)
- **Inference Latency**: ~1.3 ms per sample

## Performance Summary
- **Stratified Holdout Accuracy**: **98.86%**
- **Macro F1-Score**: **98.86%**
- **Multi-Class Brier Score**: **0.0135**
- **Expected Calibration Error (ECE)**: **0.0494**
- **Sugarcane Default Bias**: **0.0%**
