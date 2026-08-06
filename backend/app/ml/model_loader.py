import os
import json
import pickle
from backend.app.core.config import settings
from backend.app.core.logging import logger

class ModelLoader:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.feature_order = None
        self.metadata = None
        self.label_encoder = None
        
    def load(self):
        logger.info("Initializing model loading sequence...")
        model_path = os.path.join(settings.MODEL_DIR, "model.pkl")
        prep_path = os.path.join(settings.MODEL_DIR, "preprocessor.pkl")
        meta_path = os.path.join(settings.MODEL_DIR, "metadata.json")
        feats_path = os.path.join(settings.MODEL_DIR, "feature_order.json")
        lbls_path = os.path.join(settings.MODEL_DIR, "label_encoder.pkl")
        
        with open(model_path, "rb") as f:
            self.model = pickle.load(f)
        with open(prep_path, "rb") as f:
            self.preprocessor = pickle.load(f)
        with open(meta_path, "r") as f:
            self.metadata = json.load(f)
        with open(feats_path, "r") as f:
            self.feature_order = json.load(f)
        with open(lbls_path, "rb") as f:
            self.label_encoder = pickle.load(f)
            
        logger.info(f"Successfully loaded production model: {self.metadata['model_type']}")

model_loader = ModelLoader()
