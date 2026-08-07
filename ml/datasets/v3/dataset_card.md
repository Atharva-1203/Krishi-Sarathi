# Dataset Card: Crop Recommendation V3

## 1. Overview
This dataset is selected for the Krishi Sarathi V3 crop prediction engine to recommend crops based purely on chemical and environmental parameters.

*   **Source**: Kaggle - Crop Recommendation Dataset by Atharva Kabra
*   **Provenance**: Combined Indian agricultural records (rainfall, temperature, pH, soil nutrient measurements).
*   **License**: Open Database License (ODbL)
*   **Total Samples**: 2200
*   **Features**: 7 numerical features
*   **Number of Crop Classes**: 22

## 2. Features and Units
*   `N`: Nitrogen content ratio in soil (kg/ha)
*   `P`: Phosphorous content ratio in soil (kg/ha)
*   `K`: Potassium content ratio in soil (kg/ha)
*   `temperature`: Temperature in degrees Celsius
*   `humidity`: Relative humidity (%)
*   `ph`: pH value of the soil
*   `rainfall`: Rainfall (mm)
*   `label`: Target crop category (string)

## 3. Class Balance
The dataset is perfectly balanced with exactly **100 samples** for each of the 22 crops:

apple, banana, blackgram, chickpea, coconut, coffee, cotton, grapes, jute, kidneybeans, lentil, maize, mango, mothbeans, mungbean, muskmelon, orange, papaya, pigeonpeas, pomegranate, rice, watermelon.

## 4. Selection Criteria
Dataset selected based on feature alignment, class coverage, data quality and suitability for the problem statement. By training on balanced classes, we eliminate model bias towards crops like Sugarcane, which dominated legacy Maharashtra soil datasets.
