import pandas as pd
import numpy as np

FEATURE_ORDER = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']

class SharedFeatureBuilder:
    @staticmethod
    def prepare_input(query_dict: dict) -> pd.DataFrame:
        """
        Coerces input fields into standard formats and returns an aligned DataFrame.
        Expected features in contract order:
        ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        """
        # Map user input keys (supports both lowercase and title-case)
        N = float(query_dict.get("N", query_dict.get("n", 50.0)))
        P = float(query_dict.get("P", query_dict.get("p", 40.0)))
        K = float(query_dict.get("K", query_dict.get("k", 40.0)))
        
        temp = float(query_dict.get("Temperature", query_dict.get("temperature", 25.0)))
        humidity = float(query_dict.get("Humidity", query_dict.get("humidity", 60.0)))
        ph = float(query_dict.get("pH", query_dict.get("ph", 6.5)))
        rainfall = float(query_dict.get("Rainfall", query_dict.get("rainfall", 800.0)))
        
        # Build dictionary matching exact lowercase feature order
        data = {
            "N": N,
            "P": P,
            "K": K,
            "temperature": temp,
            "humidity": humidity,
            "ph": ph,
            "rainfall": rainfall
        }
        
        df = pd.DataFrame([data])
        return df[FEATURE_ORDER]
