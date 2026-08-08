# Krishi Sarathi: Golden Demo Scenarios

This guide documents 15 realistic agricultural scenarios to showcase during live judging rounds.

---

### Scenario 1: Rice Scenario (High Rainfall/Humidity)
- **Inputs**: `N=90, P=42, K=43, temp=23.6, humidity=80.3, pH=6.7, rainfall=220.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Rice** (Calibrated Prob: 0.8572)
- **Expected Top 5**: Rice (85.7%), Jute (7.6%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%)
- **Key Showcase Metric**: Suitability Margin Gap = 78.07%
- **Limiting Parameter to Highlight**: `humidity` (Fit score: 72.3%, Crop Median: 82.19)

### Scenario 2: Chickpea Scenario (Dry/Low Nutrients)
- **Inputs**: `N=40, P=60, K=80, temp=18.0, humidity=16.0, pH=7.2, rainfall=75.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Chickpea** (Calibrated Prob: 0.9328)
- **Expected Top 5**: Chickpea (93.3%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Maize (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.89%
- **Limiting Parameter to Highlight**: `P` (Fit score: 78.5%, Crop Median: 68.00)

### Scenario 3: Cotton Scenario (High Nitrogen/Dry)
- **Inputs**: `N=120, P=39, K=20, temp=23.9, humidity=78.4, pH=6.8, rainfall=80.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Cotton** (Calibrated Prob: 0.9338)
- **Expected Top 5**: Cotton (93.4%), Lentil (0.4%), Pigeonpeas (0.4%), Maize (0.4%), Rice (0.4%)
- **Key Showcase Metric**: Suitability Margin Gap = 93.00%
- **Limiting Parameter to Highlight**: `P` (Fit score: 80.0%, Crop Median: 46.00)

### Scenario 4: Maize Scenario (Balanced Mid-Range)
- **Inputs**: `N=70, P=48, K=20, temp=22.0, humidity=65.0, pH=6.2, rainfall=90.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Maize** (Calibrated Prob: 0.9352)
- **Expected Top 5**: Maize (93.5%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.3%), Rice (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 93.10%
- **Limiting Parameter to Highlight**: `N` (Fit score: 91.7%, Crop Median: 76.00)

### Scenario 5: Grapes Scenario (High P-K Fruit)
- **Inputs**: `N=23, P=130, K=200, temp=23.8, humidity=82.0, pH=6.0, rainfall=70.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Grapes** (Calibrated Prob: 0.9322)
- **Expected Top 5**: Grapes (93.2%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Apple (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.83%
- **Limiting Parameter to Highlight**: `P` (Fit score: 94.8%, Crop Median: 133.00)

### Scenario 6: Apple Scenario (Cool High P-K Fruit)
- **Inputs**: `N=20, P=125, K=195, temp=22.0, humidity=92.0, pH=5.9, rainfall=110.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Apple** (Calibrated Prob: 0.9321)
- **Expected Top 5**: Apple (93.2%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Grapes (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.82%
- **Limiting Parameter to Highlight**: `K` (Fit score: 68.4%, Crop Median: 200.00)

### Scenario 7: Mango Scenario (Warm Dry Fruit)
- **Inputs**: `N=20, P=25, K=30, temp=32.0, humidity=50.0, pH=5.8, rainfall=95.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Mango** (Calibrated Prob: 0.9330)
- **Expected Top 5**: Mango (93.3%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Coconut (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.91%
- **Limiting Parameter to Highlight**: `P` (Fit score: 96.7%, Crop Median: 27.50)

### Scenario 8: Lentil Scenario (Dry Pulse)
- **Inputs**: `N=15, P=58, K=18, temp=25.0, humidity=64.0, pH=6.8, rainfall=45.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Lentil** (Calibrated Prob: 0.9229)
- **Expected Top 5**: Lentil (92.3%), Mothbeans (1.3%), Blackgram (0.5%), Mungbean (0.4%), Maize (0.4%)
- **Key Showcase Metric**: Suitability Margin Gap = 91.02%
- **Limiting Parameter to Highlight**: `P` (Fit score: 72.0%, Crop Median: 68.00)

### Scenario 9: Pomegranate Scenario (Warm Dry Fruit)
- **Inputs**: `N=35, P=20, K=40, temp=22.0, humidity=88.0, pH=6.8, rainfall=105.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Pomegranate** (Calibrated Prob: 0.9332)
- **Expected Top 5**: Pomegranate (93.3%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Cotton (0.4%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.94%
- **Limiting Parameter to Highlight**: `N` (Fit score: 69.9%, Crop Median: 18.00)

### Scenario 10: Jute Scenario (Warm Wet Fiber)
- **Inputs**: `N=80, P=45, K=40, temp=26.0, humidity=79.0, pH=6.5, rainfall=180.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Jute** (Calibrated Prob: 0.9205)
- **Expected Top 5**: Jute (92.0%), Rice (1.7%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 90.32%
- **Limiting Parameter to Highlight**: `temperature` (Fit score: 83.2%, Crop Median: 24.97)

### Scenario 11: Coffee Scenario (High Rainfall/Plantation)
- **Inputs**: `N=100, P=28, K=32, temp=25.0, humidity=55.0, pH=6.7, rainfall=150.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Coffee** (Calibrated Prob: 0.9343)
- **Expected Top 5**: Coffee (93.4%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Maize (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 93.05%
- **Limiting Parameter to Highlight**: `K` (Fit score: 90.8%, Crop Median: 30.00)

### Scenario 12: Watermelon Scenario (Warm Dry Melon)
- **Inputs**: `N=100, P=15, K=50, temp=25.0, humidity=88.0, pH=6.4, rainfall=55.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Watermelon** (Calibrated Prob: 0.9332)
- **Expected Top 5**: Watermelon (93.3%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.4%), Muskmelon (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 92.93%
- **Limiting Parameter to Highlight**: `humidity` (Fit score: 77.4%, Crop Median: 85.03)

### Scenario 13: Blackgram Scenario (Moderate Pulse)
- **Inputs**: `N=50, P=70, K=20, temp=28.0, humidity=65.0, pH=7.2, rainfall=70.0`
- **OOD Status**: `NORMAL`
- **Expected Top Recommendation**: **Blackgram** (Calibrated Prob: 0.9351)
- **Expected Top 5**: Blackgram (93.5%), Lentil (0.4%), Pigeonpeas (0.4%), Mothbeans (0.3%), Kidneybeans (0.3%)
- **Key Showcase Metric**: Suitability Margin Gap = 93.09%
- **Limiting Parameter to Highlight**: `N` (Fit score: 88.6%, Crop Median: 41.00)

### Scenario 14: Caution Boundary Scenario (pH 4.0)
- **Inputs**: `N=50, P=50, K=50, temp=25.0, humidity=60.0, pH=4.0, rainfall=150.0`
- **OOD Status**: `CAUTION`
- **Expected Top Recommendation**: **Jute** (Calibrated Prob: 0.3926)
- **Expected Top 5**: Jute (39.3%), Pigeonpeas (8.9%), Papaya (4.5%), Mothbeans (4.5%), Mango (4.0%)
- **Key Showcase Metric**: Suitability Margin Gap = 30.39%
- **Limiting Parameter to Highlight**: `ph` (Fit score: 3.9%, Crop Median: 6.71)

### Scenario 15: Out-of-Scope Rejection Scenario (pH 2.0)
- **Inputs**: `N=50, P=50, K=50, temp=25.0, humidity=60.0, pH=2.0, rainfall=150.0`
- **OOD Status**: `OUT_OF_SCOPE` (Validation Rejection)
- **Expected Behavior**: Server blocks input with 422, showing validation errors: `Field 'ph' is outside the model's training range.`
- **Judge Takeaway**: Dynamic safety guard prevents numerical errors on impossible values.
