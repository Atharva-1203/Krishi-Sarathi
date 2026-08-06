# Final Forensic ML Root Cause Report

## 1. Why was Sugarcane over-predicted?
It is caused by **Feature Dominance (NPK splits bypassing Rainfall splits)** in Tree Ensembles. Because Sugarcane features unique high-NPK profiles, decision trees split on nutrients first. Once split, the leaf nodes reach high purity for Sugarcane, completely bypassing any rainfall threshold checks.

## 2. Was the issue caused by data, features, labels, preprocessing, calibration, or model architecture?
It is a combination of **omitted variable bias** (missing `Irrigation` feature in historical cultivation labels) and **feature dominance** in tree structures.

## 3. Can the issue be fixed without sacrificing performance?
Yes. By adding a post-inference **Agronomic Rule Validation Layer**. This layer maintains statistical probability integrity (Golden Rule) while warning the user when ML outputs violate physical biological limits.

## 4. Is the model scientifically trustworthy?
Yes, with the Agronomic Validation Layer active, the system acts as a safe, transparent decision support tool.

## 5. Final Decision: GO WITH CHANGES
The model is approved for deployment after activating the dynamic feature recalculations and the Agronomic Warning Layer.
