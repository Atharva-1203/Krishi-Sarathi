"""Unit tests for the V3 Out-Of-Distribution (OOD) detection layer."""

import pytest
from backend.app.ml.v3.predictor import v3_predictor

@pytest.fixture(scope="module", autouse=True)
def init_predictor():
    v3_predictor.load()

def test_ood_normal():
    """Verify that typical in-distribution soil inputs return NORMAL."""
    query = {
        "N": 50.0, "P": 50.0, "K": 50.0,
        "temperature": 25.0, "humidity": 60.0,
        "ph": 6.5, "rainfall": 150.0
    }
    status, warnings = v3_predictor.check_ood(query)
    assert status == "NORMAL"
    assert len(warnings) == 0

def test_ood_caution():
    """Verify that near-boundary inputs return CAUTION."""
    bounds = v3_predictor.metadata["feature_bounds"]
    
    # Set N near the training maximum (p99 to max range)
    n_p99 = bounds["N"]["p99"]
    n_max = bounds["N"]["max"]
    caution_val = n_p99 + (n_max - n_p99) / 2.0
    
    query = {
        "N": caution_val, "P": 50.0, "K": 50.0,
        "temperature": 25.0, "humidity": 60.0,
        "ph": 6.5, "rainfall": 150.0
    }
    status, warnings = v3_predictor.check_ood(query)
    assert status == "CAUTION"
    assert len(warnings) > 0
    assert "extreme tail" in warnings[0]

def test_ood_out_of_bounds():
    """Verify that values completely outside the training min/max raise OUT_OF_DISTRIBUTION."""
    query = {
        "N": 500.0,  # Training max is much lower
        "P": 50.0, "K": 50.0,
        "temperature": 25.0, "humidity": 60.0,
        "ph": 6.5, "rainfall": 150.0
    }
    status, warnings = v3_predictor.check_ood(query)
    assert status == "OUT_OF_DISTRIBUTION"
    assert len(warnings) > 0
    assert "outside the validated training range" in warnings[0]
