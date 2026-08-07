"""Unit tests for the V3 model probability distribution math."""

import pytest
import numpy as np
import pandas as pd
from backend.app.ml.v3.predictor import v3_predictor
from backend.app.ml.v3.feature_contract import FEATURES

@pytest.fixture(scope="module", autouse=True)
def init_predictor():
    v3_predictor.load()

def test_probability_distribution_integrity():
    """Verify that model probabilities sum to 1.0 and are free of NaNs/negatives."""
    query = {
        "N": 50,
        "P": 50,
        "K": 50,
        "temperature": 25.0,
        "humidity": 60.0,
        "ph": 6.5,
        "rainfall": 150.0
    }
    
    # Run full prediction pipeline
    res = v3_predictor.predict(query)
    
    assert res["status"] == "success"
    
    # Directly inspect full probability vector from model
    df_query = pd.DataFrame([query])[FEATURES]
    df_scaled = v3_predictor.preprocessor.transform(df_query)
    proba = v3_predictor.model.predict_proba(df_scaled)[0]
    
    # Assertions
    assert not np.any(np.isnan(proba))
    assert not np.any(np.isinf(proba))
    assert np.all(proba >= 0.0)
    assert np.all(proba <= 1.0)
    assert np.isclose(np.sum(proba), 1.0, atol=1e-4)
