"""Unit tests for the V3 Feature Contract and Builder."""

import pytest
import pandas as pd
from backend.app.ml.v3.feature_contract import FEATURES
from backend.app.ml.v3.feature_builder import V3FeatureBuilder

def test_feature_contract_elements():
    """Assert feature list matches the specifications exactly."""
    expected = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
    assert FEATURES == expected
    assert len(FEATURES) == 7

def test_feature_builder_parsing():
    """Verify feature builder maps casing and handles inputs correctly."""
    raw = {
        "n": 90,
        "P": 42,
        "k": 43,
        "Temperature": 25.5,
        "humidity": 82.0,
        "pH": 6.5,
        "Rainfall": 200.0,
        "extra_field": "ignore_me"
    }
    
    parsed = V3FeatureBuilder.build_features(raw)
    
    # Check keys and types
    assert set(parsed.keys()) == set(FEATURES)
    assert parsed["N"] == 90.0
    assert parsed["P"] == 42.0
    assert parsed["K"] == 43.0
    assert parsed["temperature"] == 25.5
    assert parsed["humidity"] == 82.0
    assert parsed["ph"] == 6.5
    assert parsed["rainfall"] == 200.0
    assert "extra_field" not in parsed

def test_feature_builder_dataframe():
    """Verify DataFrame helper structures output correctly."""
    records = [
        {"N": 90, "P": 40, "K": 40, "temperature": 20, "humidity": 80, "ph": 6.5, "rainfall": 200},
        {"N": 80, "P": 50, "K": 50, "temperature": 22, "humidity": 75, "ph": 6.0, "rainfall": 180}
    ]
    df = V3FeatureBuilder.build_frame(records)
    
    assert isinstance(df, pd.DataFrame)
    assert list(df.columns) == FEATURES
    assert len(df) == 2
