"""Verification tests for Sugarcane bias and prediction distribution diversity."""

import pytest
import numpy as np
from backend.app.ml.v3.predictor import v3_predictor

@pytest.fixture(scope="module", autouse=True)
def init_predictor():
    v3_predictor.load()

def test_sugarcane_bias_check():
    """Verify that Sugarcane does not dominate the V3 engine predictions."""
    classes = v3_predictor.classes
    
    # If Sugarcane is not in target classes, bias is naturally zero
    if "sugarcane" not in [c.lower() for c in classes]:
        print("Sugarcane is not a target class of the V3 model. Bias is eliminated.")
        assert True
        return
        
    # If it is in classes, we audit 100 random predictions
    # and verify Sugarcane is not predicted in more than 15% of cases.
    np.random.seed(42)
    sugarcane_predictions = 0
    total_runs = 100
    
    bounds = v3_predictor.metadata["feature_bounds"]
    
    for _ in range(total_runs):
        query = {}
        for feat in bounds:
            p01 = bounds[feat]["p01"]
            p99 = bounds[feat]["p99"]
            query[feat] = float(np.random.uniform(p01, p99))
            
        res = v3_predictor.predict(query)
        top_crop = res["top_recommendations"][0]["crop"].lower()
        if top_crop == "sugarcane":
            sugarcane_predictions += 1
            
    ratio = sugarcane_predictions / total_runs
    print(f"Sugarcane top-1 predicted ratio: {ratio*100:.2f}%")
    assert ratio < 0.15, f"Sugarcane bias detected: predicted in {ratio*100:.2f}% of runs!"
