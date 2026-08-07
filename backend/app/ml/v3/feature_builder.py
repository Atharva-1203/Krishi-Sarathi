"""Shared feature builder to ensure 100% training-serving parity in V3."""

import pandas as pd
from backend.app.ml.v3.feature_contract import FEATURES

class V3FeatureBuilder:
    @staticmethod
    def build_features(payload: dict) -> dict:
        """
        Parses and returns a flat dict with exactly the 7 contract features.
        Supports case-insensitive key lookups.
        """
        # Map user input keys case-insensitively
        N = float(payload.get("N", payload.get("n", 0.0)))
        P = float(payload.get("P", payload.get("p", 0.0)))
        K = float(payload.get("K", payload.get("k", 0.0)))
        
        temp = float(payload.get("temperature", payload.get("Temperature", 0.0)))
        humidity = float(payload.get("humidity", payload.get("Humidity", 0.0)))
        ph = float(payload.get("ph", payload.get("pH", 7.0)))
        rainfall = float(payload.get("rainfall", payload.get("Rainfall", 0.0)))
        
        return {
            "N": N,
            "P": P,
            "K": K,
            "temperature": temp,
            "humidity": humidity,
            "ph": ph,
            "rainfall": rainfall
        }

    @classmethod
    def build_frame(cls, records: list) -> pd.DataFrame:
        """Converts a list of dict payloads into a sorted DataFrame matching the contract."""
        processed = [cls.build_features(r) for r in records]
        df = pd.DataFrame(processed)
        return df[FEATURES]
