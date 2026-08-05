class ExplanationService:
    @staticmethod
    def generate_natural_language(query: dict, crop: str, positive_shaps: list):
        reasons = []
        
        pH = query.get("pH", 7.0)
        if 6.0 <= pH <= 7.5:
            reasons.append("soil pH is in the optimal neutral range")
        elif pH < 6.0:
            reasons.append("soil is slightly acidic which is suitable for tuber root structures")
        else:
            reasons.append("alkalinity levels are tolerable for root health")
            
        feat_names = [f[0] for f in positive_shaps]
        
        if "N" in feat_names or "N_P_Ratio" in feat_names:
            reasons.append("available nitrogen is highly adequate for green vegetative growth")
        if "P" in feat_names or "P_K_Ratio" in feat_names:
            reasons.append("phosphorus is adequate to support early root propagation")
        if "K" in feat_names:
            reasons.append("potassium levels support cell division and crop drought tolerance")
        if "Rainfall" in feat_names:
            reasons.append("cumulative monsoon rainfall matches the plant's water consumption footprint")
        else:
            reasons.append("rainfall deviation falls within drought tolerance thresholds")
            
        return f"{crop} is recommended because " + ", ".join(reasons) + "."
