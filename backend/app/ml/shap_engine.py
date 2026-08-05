import numpy as np
import shap
from backend.app.ml.model_loader import model_loader

class ShapEngine:
    def __init__(self):
        self.explainer = None
        
    def explain(self, X_query: np.ndarray, top_class_idx: int):
        if self.explainer is None:
            self.explainer = shap.TreeExplainer(model_loader.model)
            
        shap_vals = self.explainer.shap_values(X_query)
        sample_shap = shap_vals[0, :, top_class_idx]
        
        sorted_indices = np.argsort(sample_shap)[::-1]
        top_positive = []
        top_negative = []
        
        for idx in sorted_indices:
            feat_name = model_loader.feature_order[idx]
            val = sample_shap[idx]
            if val > 0.01:
                top_positive.append((feat_name, float(val)))
            elif val < -0.01:
                top_negative.append((feat_name, float(val)))
                
        return {
            "top_positive": top_positive[:3],
            "top_negative": top_negative[:3]
        }

shap_engine = ShapEngine()
