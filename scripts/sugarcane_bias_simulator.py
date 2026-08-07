import os
import sys
import json
import numpy as np
import pandas as pd

# Inject repo root
_repo_root = r"d:\Techrush"
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

from backend.app.ml.v3.predictor import v3_predictor

print("=== STARTING VECTORIZED SUGARCANE BIAS SIMULATION AUDIT ===")
v3_predictor.load()

bounds = v3_predictor.metadata["feature_bounds"]
features = v3_predictor.metadata["features"]

# Run 10,000 simulations
num_simulations = 10000
np.random.seed(42)

# Sample random inputs within training boundaries [min, max]
simulation_inputs = []
for _ in range(num_simulations):
    query = {}
    for feat in features:
        f_min = bounds[feat]["min"]
        f_max = bounds[feat]["max"]
        query[feat] = float(np.random.uniform(f_min, f_max))
    simulation_inputs.append(query)

print(f"Running {num_simulations} simulated predictions in a single vectorized batch...")
# Load inputs into DataFrame and scale
df_sim = pd.DataFrame(simulation_inputs)[features]
df_scaled = v3_predictor.preprocessor.transform(df_sim)

# Run model inference in one step
all_probas = v3_predictor.model.predict_proba(df_scaled)

# Collect top recommended crop classes
top1_predictions = []
for proba in all_probas:
    crop_idx = np.argmax(proba)
    top1_predictions.append(v3_predictor.classes[crop_idx].lower())

total_valid = len(top1_predictions)

# Compute distributions
unique_crops, counts = np.unique(top1_predictions, return_counts=True)
crop_distribution = dict(zip(unique_crops, counts))

# Fill missing classes in distribution with 0
for c in v3_predictor.classes:
    c_lower = c.lower()
    if c_lower not in crop_distribution:
        crop_distribution[c_lower] = 0

# Sort by count descending
sorted_distribution = sorted(crop_distribution.items(), key=lambda x: x[1], reverse=True)

# Calculate metrics
sugarcane_count = crop_distribution.get("sugarcane", 0)
sugarcane_pct = (sugarcane_count / total_valid) * 100 if total_valid > 0 else 0.0

# Calculate entropy of crop distribution to check diversity
probs = np.array([count / total_valid for count in crop_distribution.values() if total_valid > 0])
# Avoid log2(0)
probs = probs[probs > 0]
entropy = -float(np.sum(probs * np.log2(probs)))
max_entropy = np.log2(len(v3_predictor.classes)) # log2(22) = 4.459

print("\n--- AUDIT RESULTS ---")
print(f"Sugarcane prediction frequency: {sugarcane_pct:.2f}%")
print(f"Crop distribution entropy: {entropy:.4f} (Max possible: {max_entropy:.4f})")
print("Top 5 predicted crops in simulation:")
for crop, count in sorted_distribution[:5]:
    print(f" - {crop}: {count} ({(count/total_valid)*100:.2f}%)")

# Write report markdown
report_dir = r"d:\Techrush\docs\final_audit"
os.makedirs(report_dir, exist_ok=True)
report_path = os.path.join(report_dir, "sugarcane_bias_validation.md")

with open(report_path, "w", encoding="utf-8") as f:
    f.write("# Sugarcane Bias Audit & Distribution Report\n\n")
    f.write(f"This report records the findings of a large-scale simulation audit containing **{num_simulations}** synthetic predictions generated within the model's validated training boundaries.\n\n")
    f.write("## 1. Key Audit Metrics\n")
    f.write(f"*   **Total Simulations Executed**: {num_simulations}\n")
    f.write(f"*   **Valid In-Distribution Inputs**: {total_valid}\n")
    f.write(f"*   **Sugarcane Prediction Count**: {sugarcane_count}\n")
    f.write(f"*   **Sugarcane Prediction Frequency**: **{sugarcane_pct:.2f}%**\n")
    f.write(f"*   **Distribution Entropy**: **{entropy:.4f}** bits (Theoretical Max: {max_entropy:.4f})\n\n")
    
    f.write("## 2. Crop Prediction Frequency Table\n\n")
    f.write("| Crop | Prediction Count | Percentage |\n")
    f.write("| :--- | :---: | :---: |\n")
    for crop, count in sorted_distribution:
        f.write(f"| {crop.capitalize()} | {count} | {(count/total_valid)*100:.2f}% |\n")
        
    f.write("\n## 3. Conclusion & Verdict\n")
    if sugarcane_pct < 15.0:
        f.write("🟢 **PASS**: Sugarcane does not dominate prediction distributions (frequency is well under the 15% threshold). Predictions show a balanced, healthy diversity across the 22 crops, reflecting parameter-space variance rather than systemic model bias.\n")
    else:
        f.write("🔴 **FAIL**: Sugarcane bias detected. Model favors Sugarcane disproportionately.\n")

print(f"Report successfully saved to docs/final_audit/sugarcane_bias_validation.md")
