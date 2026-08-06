# Final Forensic ML Root Cause Report (Phase 6.4)

## 1. Why was Sugarcane over-predicted?
It is caused by a combination of:
1.  **Feature Dominance (NPK splits bypassing Rainfall splits)** in Tree Ensembles. Because Sugarcane features unique high-NPK profiles, decision trees split on nutrients first. Once split, the leaf nodes reach high purity for Sugarcane, completely bypassing any rainfall threshold checks.
2.  **Omitted Variable Bias (The Irrigation Gap)**: The dataset lacks an explicit `Irrigation_Available` feature. Since Sugarcane is grown in dry regions (Pune, Solapur) solely due to hidden/implicit river irrigation, the dataset contains sugarcane records with artificially high rainfall values (e.g. 1000mm in Solapur, 700mm in Sangli) to reflect water usage. The model is blind to whether water comes from rain or rivers, assuming irrigation is implicitly present when nutrients are high.

## 2. Solution: Hybrid AI Decision Engine
To resolve this without overriding probabilities arbitrarily, we implemented a **Hybrid AI Decision Engine** that splits output confidence into two metrics:
- **Statistical Similarity**: The raw probability produced by the ML model indicating similarity to historical cultivation tracts (which includes irrigated sugarcane tracts in Solapur).
- **Agronomic Suitability**: A biological suitability index evaluating the crop against known physical limits (such as precipitation constraints). If a contradiction exists (e.g., sugarcane predicted with only 500mm rainfall), the agronomic score scales down (e.g., to 20%) and displays a decision-support guidance block.

## 3. Scientific Trustworthiness Statement
The production model is statistically strong for the available training data, but its recommendations should be interpreted alongside agronomic validation because the dataset does not explicitly capture irrigation and other management practices.

## 4. Final Decision: GO WITH CHANGES
The model is approved for deployment after activating the Hybrid AI Decision Engine with dual confidence score gauges.
