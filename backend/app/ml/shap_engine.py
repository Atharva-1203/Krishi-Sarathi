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
        
        # Handle list vs 3D array outputs from TreeExplainer across multi-class scenarios
        if isinstance(shap_vals, list):
            # shap_vals[top_class_idx] has shape [n_samples, n_features]
            sample_shap = shap_vals[top_class_idx][0, :]
        elif isinstance(shap_vals, np.ndarray) and len(shap_vals.shape) == 3:
            # shape: [n_samples, n_features, n_classes]
            sample_shap = shap_vals[0, :, top_class_idx]
        else:
            # 1D/2D array fallback
            if len(shap_vals.shape) == 2:
                sample_shap = shap_vals[0, :]
            else:
                sample_shap = shap_vals
                
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
