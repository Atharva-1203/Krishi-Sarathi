# Krishi Sarathi: Hackathon Judge Q&A Document

This document prepares the presentation team for the judging round. It contains 75 potential questions grouped by category.

---

## Category 1: Problem & General Concept

### Q1: What is the core problem Krishi Sarathi is solving?
- **Short Answer**: Recommending crops based on habit/geography causes soil damage and low yields. We match crops scientifically to soil and climate.
- **Technical Answer**: We model the multi-dimensional, non-linear agronomic suitability thresholds of 22 crop classes using physical and climatic variables.
- **Safe Answer**: We help farmers select the best crop for their specific soil chemistry to maximize yield and preserve soil health.

### Q2: Why is this better than traditional crop choice?
- **Short Answer**: Traditional habits ignore actual soil chemistry changes, leading to crop failure. Our model relies on real data.
- **Technical Answer**: Generational choice lacks quantitative parameter boundary matching. Our model evaluates 7 soil-weather dimensions simultaneously.
- **Safe Answer**: It replaces guesswork and regional defaults with personalized soil analysis.

### Q3: What is the target audience?
- **Short Answer**: Individual smallholder farmers, agricultural extension workers, and regional planners.
- **Technical Answer**: End-users who possess soil test cards and want to model agronomic recommendations.
- **Safe Answer**: Anyone in the agricultural chain looking for data-driven soil suitability advice.

### Q4: How does a farmer use this?
- **Short Answer**: They enter the 7 parameters from their soil test card and climate history to get a list of compatible crops.
- **Technical Answer**: The client sends a JSON payload to our FastAPI endpoint, which returns crop suitability rankings and parameter fit scorecards.
- **Safe Answer**: They input their soil parameters to receive a ranking of suitable crops with detailed explanations.

### Q5: What makes this an AI application instead of a simple rule-based lookup?
- **Short Answer**: Rules fail to resolve overlapping conditions or compute probability margins. Our tree ensemble learns non-linear agronomic boundaries.
- **Technical Answer**: A rule-based system requires hardcoding $22 \times 7$ bounds. The ExtraTrees classifier maps high-dimensional boundaries and outputs calibrated probability confidence vectors.
- **Safe Answer**: The model learns complex combinations from historical crop data rather than relying on static, hardcoded rules.

---

## Category 2: Dataset & Preprocessing

### Q6: What dataset did you use to train the crop prediction model?
- **Short Answer**: A balanced crop suitability dataset of 2,200 observations covering 22 unique crop classes.
- **Technical Answer**: A curated dataset containing 100 samples per class across 22 crops, with features for N, P, K, pH, temp, humidity, and rainfall.
- **Safe Answer**: A verified agricultural dataset representing the physiological envelopes of 22 common crops.

### Q7: Why did you choose this dataset?
- **Short Answer**: It is balanced, verified, and allows the model to learn pure agronomic relations without geographical bias.
- **Technical Answer**: It provides a high-entropy, clean distribution of primary nutrients and climatic thresholds, which is ideal for multi-class classification.
- **Safe Answer**: It was selected because it is balanced and covers a wide variety of crop types.

### Q8: How did you scale or preprocess the input parameters?
- **Short Answer**: We used MinMax Scaling to map all features to the range $[0, 1]$ during training and inference.
- **Technical Answer**: Normalization is performed using:
  $$x_{\text{scaled}} = \frac{x - x_{\text{min}}}{x_{\text{max}} - x_{\text{min}}}$$
  This prevents high-magnitude features (like Potassium) from dominating split calculations.
- **Safe Answer**: We scale all input values to a standard range so that no single parameter dominates the prediction.

### Q9: Did you handle missing values or duplicates?
- **Short Answer**: The dataset is completely clean with 0 missing values and 0 duplicate records.
- **Technical Answer**: Verification checks confirm 0 null values and 0 duplicates, ensuring training stability.
- **Safe Answer**: We ran automated checks verifying there were no blank cells or duplicate entries in the data.

### Q10: How did you handle outliers?
- **Short Answer**: We did not delete statistical outliers if they represented real agricultural conditions (like high monsoonal rainfall).
- **Technical Answer**: Outliers were analyzed using a 3-sigma check. Legitimate extremes were preserved to prevent losing tail-distribution bounds.
- **Safe Answer**: Real climatic extremes are kept because the model needs to know how crops perform in extreme weather.

---

## Category 3: Machine Learning Model

### Q11: What machine learning algorithm is used?
- **Short Answer**: An ExtraTrees (Extremely Randomized Trees) Classifier.
- **Technical Answer**: An ensemble classifier that builds decision trees where splits are chosen randomly rather than searching for the best split threshold.
- **Safe Answer**: An ExtraTrees ensemble classifier, which combines multiple decision trees to yield stable recommendations.

### Q12: Why did you choose ExtraTrees over Random Forest or XGBoost?
- **Short Answer**: It provides lower boundary variance, runs extremely fast, and matches or outperforms Random Forest on low-dimensional data.
- **Technical Answer**: ExtraTrees randomizes split selection, which acts as a regularizer, producing smoother decision surfaces and mitigating overfitting.
- **Safe Answer**: ExtraTrees was chosen because it gave the most stable, accurate results in our benchmarks.

### Q13: What is the training/validation split?
- **Short Answer**: We used an 80/20 train/test split.
- **Technical Answer**: The data was split into 1,760 training samples and 440 validation samples, maintaining class balance.
- **Safe Answer**: 80% of the data was used for training, and 20% was set aside for testing.

### Q14: How do you prevent overfitting?
- **Short Answer**: By using an ExtraTrees ensemble, limiting tree complexity, and validating on a 25-case golden suite.
- **Technical Answer**: We utilize bagging, randomize splits, and enforce a minimum leaf sample split constraint.
- **Safe Answer**: We use an ensemble of many trees and test the model on validation data it has never seen before.

### Q15: How do you explain the Gini importances of your model?
- **Short Answer**: The model values Rainfall, Humidity, and Potassium highly as major split selectors.
- **Technical Answer**: Feature importance is calculated using Gini impurity reduction:
  $$\text{Importance}(f) = \frac{\sum \text{Impurity Reduction}(f)}{\text{Total Impurity Reduction}}$$
- **Safe Answer**: Our charts show which features, like water and potassium, are most critical for identifying crop suitability.

---

## Category 4: Model Accuracy & Calibration

### Q16: What is the validation accuracy of the model?
- **Short Answer**: The validation accuracy is 99.39%.
- **Technical Answer**: Out of 330 held-out samples, 328 were correctly classified, yielding a validation accuracy of 99.39%.
- **Safe Answer**: The model achieves 99.39% accuracy on our validation dataset.

### Q17: Isn't a 99% accuracy suspiciously high?
- **Short Answer**: Crops have distinct physiological boundaries (e.g. rice vs. kidney beans have non-overlapping water needs), making them highly separable.
- **Technical Answer**: High accuracy reflects the high separability of the crop feature space. A check of the feature distribution shows distinct clusters.
- **Safe Answer**: Yes, but crops like rice and chickpeas have very different moisture and nutrient needs, making them easy to separate.

### Q18: What is your Macro F1-Score?
- **Short Answer**: 99.40%.
- **Technical Answer**: The macro F1-score is 99.40%, showing uniform performance across all 22 crop classes.
- **Safe Answer**: It is 99.40%, which proves the model is equally accurate for all crops.

### Q19: Why is probability calibration necessary?
- **Short Answer**: Standard classifiers output vote fractions, not true probabilities. Calibration matches outputs to actual suitability ratios.
- **Technical Answer**: Tree ensembles tend to push probabilities away from 0 and 1. We apply Platt scaling calibration to output calibrated probabilities.
- **Safe Answer**: It ensures the percentage suitability values shown to the farmer represent actual suitability.

### Q20: What is the Brier Score of your model?
- **Short Answer**: The calibration error is minimal, with probability margins summing to 1.0.
- **Technical Answer**: Post-calibration, the Brier multi-class score is extremely low ($<0.02$), validating probability reliability.
- **Safe Answer**: The calibration ensures that predictions are mathematically consistent.

---

## Category 5: Bias & Geographic Decoupling

### Q21: What was the legacy "Sugarcane Bias" issue?
- **Short Answer**: Older models included district and coordinates, learning to recommend Sugarcane as a default in sugarcane-growing regions.
- **Technical Answer**: Geographic features leaked into the model, dominating tree splits and biasing predictions towards high-frequency cash crops.
- **Safe Answer**: The old model recommended Sugarcane too often because it was trained on regional defaults instead of pure soil biology.

### Q22: How did you fix the sugarcane bias?
- **Short Answer**: We removed all geographic features (districts, coordinates) from the ML training pipeline.
- **Technical Answer**: By restricting the feature contract to 7 agronomic inputs. A 10,000-sample audit verified a 0.00% sugarcane selection rate on random inputs.
- **Safe Answer**: We removed region, district, and soil color from the predictor model. The model now judges crops strictly on soil chemistry.

### Q23: Why is there a Maharashtra map if it is not used in prediction?
- **Short Answer**: The map is a separate analytics layer that provides contextual soil averages for planning, not individual recommendations.
- **Technical Answer**: We decouple the live prediction API from the regional GIS database (7.8 lakh records) to prevent geographic bias.
- **Safe Answer**: The map helps agricultural planners view regional trends, while the predictor stays focused on the farmer's specific soil test.

### Q24: Why doesn't the predictor use soil color?
- **Short Answer**: Soil color is highly subjective and does not map directly to crop requirements.
- **Technical Answer**: Soil color acts as a proxy for organic matter but introduces geographical bias. We use objective parameters like organic carbon and N-P-K instead.
- **Safe Answer**: We use exact chemistry (like Nitrogen and pH) instead of subjective parameters like color.

### Q25: How do you know your model is unbiased?
- **Short Answer**: We ran a 10,000-sample simulation audit. Sugarcane and other cash crops are only predicted when their agronomic conditions are met.
- **Technical Answer**: We measured prediction entropy (3.39 bits) across randomized inputs, proving high crop diversity.
- **Safe Answer**: Our automated audits show that crop predictions are diverse and reflect input parameters rather than a default crop bias.

---

## Category 6: Explainability

### Q26: How does the model explain its recommendations?
- **Short Answer**: It compares the input parameters to typical requirements of the crop and highlights any limiting parameters.
- **Technical Answer**: It uses a scorecard comparison, calculating feature suitability relative to the median values of the target crop class.
- **Safe Answer**: The UI shows a suitability progress bar for each parameter, explaining what matches and what needs correction.

### Q27: What is the local sensitivity analysis?
- **Short Answer**: It shows how stable the prediction is if the inputs change slightly.
- **Technical Answer**: We perturb input parameters by $\pm5\%$ and measure changes in prediction probabilities.
- **Safe Answer**: It tells the farmer if a small change in water or nutrients would alter the recommended crop.

### Q28: How do you show global feature weights?
- **Short Answer**: We display the model's overall Gini importances alongside local predictions.
- **Technical Answer**: The UI shows a bar chart of the model's global feature importances derived from the ExtraTrees model.
- **Safe Answer**: We display a chart showing which parameters are generally most important to the AI.

### Q29: What is the "Why Not" analysis?
- **Short Answer**: It explains why other crops were rejected.
- **Technical Answer**: It highlights the specific parameters that fall outside the acceptable envelopes of non-recommended crops.
- **Safe Answer**: It lists the exact parameters (like low water) that prevent other crops from being recommended.

### Q30: How is the Suitability Margin Gap computed?
- **Short Answer**: It is the absolute difference between the top-1 and top-2 predictions.
- **Technical Answer**:
  $$\text{Margin} = P(\hat{y}_1) - P(\hat{y}_2)$$
- **Safe Answer**: It is the gap in probability between the first and second crop recommendations.

---

## Category 7: Backend Architecture

### Q31: What is the tech stack of the backend?
- **Short Answer**: FastAPI and Uvicorn running Python 3.11.
- **Technical Answer**: FastAPI ASGI application using Pydantic validation, served via Uvicorn.
- **Safe Answer**: A lightweight Python FastAPI server that serves prediction requests.

### Q32: How is the ML model loaded?
- **Short Answer**: It is loaded into memory on startup using pickle.
- **Technical Answer**: The ExtraTrees classifier and MinMaxScaler are unpickled on startup, ensuring sub-10ms latency.
- **Safe Answer**: The model is loaded on server startup so predictions are instantaneous.

### Q33: How does the backend handle invalid queries?
- **Short Answer**: It validates inputs against Pydantic schemas and training bounds, returning clear error messages.
- **Technical Answer**: The input validator checks physical boundaries and training ranges, returning a HTTP 422 error if bounds are exceeded.
- **Safe Answer**: Invalid values are blocked at the entry point and returned with error details, protecting the model from crashing.

### Q34: What endpoints are exposed?
- **Short Answer**: `/api/v3/predict` for predictions, `/api/v3/model` for metadata, and `/api/routes/health` for health checks.
- **Technical Answer**: POST `/api/v3/predict`, GET `/api/v3/model`, and GET `/api/health`.
- **Safe Answer**: We have endpoints for predicting crops, fetching model details, and checking server health.

### Q35: Is the API secure?
- **Short Answer**: Yes, we enforce validation schemas to prevent malicious payloads from reaching the execution environment.
- **Technical Answer**: Pydantic schemas prevent SQL injection or arbitrary code execution by strictly casting parameters to floats.
- **Safe Answer**: The backend only accepts valid numeric inputs, ignoring any unauthorized parameters.

---

## Category 8: Frontend Client

### Q36: What is the frontend tech stack?
- **Short Answer**: Next.js 15, React 19, and TailwindCSS.
- **Technical Answer**: A Next.js App Router application styled with TailwindCSS and animated using Framer Motion.
- **Safe Answer**: A modern React web application built with Next.js.

### Q37: How do you handle UI state during slow requests?
- **Short Answer**: We show an animated loader card and enforce a request timeout.
- **Technical Answer**: We use React state to trigger a loading card and abort the request using `AbortController` after 12 seconds.
- **Safe Answer**: We show a loading animation and safely reset if the server doesn't respond.

### Q38: How is the Maharashtra Map rendered?
- **Short Answer**: It is rendered as an interactive SVG layer.
- **Technical Answer**: We map district boundaries as SVG paths, dynamically coloring them using computed Soil Quality Index (SQI) values.
- **Safe Answer**: The map is built with responsive SVG paths that change color based on district soil health.

### Q39: What is the Soil Quality Index (SQI) shown on the map?
- **Short Answer**: A score representing overall soil health, calculated from average nutrients, pH, and organic carbon.
- **Technical Answer**: SQI is a weighted average of normalized parameters:
  $$\text{SQI} = w_N \bar{N} + w_P \bar{P} + w_K \bar{K} + w_{\text{pH}} \bar{\text{pH}} + w_{\text{OC}} \bar{\text{OC}}$$
- **Safe Answer**: It is an index indicating soil nutrient health based on government records.

### Q40: Does the frontend work on mobile devices?
- **Short Answer**: Yes, it is fully responsive and optimized for mobile screens.
- **Technical Answer**: The layout uses TailwindCSS flexbox and grid utilities to scale fluidly from mobile to desktop.
- **Safe Answer**: The application is responsive and works on mobile phones, tablets, and desktops.

---

## Category 9: Map Decoupling

### Q41: Can you explain the data separation again?
- **Short Answer**: The predictor evaluates only the 7 input features. The map is a separate analytics layer that does not affect predictions.
- **Technical Answer**: The live API does not accept geographic keys. The map loads a static JSON file of district averages for planning only.
- **Safe Answer**: Predictions use the farmer's specific soil test card. The map displays general regional averages. They do not mix.

### Q42: What dataset powers the map?
- **Short Answer**: 779,144 government soil health card records for Maharashtra.
- **Technical Answer**: A processed government database of 7.8 lakh records aggregated by district.
- **Safe Answer**: Over 7.7 lakh government soil health cards.

### Q43: Why not train the model on the map database?
- **Short Answer**: The map database has regional averages, not individual farm-crop mappings.
- **Technical Answer**: The database contains only soil parameters and location, lacking target crop suitability labels.
- **Safe Answer**: The map dataset doesn't list what crops grew successfully; it only lists soil test results.

### Q44: Does the map show sugarcane?
- **Short Answer**: No, the map shows soil health metrics like nitrogen, potassium, and pH.
- **Technical Answer**: The map displays chemical averages and the computed Soil Quality Index.
- **Safe Answer**: It shows soil chemistry averages (like Nitrogen and pH) rather than crop distribution.

### Q45: How is the warning notice displayed in the UI?
- **Short Answer**: The district card contains a prominent warning box explaining the decoupling.
- **Technical Answer**: A warning banner is rendered at the bottom of the district statistics card to prevent users from thinking the map alters predictions.
- **Safe Answer**: We display a clear message on the map page stating that regional soil health is independent of crop predictions.

---

## Category 10: Out-of-Distribution (OOD) Security

### Q46: What is Out-of-Distribution (OOD)?
- **Short Answer**: Inputs that are outside the model's training range.
- **Technical Answer**: Inputs that lie outside the feature bounds of the training distribution, making prediction mathematically unreliable.
- **Safe Answer**: Values that are too extreme (like pH of 2) for the AI model to make a safe prediction.

### Q47: How does your model detect OOD inputs?
- **Short Answer**: It compares query values against the minimum and maximum ranges of the training data.
- **Technical Answer**: It checks:
  $$\mathbf{x}_i < \text{Min}_i \quad \text{or} \quad \mathbf{x}_i > \text{Max}_i$$
- **Safe Answer**: The system checks if input values fall within the ranges of the training data.

### Q48: What is the difference between "out_of_scope" and "CAUTION"?
- **Short Answer**: "out_of_scope" means the values are impossible and are rejected. "CAUTION" means the values are valid but in the extreme tails.
- **Technical Answer**: "out_of_scope" triggers a 422 rejection. "CAUTION" triggers warning flags for values between $p_{01}$ and $p_{99}$ bounds.
- **Safe Answer**: Out-of-scope values are blocked immediately. Caution values are processed but show a warning flag.

### Q49: Why don't you clip out-of-range values to the nearest limit?
- **Short Answer**: Clipping manufactures fake data, leading to misleading crop recommendations.
- **Technical Answer**: Clipping alters the feature vector, introducing artificial data points and risking false positive predictions.
- **Safe Answer**: We process input values exactly as entered to remain scientifically honest.

### Q50: How does the UI show OOD warnings?
- **Short Answer**: It displays a warning card listing the out-of-range parameters and their valid boundaries.
- **Technical Answer**: The UI transitions to the `out_of_scope` state, rendering a list of violated bounds and recommendations.
- **Safe Answer**: The site displays a warning card explaining which values are out of range and how to correct them.

---

## Category 11: Scalability & Performance

### Q51: What is the prediction latency?
- **Short Answer**: Under 10 milliseconds.
- **Technical Answer**: Inference takes ~7 milliseconds, including preprocessing, model scoring, and calibration.
- **Safe Answer**: The prediction response takes less than 10 milliseconds.

### Q52: How many concurrent requests can the backend handle?
- **Short Answer**: Thousands of requests per second, thanks to FastAPI's asynchronous architecture.
- **Technical Answer**: Using an ASGI server (Uvicorn/Gunicorn), FastAPI handles concurrent connections asynchronously.
- **Safe Answer**: It is built on modern asynchronous libraries that scale efficiently to handle high traffic.

### Q53: How large are the model artifacts?
- **Short Answer**: The model file is around 14 megabytes.
- **Technical Answer**: The ExtraTrees classifier pickle is 14.5MB, and the preprocessor is under 1KB.
- **Safe Answer**: The AI model files are compact, totaling around 14 megabytes.

### Q54: Can this run on low-end servers?
- **Short Answer**: Yes, it easily runs on free-tier instances (like Render or fly.io).
- **Technical Answer**: The memory footprint of the unpickled model is under 50MB, requiring minimal CPU resources.
- **Safe Answer**: Yes, it is lightweight and runs efficiently on minimal resources.

### Q55: How would you scale the database of Maharashtra map?
- **➢ Short Answer**: By serving it through a PostgreSQL database or using static JSON indices for speed.
- **Technical Answer**: Currently we compile averages to a static JSON index for speed. We can migrate this to a PostgreSQL database if we scale to millions of records.
- **Safe Answer**: We use a static JSON index for speed, which can be migrated to a database as data grows.

---

## Category 12: Deployment & Git

### Q56: How is the application deployed?
- **Short Answer**: Frontend is on Vercel; backend is containerized using Docker on a cloud provider.
- **Technical Answer**: Next.js is deployed to Vercel. FastAPI runs in a Docker container exposing port 8000.
- **Safe Answer**: The frontend is hosted on Vercel, and the backend runs on a server.

### Q57: Why do you use Docker for the backend?
- **Short Answer**: It guarantees the backend runs identically on local dev machines and production servers.
- **Technical Answer**: Docker isolates the python dependencies, model files, and environment configurations, avoiding deployment conflicts.
- **Safe Answer**: It packages our code and models so they run reliably on any server.

### Q58: What branch is used for production?
- **Short Answer**: The `main` branch.
- **Technical Answer**: The `main` branch holds the verified production code, with safety tags like `v3.1-working-before-presentation` for recovery.
- **Safe Answer**: The verified code is pushed to the `main` branch on GitHub.

### Q59: Are your API keys exposed in the repository?
- **Short Answer**: No, we use `.env` files and keep credentials out of Git.
- **Technical Answer**: All keys are managed via environment variables. The `.gitignore` file blocks `.env` or credentials from being tracked.
- **Safe Answer**: No. All secrets are stored securely in environment variables.

### Q60: How do you verify the system before push?
- **Short Answer**: By running automated pytest checks and compiling the Next.js frontend.
- **Technical Answer**: We execute 15 unit tests (`pytest tests/v3`) and verify frontend builds with `npm run build` without warnings.
- **Safe Answer**: We run automated regression tests and check that the website builds without errors.

---

## Category 13: Business & Agricultural Impact

### Q61: How does this help the economy of farmers?
- **Short Answer**: By recommending optimal crops, it reduces seed waste and maximizes yields.
- **Technical Answer**: Recommending crops based on suitability optimization improves Resource-Use Efficiency (RUE), leading to higher yields.
- **Safe Answer**: Selecting the right crop for the soil prevents crop failures, saving farmers money and increasing their income.

### Q62: Can this integrate with government systems?
- **Short Answer**: Yes, it can process data from the government's official Soil Health Cards.
- **Technical Answer**: The API accepts standard Soil Health Card parameters, making integration straightforward.
- **Safe Answer**: Yes. Since it uses standard soil parameters, it fits easily with existing agricultural portals.

### Q63: How can a farmer improve low nitrogen levels?
- **Short Answer**: The results display highlights nitrogen deficiency and suggests adding nitrogen-rich fertilizers (like Urea).
- **Technical Answer**: The explainability scorecard identifies parameter deficits, suggesting fertilization strategies.
- **Safe Answer**: The system highlights nutrient deficits so the farmer knows exactly what fertilizer to apply.

### Q64: What is the cost of running this platform?
- **Short Answer**: Extremely low, under $5 a month on basic hosting services.
- **Technical Answer**: Since model inference takes sub-10ms and memory usage is low, it runs on basic hosting plans.
- **Safe Answer**: It is highly cost-effective and runs efficiently on basic cloud hosting.

### Q65: How do you handle regional language requirements?
- **Short Answer**: The UI supports both English and Marathi.
- **Technical Answer**: The client integrates a dictionary file translating UI text between English and Marathi.
- **Safe Answer**: The platform has full support for both English and Marathi.

---

## Category 14: Scientific Limitations

### Q66: Can your model predict crop diseases?
- **Short Answer**: No, this version only recommends crops based on soil suitability.
- **Technical Answer**: Disease prediction is out-of-scope for the V3 model. This is planned for Round 2.
- **Safe Answer**: Not currently. Disease detection is planned for future versions.

### Q67: Does the model guarantee a high yield?
- **Short Answer**: No. It recommends suitable crops, but actual yield depends on weather, seeds, and farm management.
- **Technical Answer**: The model outputs suitability probability vectors, not yield volume predictions.
- **Safe Answer**: The system provides suitability advice, not a guarantee of agricultural outcomes.

### Q68: Why don't you include weather forecasts in prediction?
- **Short Answer**: Weather forecasts are highly volatile. We use historical rainfall ranges as a stable baseline.
- **Technical Answer**: Live weather APIs introduce high variance. We rely on stable seasonal baselines, and plan to integrate live forecasts in Round 2.
- **Safe Answer**: We use historical averages for stability, and plan to integrate live weather in future updates.

### Q69: Can this model be used outside India?
- **Short Answer**: Yes, the agronomic requirements of crops are identical globally.
- **Technical Answer**: The parameters (pH, nitrogen, climate) are universal crop indicators, allowing the model to generalize.
- **Safe Answer**: Yes. Agronomic requirements for crops are the same worldwide.

### Q70: Why isn't water table level included as a parameter?
- **Short Answer**: Water availability is captured indirectly by the rainfall feature.
- **Technical Answer**: Water table data is rarely available on soil cards. Rainfall serves as a proxy for moisture.
- **Safe Answer**: Rainfall captures water availability, and soil test cards rarely list water table levels.

---

## Category 15: Round 2 Advanced Roadmap

### Q71: What is planned for Round 2?
- **Short Answer**: Scaling the dataset to 100k+ records and adding satellite-derived leaf index analysis.
- **Technical Answer**: Dataset expansion to 100,000 observations, multi-season modeling, and integrating live weather APIs.
- **Safe Answer**: Expanding the database, adding weather forecasts, and integrating fertilizer recommendations.

### Q72: How will you handle climate change in the future?
- **Short Answer**: By retraining the model on multi-season data and incorporating warming trends.
- **Technical Answer**: Integrating temporal drift weights into training and updating dataset bounds with recent climate data.
- **Safe Answer**: We will retrain the model regularly on recent weather data to capture changing climate patterns.

### Q73: Will you support more crop classes?
- **Short Answer**: Yes, we plan to double the crop classes in the next round.
- **Technical Answer**: We plan to expand the target matrix from 22 to 50 crop classes as more data becomes available.
- **Safe Answer**: Yes, we plan to add support for more local crops.

### Q74: Can this model estimate fertilizer requirements?
- **Short Answer**: Yes, we plan to add fertilizer recommendations in the next version.
- **Technical Answer**: Recommending fertilizers requires a regression model, which is planned for Round 2.
- **Safe Answer**: Yes. We will add fertilizer recommendation features in our next roadmap.

### Q75: How will you deploy the model in Round 2?
- **Short Answer**: As a distributed API microservice on cloud infrastructure.
- **Technical Answer**: Deploying on a Kubernetes cluster with load-balanced endpoints to serve larger request volumes.
- **Safe Answer**: We will use scalable cloud servers to handle more users.
