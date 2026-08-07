import os
import sys
import json
import time
import numpy as np
import pandas as pd

# Inject repo root
_repo_root = r"d:\Techrush"
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

from backend.app.ml.v3.predictor import v3_predictor

print("=== STARTING 3,000 RED-TEAM VALIDATION SWEEP ===")
v3_predictor.load()

bounds = v3_predictor.metadata["feature_bounds"]
features = v3_predictor.metadata["features"]

# Statistics counters
successful_responses = 0
validation_responses = 0
out_of_scope_responses = 0
server_errors = 0
unhandled_exceptions = 0

durations = []

# Generate test cases
test_cases = []

# 1000 Valid
np.random.seed(42)
for _ in range(1000):
    query = {}
    for feat in features:
        # Uniformly sample within absolute training bounds
        f_min = bounds[feat]["min"]
        f_max = bounds[feat]["max"]
        query[feat] = float(np.random.uniform(f_min, f_max))
    test_cases.append((query, "success"))

# 1000 Invalid
for _ in range(1000):
    query = {}
    # Randomly introduce a physical violation, nan, inf, or negative
    violation_type = np.random.choice(["nan", "inf", "-inf", "neg_NPK", "bad_pH", "bad_humidity"])
    
    # Initialize with normal values
    for feat in features:
        f_min = bounds[feat]["min"]
        f_max = bounds[feat]["max"]
        query[feat] = float(np.random.uniform(f_min, f_max))
        
    if violation_type == "nan":
        query[np.random.choice(features)] = float('nan')
    elif violation_type == "inf":
        query[np.random.choice(features)] = float('inf')
    elif violation_type == "-inf":
        query[np.random.choice(features)] = float('-inf')
    elif violation_type == "neg_NPK":
        query[np.random.choice(["N", "P", "K"])] = -10.0
    elif violation_type == "bad_pH":
        query["ph"] = 15.0 if np.random.rand() > 0.5 else -1.0
    elif violation_type == "bad_humidity":
        query["humidity"] = 110.0 if np.random.rand() > 0.5 else -5.0
        
    test_cases.append((query, "validation_error"))

# 500 Boundary
for _ in range(500):
    query = {}
    for feat in features:
        # Place value exactly on min or max
        query[feat] = float(bounds[feat]["min"]) if np.random.rand() > 0.5 else float(bounds[feat]["max"])
    test_cases.append((query, "success"))

# 500 Out of Domain
for _ in range(500):
    query = {}
    # Initialize in-bounds
    for feat in features:
        query[feat] = float(np.random.uniform(bounds[feat]["min"], bounds[feat]["max"]))
    # Perturb one feature outside range
    perturbed_feat = np.random.choice(features)
    f_min = bounds[perturbed_feat]["min"]
    f_max = bounds[perturbed_feat]["max"]
    
    if np.random.rand() > 0.5:
        # slightly below min, but physically valid
        query[perturbed_feat] = float(f_min - 5.0)
    else:
        # slightly above max
        query[perturbed_feat] = float(f_max + 10.0)
        
    # Safeguard physical constraints to ensure it is not classified as validation_error
    if perturbed_feat == "ph":
        query["ph"] = max(0.0, min(14.0, query["ph"]))
        if query["ph"] < f_min or query["ph"] > f_max:
            test_cases.append((query, "out_of_scope"))
        else:
            test_cases.append((query, "success"))
    elif perturbed_feat == "humidity":
        query["humidity"] = max(0.0, min(100.0, query["humidity"]))
        if query["humidity"] < f_min or query["humidity"] > f_max:
            test_cases.append((query, "out_of_scope"))
        else:
            test_cases.append((query, "success"))
    else:
        # For NPK, rainfall, temp, just keep them physically possible (>= 0)
        query[perturbed_feat] = max(0.0, query[perturbed_feat])
        if query[perturbed_feat] < f_min or query[perturbed_feat] > f_max:
            test_cases.append((query, "out_of_scope"))
        else:
            test_cases.append((query, "success"))

# Execute the tests
print(f"Running {len(test_cases)} red-team queries...")
start_total = time.time()

for idx, (query, expected) in enumerate(test_cases):
    t0 = time.time()
    try:
        res = v3_predictor.predict(query)
        t1 = time.time()
        durations.append(t1 - t0)
        
        status = res.get("status")
        if status == "success":
            successful_responses += 1
            # Run prediction probability checks
            recs = res.get("top_recommendations", [])
            probs = [r["probability"] for r in recs]
            assert sum(probs) <= 1.01
            assert all(0.0 <= p <= 1.0 for p in probs)
            assert not any(np.isnan(probs))
            assert recs[0]["probability"] >= recs[1]["probability"]
        elif status == "validation_error":
            validation_responses += 1
        elif status == "out_of_scope":
            out_of_scope_responses += 1
        else:
            server_errors += 1
            
    except Exception as e:
        unhandled_exceptions += 1
        print(f"Unhandled Exception on case {idx}: {type(e).__name__} - {str(e)}")

end_total = time.time()
total_time = end_total - start_total

# Calculate latency percentiles
durations_ms = [d * 1000 for d in durations]
p50 = np.percentile(durations_ms, 50)
p95 = np.percentile(durations_ms, 95)
p99 = np.percentile(durations_ms, 99)
max_latency = max(durations_ms)

print("\n=== VALIDATION COMPLETE ===")
print(f"Total time: {total_time:.2f} s")
print(f"Successful responses: {successful_responses}")
print(f"Validation responses (physical blocks): {validation_responses}")
print(f"Out-of-scope responses (range blocks): {out_of_scope_responses}")
print(f"Server errors: {server_errors}")
print(f"Unhandled exceptions: {unhandled_exceptions}")
print(f"P50 Latency: {p50:.2f} ms")
print(f"P95 Latency: {p95:.2f} ms")
print(f"P99 Latency: {p99:.2f} ms")
print(f"Max Latency: {max_latency:.2f} ms")

# Save results json
results_dict = {
    "successful_responses": successful_responses,
    "validation_responses": validation_responses,
    "out_of_scope_responses": out_of_scope_responses,
    "server_errors": server_errors,
    "unhandled_exceptions": unhandled_exceptions,
    "latencies": {
        "p50_ms": p50,
        "p95_ms": p95,
        "p99_ms": p99,
        "max_ms": max_latency
    }
}
os.makedirs(r"d:\Techrush\docs\validation", exist_ok=True)
with open(r"d:\Techrush\docs\validation\red_team_results.json", "w") as f:
    json.dump(results_dict, f, indent=2)
print("Results saved to docs/validation/red_team_results.json")
