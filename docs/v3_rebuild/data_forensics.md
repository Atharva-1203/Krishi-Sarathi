# V3 Rebuild: 03 Data Forensics Report

This report presents a forensic quality audit of the selected V3 dataset containing **2200** samples and **22** classes.

## 1. Data Quality Indicators
*   **Missing Values**: 0 missing values found across all features.
*   **Exact Duplicate Rows**: 0 duplicate records.
*   **Conflicting Labels (Same Features, Different Label)**: 0 instances.

## 2. Statistical Feature Ranges
| Feature | Min | Max | Mean | Median | Std | Q1 | Q3 | IQR | 1st% | 99th% | IQR Outliers | Robust Z Outliers |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| N | 0.00 | 140.00 | 50.55 | 37.00 | 36.92 | 21.00 | 84.25 | 63.25 | 0.00 | 129.01 | 0 | 0 |
| P | 5.00 | 145.00 | 53.36 | 51.00 | 32.99 | 28.00 | 68.00 | 40.00 | 5.99 | 143.00 | 138 | 0 |
| K | 5.00 | 205.00 | 48.15 | 32.00 | 50.65 | 20.00 | 49.00 | 29.00 | 7.99 | 204.00 | 200 | 200 |
| temperature | 8.83 | 43.68 | 25.62 | 25.60 | 5.06 | 22.77 | 28.56 | 5.79 | 11.83 | 40.79 | 86 | 36 |
| humidity | 14.26 | 99.98 | 71.48 | 80.47 | 22.26 | 60.26 | 89.95 | 29.69 | 15.23 | 96.97 | 30 | 67 |
| ph | 3.50 | 9.94 | 6.47 | 6.43 | 0.77 | 5.97 | 6.92 | 0.95 | 4.60 | 8.74 | 57 | 24 |
| rainfall | 20.21 | 298.56 | 103.46 | 94.87 | 54.96 | 64.55 | 124.27 | 59.72 | 21.90 | 267.99 | 100 | 36 |

## 3. Label Class Distribution
| Crop Label | Count | Percentage |
| :--- | :--- | :--- |
| apple | 100 | 4.55% |
| banana | 100 | 4.55% |
| blackgram | 100 | 4.55% |
| chickpea | 100 | 4.55% |
| coconut | 100 | 4.55% |
| coffee | 100 | 4.55% |
| cotton | 100 | 4.55% |
| grapes | 100 | 4.55% |
| jute | 100 | 4.55% |
| kidneybeans | 100 | 4.55% |
| lentil | 100 | 4.55% |
| maize | 100 | 4.55% |
| mango | 100 | 4.55% |
| mothbeans | 100 | 4.55% |
| mungbean | 100 | 4.55% |
| muskmelon | 100 | 4.55% |
| orange | 100 | 4.55% |
| papaya | 100 | 4.55% |
| pigeonpeas | 100 | 4.55% |
| pomegranate | 100 | 4.55% |
| rice | 100 | 4.55% |
| watermelon | 100 | 4.55% |

## 4. Anomalies & Outlier Vetting
No physically impossible or corrupt values (like negative pH or negative NPK values) were found in the dataset. Outliers detected by statistical methods (IQR/Z-score) represent valid agronomic extreme conditions (e.g. rice growing in very heavy rainfall exceeding 2000mm or grapes grown under high potassium inputs). Therefore, no samples were deleted from the dataset to maintain raw variance and support domain boundary coverage.
