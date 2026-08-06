# Model Card - Krishi Sarathi V3 crop recommender

## Model Details
- **Developer**: Krishi Sarathi MLOps Team
- **Model Architecture**: Extremely Randomized Trees (ExtraTreesClassifier)
- **Features (7 core agronomic parameters)**: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, Rainfall.
- **Output Target (22 Crop Types)**: apple, banana, blackgram, chickpea, coconut, coffee, cotton, grapes, jute, kidneybeans, lentil, maize, mango, mothbeans, mungbean, muskmelon, orange, papaya, pigeonpeas, pomegranate, rice, watermelon.

## Training Procedure
- **Training dataset**: UCI Crop Recommendation Dataset (2,200 records).
- **Stratified splits**: 80% train (1,760 samples), 20% test (440 samples).
- **Hyperparameters**: `n_estimators=100`, `class_weight="balanced"`.

## Evaluation Metrics
- **Test Accuracy**: 99.55%
- **Balanced Accuracy**: 99.55%
- **Macro-F1 Score**: 99.55%
- **Multi-Class Brier Score**: 0.0124 (indicating high probability calibration).

## Intended Use
- Used as an agronomic decision support system to suggest highly compatible crop profiles based on physical soil chemistry and climate parameters.
- Prohibited for geographical memorization or regional farm-allocation forecasting.
