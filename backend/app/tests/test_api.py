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
            "District": "Kolhapur",
            "Soil_Color": "Black",
            "N": 75,
            "P": 50,
            "K": 100,
            "pH": 6.5,
            "Temperature": 22.0,
            "Humidity": 85.0,
            "Rainfall": 1200.0
        }
        response = client.post("/api/v1/predict", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert len(data["top_recommendations"]) == 3
        assert "why_recommended" in data["top_recommendations"][0]
