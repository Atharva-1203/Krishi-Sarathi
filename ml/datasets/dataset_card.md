# Dataset Card - UCI Crop Recommendation Dataset (V3)

## Dataset Details
- **Source**: UCI Machine Learning Repository
- **License**: Public / CC0 (Creative Commons Zero)
- **Size**: 2,200 records (100 samples per crop type).
- **Target Crops (22)**: rice, maize, chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil, pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya, coconut, cotton, jute, coffee.

## Features & Units
1. **N (Nitrogen)**: ratio of Nitrogen content in soil (kg/ha).
2. **P (Phosphorus)**: ratio of Phosphorous content in soil (kg/ha).
3. **K (Potassium)**: ratio of Potassium content in soil (kg/ha).
4. **temperature**: temperature in degree Celsius (°C).
5. **humidity**: relative humidity in percentage (%).
6. **ph**: pH value of the soil.
7. **rainfall**: rainfall in millimeters (mm).

## Preprocessing
- Features are scaled using `StandardScaler` to zero mean and unit variance.
- No geographical identifiers (District, Division, Coordinates) are present in the dataset.
