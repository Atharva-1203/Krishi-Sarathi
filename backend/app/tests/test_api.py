import os
import sys
from fastapi.testclient import TestClient

# Add workspace to sys path to avoid module import failures
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))

from backend.app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_health_check():
    with client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

def test_predict_endpoint():
    with client:
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
        data = response.json()
        assert data["status"] == "success"
        assert len(data["top_recommendations"]) == 5
        assert "explanation" in data
