import os
import json
import numpy as np

class AgronomicProfileMatcher:
    def __init__(self, profiles_path=None):
        if profiles_path is None:
            profiles_path = os.path.join(os.path.dirname(__file__), "crop_profiles.json")
        
        self.profiles_path = profiles_path
        self.profiles = {}
        self.load()

    def load(self):
        if not os.path.exists(self.profiles_path):
            raise FileNotFoundError(f"Crop profiles not found at {self.profiles_path}")
        with open(self.profiles_path, "r", encoding="utf-8") as f:
            self.profiles = json.load(f)

    def calculate_compatibility(self, input_val: float, median: float, iqr: float, epsilon=1e-5) -> tuple:
        """
        Calculates robust standardized distance and returns (distance, compatibility_score, interpretation)
        """
        # Robust distance: IQR-scaled deviation
        distance = abs(input_val - median) / max(iqr, epsilon)
        
        # Transform to [0.0, 1.0] via exponential decay kernel
        # distance <= 0.5 (inside IQR range) -> compatibility >= 83%
        # distance = 1.0 -> compatibility = 60.6%
        # distance = 2.0 -> compatibility = 24.4%
        compatibility = float(np.exp(-0.5 * (distance ** 1.5)))
        
        # Interpretations
        if compatibility >= 0.85:
            interpretation = "Optimal match (well within typical range)"
        elif compatibility >= 0.60:
            interpretation = "Good match (within normal limits)"
        elif compatibility >= 0.30:
            interpretation = "Sub-optimal match (marginal bounds)"
        else:
            interpretation = "Poor match (outside typical profile)"
            
        return distance, compatibility, interpretation

    def match_field(self, query: dict, crop: str) -> dict:
        """
        Computes feature-level compatibility scorecard for a single crop.
        """
        crop_key = crop.lower()
        if crop_key not in self.profiles:
            return {}
            
        profile = self.profiles[crop_key]
        features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        
        feature_scores = {}
        total_compatibility = 0.0
        
        for feat in features:
            val = float(query[feat])
            feat_stats = profile[feat]
            
            median = feat_stats["median"]
            iqr = feat_stats["iqr"]
            
            dist, comp, interp = self.calculate_compatibility(val, median, iqr)
            
            feature_scores[feat] = {
                "feature": feat,
                "input": val,
                "crop_median": median,
                "distance": round(dist, 4),
                "compatibility": round(comp, 4),
                "interpretation": interp
            }
            total_compatibility += comp
            
        overall_compatibility = total_compatibility / len(features)
        
        return {
            "crop": crop,
            "overall_compatibility": round(overall_compatibility, 4),
            "feature_compatibilities": feature_scores
        }

# Global matcher instance
profile_matcher = AgronomicProfileMatcher()
