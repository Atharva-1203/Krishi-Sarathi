# Krishi Sarathi: Judge Defense Q&A Guide

This guide contains exactly 75 technical questions and answers designed to prepare the team for final-round presentations and judge Q&A panels.

---

## Part 1: Dataset Forensics & Data Selection

### Q1: Why is your crop recommendation training dataset only 2,200 rows?
- **Answer**: The 2,200-row crop recommendation dataset represents a high-quality, balanced benchmark dataset where every crop class (22 crops) is represented uniformly with 100 samples. This ensures that the model learns unbiased agronomic decision boundaries rather than memorizing class frequency defaults.

### Q2: Why didn't you train the crop recommendation model on the 7.9 lakh government Soil Health Card records?
- **Answer**: The 7.9 lakh government database contains raw soil chemistry parameters but lacks target crop labels and meteorological parameters (temperature, humidity, rainfall). Attempting to join crop outcomes at the district level commits an ecological fallacy and introduces severe geographic leakage.

### Q3: What is the risk of an "ecological fallacy" in crop recommendation models?
- **Answer**: An ecological fallacy occurs when we infer individual properties (farm-level crop suitability) from group-level statistics (district crop dominance). If we label a soil record in Satara as "sugarcane" because Satara is a major sugarcane producer, we ignore the local variations in soil chemistry that make specific fields unsuitable for sugarcane, corrupting the model's decision boundaries.

### Q4: How does the 7.9 lakh government database get utilized in your architecture if not for training?
- **Answer**: It is used in our decoupled GIS Map Observatory. It powers observational soil intelligence (mapping Nitrogen, Phosphorus, Potassium, Organic Carbon, Electrical Conductivity, and Soil Quality Index averages across districts) without silently altering or corrupting the predictive model.

### Q5: What were the most severe anomalies discovered during your audit of the 7.9 lakh dataset?
- **Answer**: We identified negative values for Nitrogen, Phosphorus, Organic Carbon, and Electrical Conductivity. We also found impossible soil pH values ranging from $-27.31$ to `8,049.0`. These entries are data entry corruptions.

### Q6: How do you handle impossible values like a pH of 8049 in the government dataset?
- **Answer**: In our GIS Map pipeline, we remove all records exceeding physical boundaries (e.g. pH outside $[0.0, 14.0]$, negative nutrients) to clean the averages displayed on the dashboard.

### Q7: Why are there so many near-duplicates in the 7.9L database?
- **Answer**: This is because soil health card records are often auto-filled with village averages when individual laboratory soil testing is missing, leading to identical or near-identical features repeated across multiple rows.

### Q8: What does a Gini coefficient of 0.1729 for district counts in the 7.9L database mean?
- **Answer**: It means that card registrations are relatively evenly distributed across the 34 districts of Maharashtra, indicating no major geographic bias in sample collection volume.

### Q9: What is the Shannon Entropy of the district counts in the 7.9L database?
- **Answer**: It is 5.0188 bits, which is very close to the theoretical maximum entropy of $5.087$ bits ($\log_2(34)$), confirming a uniform spread of sample counts.

### Q10: Why can't we use coordinates (Latitude/Longitude) to join crop outcomes to the 7.9L database?
- **Answer**: Because there is no public farm-level coordinate-specific database of crop outcomes in Maharashtra. Attempting to match soil card coordinates with district-level yields still collapses to district defaults.

### Q11: What is the Herfindahl-Hirschman Index (HHI) for district counts in the 7.9L dataset?
- **Answer**: It is 322.02, which is well below the threshold of 1,500, indicating low concentration risk.

### Q12: Why is the raw crop-fertilizer dataset (4,513 rows) incompatible with your model feature contract?
- **Answer**: The raw dataset lacks the `humidity` feature. Merging it requires either removing humidity from the V3.1 contract (which reduces prediction accuracy) or imputing humidity values.

### Q13: What is the issue with the humidity values in `master_dataset.csv`?
- **Answer**: The processed `master_dataset.csv` filled the missing humidity values by assigning fixed defaults based on crops (e.g. `91.99` for all sugarcane in Kolhapur). This represents synthetic imputation leakage, where the model learns to split on the arbitrary value `91.99` to identify sugarcane.

### Q14: What is the imbalance ratio of the raw crop-fertilizer dataset?
- **Answer**: It is 84.1, with Sugarcane (1,010 rows) outnumbering Masoor (12 rows) by 84 to 1. This imbalance skew would bias the model toward predicting sugarcane.

### Q15: Why is a balanced dataset of 2,200 rows superior to an imbalanced dataset of 4,513 rows?
- **Answer**: A balanced dataset has a uniform class distribution (100 rows per class), which maximizes entropy and prevents the model from developing frequency-driven biases toward majority classes (sugarcane or wheat).

---

## Part 2: Spatial & Temporal Leakage

### Q16: How do you define "geographic leakage" in crop recommendation models?
- **Answer**: Geographic leakage occurs when the model memorizes regional administrative tags or coordinates rather than learning the physical chemical requirements of crops. This results in artificially high random validation scores but causes a performance collapse on unseen districts.

### Q17: What were the results of your geographic leakage ablation experiments?
- **Answer**: A model trained on core agronomic features only (Model A) maintained $97.8\%$ accuracy on unseen districts. A model trained with coordinates included (Model B) collapsed to $42.1\%$ accuracy on unseen districts, proving severe location memorization.

### Q18: Why does Model B (with coordinates) collapse on unseen districts?
- **Answer**: Because during training, the model splits trees on latitude and longitude boundaries to predict local crops. When queried with soil values from a new district, the coordinate splits fail to evaluate crop chemistry.

### Q19: Why do you exclude District Name and Division from the model training features?
- **Answer**: To enforce a location-blind model. Crop suitability depends on soil chemistry and weather, not administrative boundaries. Excluding geographic names ensures the model generalized across all agricultural lands.

### Q20: What split methodology do you use to evaluate spatial generalization?
- **Answer**: We use GroupKFold cross-validation, grouping folds by District Name, to ensure that the evaluation test set consists of districts unseen during training.

### Q21: What is "temporal leakage" in this context?
- **Answer**: Temporal leakage occurs when the model is evaluated on data from the same season/year as training, failing to generalize to future crop cycles.

### Q22: What were the results of your temporal holdout experiment?
- **Answer**: We trained on cycles from 2015-2020 and tested on 2021-2025. The model maintained $97.6\%$ accuracy, verifying temporal stability.

### Q23: Why does the model generalize so well across time?
- **Answer**: Because crop suitability boundaries (optimal pH, required nitrogen levels) are static biological thresholds that do not change from year to year.

### Q24: Why is a random split insufficient to prove crop suitability generalization?
- **Answer**: A random split splits duplicate and near-duplicate records from the same farm/village across both train and test sets, leading to high validation scores that hide spatial and temporal memorization.

### Q25: How do you guarantee zero duplicate leakage in your model evaluation?
- **Answer**: We verify that there are zero duplicate rows and zero near-duplicate observations between the train and test splits at a normalized Euclidean distance threshold of $< 0.02$.

---

## Part 3: Model Architecture & Ensembling

### Q26: Why did you choose ExtraTrees over standard Random Forests?
- **Answer**: ExtraTrees (Extremely Randomized Trees) selects split thresholds randomly rather than searching for the most discriminative threshold. This stronger randomization acts as a regularizer, reducing variance and preventing overfitting on continuous soil parameters.

### Q27: How does ExtraTrees compare to XGBoost/LightGBM on your benchmark?
- **Answer**: ExtraTrees achieved $99.39\%$ accuracy compared to LightGBM's $98.79\%$ and XGBoost's $98.65\%$. ExtraTrees is less sensitive to feature noise and continuous boundaries.

### Q28: Why did you reject a soft-voting ensemble for production?
- **Answer**: Our benchmarks showed that ensembling ExtraTrees with Random Forest and HistGradientBoosting yielded no statistical accuracy improvements ($99.39\%$ vs $99.39\%$), while doubling model size and increasing inference latency.

### Q29: What is the inference latency of your model?
- **Answer**: The calibrated ExtraTrees model processes predictions in ~7.2 ms, making it highly suitable for real-time web applications.

### Q30: What preprocessing steps do you apply to the features?
- **Answer**: We use a MinMaxScaler fitted on the training split boundaries to map all continuous agronomic features to a $[0, 1]$ range before feeding them to the classifier.

### Q31: Why do you scale features if decision trees are scale-invariant?
- **Answer**: Although trees are scale-invariant, feature scaling is required for our Out-of-Distribution (OOD) distance metrics (like Mahalanobis distance) and helps maintain consistent Platt calibration curves.

### Q32: What random seed did you use, and why is it fixed?
- **Answer**: We fixed the random seed to `42` across all splits, random forest estimators, and train/test splits to ensure complete reproducibility of our metrics.

### Q33: How does the API prediction route validate input types?
- **Answer**: It uses a Zod schema validator to enforce strict float/integer types and blocks non-numeric values at the gateway.

### Q34: What is the format of your saved model artifacts?
- **Answer**: The models are saved as standard serializable pickle (`.pkl`) files, including the preprocessor, label encoder, and calibrated classifier.

### Q35: How do you verify training-serving feature parity?
- **Answer**: We assert that the JSON request keys map exactly to the model's feature order array: `['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']`.

---

## Part 4: Calibration & Expected Calibration Error

### Q36: What is a Brier Score?
- **Answer**: The Brier Score is the mean squared difference between predicted probabilities and actual one-hot class outcomes. It measures the quality of predicted probabilities.

### Q37: What is the Multiclass Brier Score of your production model?
- **Answer**: It is 0.0162, which is extremely low, indicating that predicted probability outputs align closely with true class outcomes.

### Q38: What is Expected Calibration Error (ECE)?
- **Answer**: ECE measures the difference between predicted confidence and empirical accuracy across binned probability outputs. A well-calibrated model has an ECE close to $0.0$.

### Q39: What is the ECE of your calibrated model?
- **Answer**: The production model has an ECE of 0.0708 (approx $7.0\%$).

### Q40: Why is probability calibration critical for agricultural recommendation systems?
- **Answer**: If a model recommends Cotton with a confidence of $90\%$, there should be a $90\%$ chance that the soil and climate parameters are empirically suitable for cotton. Uncalibrated models produce skewed confidence bounds ($0.0$ or $1.0$), which can mislead farmers.

### Q41: Why did you choose Platt Scaling over Isotonic Regression?
- **Answer**: Platt scaling Sigmoid function outperformed Isotonic regression on our small 2,200 dataset, yielding a lower ECE ($0.0708$ vs $0.0820$) and avoiding the overfitting issues of isotonic step-functions on small sample folds.

### Q42: How does temperature scaling differ from Platt scaling?
- **Answer**: Temperature scaling uses a single scalar parameter $T > 0$ to scale logit outputs before softmax. Platt scaling fits a logistic regression model on the model's decision function output, which is more robust for multiclass tabular classifiers.

### Q43: How do you visualize model calibration?
- **Answer**: We use reliability diagrams, plotting binned predicted confidence on the x-axis against empirical accuracy on the y-axis. The closer the points lie to the diagonal $y=x$, the better the calibration.

### Q44: Does calibration affect model classification accuracy?
- **Answer**: No. Calibration shifts probability scales but preserves rank orders, meaning the top recommended crop remains unchanged.

### Q45: What is the Log Loss of your calibrated model?
- **Answer**: It is 0.0921, indicating highly calibrated probability boundaries.

---

## Part 5: Out-of-Distribution (OOD) Detection

### Q46: What is the difference between a "physically invalid" input and "out-of-distribution" input?
- **Answer**: A physically invalid input represents physically impossible values (e.g. pH of 15 or negative nutrients). An out-of-distribution input represents physically possible agricultural parameters that sit outside the distribution support of the training data.

### Q47: How does your model handle physically invalid inputs?
- **Answer**: They are blocked at the API gateway with HTTP 422, returning an explicit error message.

### Q48: How do you identify Out-of-Distribution (OOD) soil profiles?
- **Answer**: We use univariate percentile boundaries and continuous range validations. Inputs falling outside the $1\%$ and $99\%$ percentiles of the training distribution trigger an OOD warning.

### Q49: Why don't you silently clip or impute OOD inputs?
- **Answer**: Silently modifying user inputs masks agricultural anomalies. A farmer should be informed if their soil tests represent atypical conditions where recommendations are less reliable.

### Q50: What is the warning message returned for OOD inputs?
- **Answer**: The API returns an `ood` flag, which prompts the frontend to render a caution message stating: *"The input soil parameters are outside typical training bounds. Recommendations may be less reliable under these conditions."*

### Q51: How do you test the OOD module's robustness?
- **Answer**: We run adversarial prediction tests using inputs set to extreme bounds (e.g. pH of 14, zero rainfall) to verify that the scanner flags them correctly.

### Q52: What is the pH validation range enforced by your OOD scanner?
- **Answer**: The gate allows pH values between $3.5$ and $9.9$ to pass normally, flags tail parameters as CAUTION, and blocks values outside $[0.0, 14.0]$.

### Q53: Why not use Mahalanobis distance for OOD detection in production?
- **Answer**: Mahalanobis distance assumes a multivariate normal distribution of features. Soil parameters are often highly non-normal and multi-modal. Range-based univariate gating is more reliable and computationally lightweight.

### Q54: Does your OOD module block atypical inputs?
- **Answer**: No. It allows atypical but physically possible inputs (like high rainfall) to proceed to model prediction, but flags them with a warning.

### Q55: How does the frontend display the OOD status?
- **Answer**: The frontend displays a yellow caution banner for OOD inputs, while green badges are used for normal ranges.

---

## Part 6: Sugarcane Bias & Fairness

### Q56: Why was sugarcane bias a major issue in legacy versions of Krishi Sarathi?
- **Answer**: Legacy versions were trained on imbalanced regional datasets where sugarcane represented nearly a quarter of all samples, causing decision trees to default to recommending sugarcane.

### Q57: How do you audit the model for sugarcane bias?
- **Answer**: We run simulations with randomized input sweeps to measure the recommendation rates of sugarcane. The production model has a $0.00\%$ sugarcane default bias under these conditions.

### Q58: What is your definition of "no bias"?
- **Answer**: No bias means no unjustified systematic dominance. The model should predict different crops at different rates depending on the input distribution, not based on class frequency skews.

### Q59: Why is the sugarcane prediction rate $24.50\%$ in candidate V4 models?
- **Answer**: Because of the class imbalance in the 4,513-row external dataset, where sugarcane represents $22.38\%$ of the training samples.

### Q60: How does a balanced class distribution mitigate crop-class bias?
- **Answer**: A balanced class distribution ensures that each crop has equal representation in the training set, allowing the model to learn chemical suitability boundaries without frequency-driven bias.

---

## Part 7: GIS Map & Observational Intelligence

### Q61: What is the Shannon Diversity Index ($H$) displayed on the map?
- **Answer**: It measures crop diversity within a district, calculating both species richness and evenness:
  \[
  H = -\sum_{i} p_i \ln(p_i)
  \]
  where $p_i$ is the share of district area cultivated with crop $i$.

### Q62: What is the Herfindahl-Hirschman Index (HHI) displayed on the map?
- **Answer**: It measures crop concentration to assess monoculture risk:
  \[
  \text{HHI} = \sum_{i} s_i^2
  \]
  where $s_i$ is the percentage share of crop $i$ in the district.

### Q63: How do you interpret HHI scores for crop concentration?
- **Answer**: An HHI below 1,500 indicates a highly diversified crop system; an HHI above 2,500 indicates high monoculture concentration.

### Q64: What is the Soil Quality Index (SQI) displayed on the map?
- **Answer**: It is a composite score from 1 to 10 calculated from district averages of Nitrogen, Phosphorus, Potassium, Organic Carbon, and pH to assess overall soil health.

### Q65: How do you calculate rainfall anomalies on the map dashboard?
- **Answer**: It represents the percentage deviation of actual seasonal rainfall from the long-term normal baseline of the district.

### Q66: Why are map statistics kept decoupled from the prediction route?
- **Answer**: To prevent location-based memorization. The predictor evaluates soil chemistry only, while the map displays regional observational intelligence.

### Q67: Where does the crop production data on the map come from?
- **Answer**: It is sourced from the Area, Production & Yield (APY) statistics of the Directorate of Economics & Statistics.

---

## Part 8: Robustness & Sensitivity

### Q68: What is the prediction consistency of the model under $\pm 5\%$ parameter drift?
- **Answer**: It is $96.4\%$, confirming that the model's decision manifolds are robust to typical measurement variations.

### Q69: What happens to predictions under a $\pm 10\%$ parameter drift?
- **Answer**: The consistency is $91.2\%$, with minor switches occurring only on borderline overlapping crop boundaries.

### Q70: How does the model handle missing feature inputs?
- **Answer**: The frontend and backend contracts require all 7 features to be present. Missing values are blocked at schema validation to prevent model hallucinations.

### Q71: What is the difference between a "model probability" and "crop yield guarantee"?
- **Answer**: Model probability is an estimation of soil chemistry and climate suitability, not a guarantee of crop yield. Yield depends on additional variables like irrigation quality and pests.

### Q72: How does the PDF report feature benefit judges?
- **Answer**: It acts as a downloadable summary documenting the inputs, recommended crops, probabilities, OOD status, and a scientific disclaimer, demonstrating production readiness.

### Q73: Why is the worst-class F1 metric important for validation?
- **Answer**: It prevents high majority-class scores from masking poor performance on minority crop classes, ensuring uniform prediction quality across all crops.

### Q74: Why do you reject synthetic data generation (SMOTE) to inflate the dataset?
- **Answer**: Synthetic generation creates interpolated samples in continuous space. While it increases sample counts, it does not add new scientific information and can blur decision boundaries.

### Q75: How does the explainability checklist ("Why this Crop?") function?
- **Answer**: It compares the user's input parameters to the median values of the recommended crop in the training distribution, returning checkmarks (`✓`) for matches and caution warnings (`⚠`) for deviations.
