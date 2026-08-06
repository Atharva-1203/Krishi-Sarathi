"""Versioned feature contract shared by model training and API inference."""

import numpy as np
import pandas as pd

DISTRICT_SOIL_DEFAULTS = {
    "Kolhapur": {"OC": 0.88, "EC": 0.14, "B": 2.88, "Fe": 6.35, "Mn": 17.636, "Cu": 3.25, "Zn": 0.72, "S": 50.72},
    "Solapur": {"OC": 0.45, "EC": 0.32, "B": 0.16, "Fe": 1.56, "Mn": 1.56, "Cu": 0.58, "Zn": 0.5, "S": 7.05},
    "Satara": {"OC": 0.295, "EC": 0.25, "B": 0.073, "Fe": 3.96, "Mn": 6.2, "Cu": 2.4, "Zn": 0.793, "S": 4.178},
    "Sangli": {"OC": 0.583, "EC": 0.24, "B": 0.973, "Fe": 3.16, "Mn": 6.06, "Cu": 2.88, "Zn": 0.62, "S": 10.75},
    "Pune": {"OC": 0.41, "EC": 0.408, "B": 0.46, "Fe": 1.32, "Mn": 2.802, "Cu": 0.53, "Zn": 0.374, "S": 6.746},
}
DISTRICT_RAINFALL = {"Kolhapur": 1733.1, "Pune": 861.6, "Sangli": 514.5, "Satara": 886.2, "Solapur": 481.1}
SOIL_COLORS = ["Black", "Red", "Dark Brown", "Medium Brown", "Light Brown", "Reddish Brown"]


def build_features(payload: dict) -> dict:
    """Build all model inputs solely from the public, version-1 request contract."""
    result = dict(payload)
    district = str(result.get("District", "Pune")).strip().title()
    district = district if district in DISTRICT_SOIL_DEFAULTS else "Pune"
    soil_color = str(result.get("Soil_Color", "Black")).strip().title()
    result["District"] = district
    result["Soil_Color"] = soil_color if soil_color in SOIL_COLORS else "Black"
    # These inputs are not supplied by the current user contract. They are
    # intentionally deterministic district defaults in both training and serving.
    result.update(DISTRICT_SOIL_DEFAULTS[district])
    result["Growing_Season"] = result.get("Growing_Season", "Kharif")
    n, phosphorus, potassium = float(result["N"]), float(result["P"]), float(result["K"])
    ph, temperature, rainfall = float(result["pH"]), float(result["Temperature"]), float(result["Rainfall"])
    result["Humidity"] = float(result["Humidity"])
    result["OC_Class"] = "Low" if result["OC"] < 0.4 else "Medium" if result["OC"] < 0.6 else "High"
    result["Soil_Health_Score"] = float(2 * (6 <= ph <= 7.5) + 2 * (n >= 80) + 2 * (phosphorus >= 25) + 2 * (potassium >= 150) + 2 * (result["OC"] >= 0.6))
    normal_rainfall = DISTRICT_RAINFALL[district]
    result["District_Normal_Rainfall"] = normal_rainfall
    result["Rainfall_Deviation"] = round((rainfall - normal_rainfall) / normal_rainfall, 4)
    result["N_P_Ratio"] = round(n / (phosphorus + 0.01), 4)
    result["N_K_Ratio"] = round(n / (potassium + 0.01), 4)
    result["P_K_Ratio"] = round(phosphorus / (potassium + 0.01), 4)
    return result


def build_frame(records) -> pd.DataFrame:
    return pd.DataFrame([build_features(record) for record in records])
