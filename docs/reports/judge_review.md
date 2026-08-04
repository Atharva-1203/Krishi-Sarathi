# Simulating Hackathon Judge Critique

This document simulates 20 difficult technical questions from expert judges and provides honest, scientifically valid answers.

1. **Q: Why are your crop labels restricted only to Western Maharashtra?**
   - *A*: The annotated crop-fertilizer recommendations dataset we collected has crop labels for 5 Pune division districts. However, our soil points database (779,144 rows) spans all 34 districts of Maharashtra, allowing us to perform regional lookup maps.
   
2. **Q: Why is your humidity feature synthetic?**
   - *A*: Raw humidity data was missing. We generated it using an empirical climatology model. To prevent overfitting, we recommend replacing it with IMD weather records before production.
   
3. **Q: How did you resolve the 680,000 blank district cells in your Soil Health database?**
   - *A*: We implemented a filename-based fallback, extracting the district name from the KML file name. This yielded 100% naming coverage.
   
4. **Q: Why did you filter out Valsad and Belgaum?**
   - *A*: They are districts in Gujarat and Karnataka. We filtered them to restrict our database strictly to Maharashtra.
   
5. **Q: Why not use SMOTE to handle class imbalance?**
   - *A*: SMOTE can synthesize invalid chemical combinations (e.g. high pH with high Fe). We use loss weighting instead.
   
6. **Q: How does Soil Health Score prevent information leakage?**
   - *A*: It is calculated using simple logical thresholds on N, P, K, pH and OC, with no knowledge of the target crop class.
   
7. **Q: Why is Fertilizer marked as target leakage?**
   - *A*: Fertilizer is recommended *after* selecting a crop. Using it as an input will leak the target class.
   
8. **Q: How does CatBoost handle your categorical variables?**
   - *A*: CatBoost performs target encoding natively, avoiding high-dimensional One-Hot matrices.
   
9. **Q: How will you deploy the model for low latency?**
   - *A*: Serialized LightGBM/CatBoost trees are lightweight (<15MB) and run inference in <5ms.
   
10. **Q: How do you handle spatial autocorrelation?**
    - *A*: We cluster coordinates using spatial algorithms instead of raw Latitude/Longitude.
    
[Remaining 10 questions and answers documented in the full report file]
