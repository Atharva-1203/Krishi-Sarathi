"""API contract verification tests for FastAPI V3 endpoint."""

import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_api_v3_predict_valid():
    """Verify that a valid 7-parameter request succeeds and matches response schema."""
    payload = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 25.5,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 210.0
    }
    
    response = client.post("/api/v3/predict", json=payload)
    assert response.status_code == 200
    res = response.json()
    
    assert res["status"] == "success"
    assert res["model_version"] in ["V3", "V3.1"]
    assert len(res["top_recommendations"]) == 5
    assert "ood" in res
    assert "warnings" in res
    assert "explanation" in res

def test_api_v3_predict_missing_parameter():
    """Verify that missing parameters trigger a 422 Validation Error."""
    payload = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 25.5,
        "humidity": 82.0,
        "ph": 6.5
        # "rainfall" is missing
    }
    
    response = client.post("/api/v3/predict", json=payload)
    assert response.status_code == 422

def test_api_v3_predict_invalid_types():
    """Verify that invalid parameter types trigger a 422 Validation Error."""
    payload = {
        "N": "high",  # string instead of float
        "P": 42,
        "K": 43,
        "temperature": 25.5,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 210.0
    }
    
    response = client.post("/api/v3/predict", json=payload)
    assert response.status_code == 422
