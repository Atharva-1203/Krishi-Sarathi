class ExplanationService:
    @staticmethod
    def generate_natural_language(query: dict, crop: str, positive_shaps: list):
        reasons = []
        
        pH = query.get("pH", query.get("ph", 7.0))
        if 6.0 <= pH <= 7.5:
            reasons.append("soil pH is in the optimal neutral range")
        elif pH < 6.0:
            reasons.append("soil is slightly acidic which matches the crop profile")
        else:
            reasons.append("alkalinity levels are tolerable for root health")
            
        feat_names = [f[0].lower() for f in positive_shaps]
        
        if "n" in feat_names:
            reasons.append("available nitrogen is highly adequate for green vegetative growth")
        if "p" in feat_names:
            reasons.append("phosphorus is adequate to support early root propagation")
        if "k" in feat_names:
            reasons.append("potassium levels support cell division and crop drought tolerance")
        if "rainfall" in feat_names:
            reasons.append("cumulative rainfall matches the plant's water consumption footprint")
        else:
            reasons.append("water availability falls within drought tolerance thresholds")
            
        return f"{crop} is recommended because " + ", ".join(reasons) + "."
