"""Unit tests for the V3 predictor output format and predictions."""

import pytest
from backend.app.ml.v3.predictor import v3_predictor

@pytest.fixture(scope="module", autouse=True)
def init_predictor():
    v3_predictor.load()

def test_prediction_output_structure():
    """Verify that predictions match the API specifications and return top-5 results."""
    query = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 20.87,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 202.9
    }
    
    res = v3_predictor.predict(query)
    
    assert res["status"] == "success"
    assert res["model_version"] in ["V3", "V3.1"]
    assert "top_recommendations" in res
    assert len(res["top_recommendations"]) == 5
    
    # Check ranking and probability order
    prev_prob = 1.0
    for idx, rec in enumerate(res["top_recommendations"]):
        assert rec["rank"] == idx + 1
        assert "crop" in rec
        assert isinstance(rec["crop"], str)
        assert 0.0 <= rec["probability"] <= 1.0
        assert rec["probability"] <= prev_prob
        prev_prob = rec["probability"]
        
    assert "explanation" in res
    assert "supporting_parameters" in res["explanation"]
    assert "limiting_parameters" in res["explanation"]
