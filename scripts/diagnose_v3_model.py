import os
import sys
import pickle
import json
import numpy as np
import pandas as pd

# Inject repo root
_repo_root = r"d:\Techrush"
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

print("=== V3.1 MODEL FORENSIC DIAGNOSTICS ===")

model_dir = r"d:\Techrush\ml\models\v3"
model_path = os.path.join(model_dir, "model.pkl")
prep_path = os.path.join(model_dir, "preprocessor.pkl")
meta_path = os.path.join(model_dir, "metadata.json")

# 1. Verify files exist
model_exists = os.path.exists(model_path)
prep_exists = os.path.exists(prep_path)
meta_exists = os.path.exists(meta_path)

print(f"MODEL PATH: {model_path}")
print(f"MODEL EXISTS: {model_exists}")
if model_exists:
    print(f"MODEL SIZE: {os.path.getsize(model_path)} bytes")
else:
    print("MODEL SIZE: N/A")

print(f"PREPROCESSOR PATH: {prep_path}")
print(f"PREPROCESSOR EXISTS: {prep_exists}")
if prep_exists:
    print(f"PREPROCESSOR SIZE: {os.path.getsize(prep_path)} bytes")

print(f"METADATA PATH: {meta_path}")
print(f"METADATA EXISTS: {meta_exists}")

# 2. Deserialization checks
model = None
preprocessor = None
metadata = None

if model_exists:
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print(f"MODEL CLASS: {model.__class__.__name__}")
    except Exception as ex:
        print(f"MODEL CLASS: FAILED TO LOAD ({str(ex)})")

if prep_exists:
    try:
        with open(prep_path, "rb") as f:
            preprocessor = pickle.load(f)
        print(f"PREPROCESSOR CLASS: {preprocessor.__class__.__name__}")
    except Exception as ex:
        print(f"PREPROCESSOR CLASS: FAILED TO LOAD ({str(ex)})")

if meta_exists:
    try:
        with open(meta_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)
        print("METADATA VALID: True")
        print(f"MODEL VERSION INFORMATION: {metadata.get('model_version', 'Unknown')}")
        print(f"EXPECTED FEATURES: {metadata.get('features', [])}")
        print(f"CLASS COUNT: {len(metadata.get('classes', []))}")
        print(f"CLASS LABELS: {metadata.get('classes', [])}")
    except Exception as ex:
        print(f"METADATA VALID: False ({str(ex)})")

# 3. Serving & Contract testing
if model and preprocessor and metadata:
    try:
        # Check scikit-learn compatibility & shape
        expected_features = metadata.get("features", [])
        
        # Test input case
        inputs = {
            "N": 90,
            "P": 40,
            "K": 40,
            "temperature": 25.0,
            "humidity": 70.0,
            "ph": 6.5,
            "rainfall": 800.0
        }
        
        df = pd.DataFrame([inputs])[expected_features]
        scaled = preprocessor.transform(df)
        
        # Run prediction
        pred = model.predict(scaled)[0]
        proba = model.predict_proba(scaled)[0]
        
        print("PREDICT TEST: PASS")
        print(f"PREDICTED CROP: {pred}")
        print("PREDICT_PROBA TEST: PASS")
        print(f"PROBABILITY SUM: {np.sum(proba):.6f}")
    except Exception as ex:
        print(f"PREDICT/PREDICT_PROBA TEST: FAIL ({str(ex)})")
else:
    print("PREDICT/PREDICT_PROBA TEST: FAIL (Missing components)")
