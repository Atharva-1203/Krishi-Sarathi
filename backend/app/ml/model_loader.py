import os
import json
import pickle
from backend.app.core.config import settings
from backend.app.core.logging import logger

class KrishiSarathiPreprocessor:
    def __init__(self):
        self.medians = {}
        self.means = {}
        self.stds = {}
        self.soil_color_categories = ['Black', 'Red', 'Dark Brown', 'Medium Brown', 'Light Brown', 'Reddish Brown']
        self.district_categories = ['Kolhapur', 'Pune', 'Sangli', 'Satara', 'Solapur']
        self.season_categories = ['Kharif', 'Rabi']
        self.oc_categories = ['Low', 'Medium', 'High']
        
        self.numeric_cols = [
            "N", "P", "K", "pH", "Temperature", "Humidity", "Rainfall",
            "OC", "EC", "B", "Fe", "Mn", "Cu", "Zn", "S",
            "District_Normal_Rainfall", "N_P_Ratio", "N_K_Ratio", "P_K_Ratio",
            "Rainfall_Deviation", "Soil_Health_Score"
        ]
        
        self.crop_map = {
            "Sugarcane": 0, "Wheat": 1, "Cotton": 2, "Sorghum": 3, "Maize": 4, "Rice": 5,
            "Groundnut": 6, "Pigeonpea": 7, "Ginger": 8, "Grapes": 9, "Urad": 10, "Moong": 11,
            "Chickpea": 12, "Turmeric": 13, "Soyabean": 14, "Masoor": 15
        }
        self.crop_decoder = ["Sugarcane", "Wheat", "Cotton", "Sorghum", "Maize", "Rice", "Groundnut", "Pigeonpea", "Ginger", "Grapes", "Urad", "Moong", "Chickpea", "Turmeric", "Soyabean", "Masoor"]

    def fit(self, df):
        for col in self.numeric_cols:
            self.medians[col] = df[col].median()
            self.means[col] = df[col].mean()
            self.stds[col] = df[col].std()
            if self.stds[col] == 0:
                self.stds[col] = 1.0

    def transform(self, df):
        df_out = df.copy()
        for col in self.numeric_cols:
            if col in df_out.columns:
                df_out[col] = df_out[col].fillna(self.medians[col])
                df_out[col] = (df_out[col] - self.means[col]) / self.stds[col]
            else:
                df_out[col] = 0.0
        for cat in self.soil_color_categories:
            df_out[f"Soil_Color_{cat}"] = (df_out["Soil_Color"] == cat).astype(float)
        for cat in self.district_categories:
            df_out[f"District_{cat}"] = (df_out["District"] == cat).astype(float)
        for cat in self.season_categories:
            df_out[f"Growing_Season_{cat}"] = (df_out["Growing_Season"] == cat).astype(float)
        for cat in self.oc_categories:
            df_out[f"OC_Class_{cat}"] = (df_out["OC_Class"] == cat).astype(float)
            
        features = []
        features.extend(self.numeric_cols)
        for cat in self.soil_color_categories:
            features.append(f"Soil_Color_{cat}")
        for cat in self.district_categories:
            features.append(f"District_{cat}")
        for cat in self.season_categories:
            features.append(f"Growing_Season_{cat}")
        for cat in self.oc_categories:
            features.append(f"OC_Class_{cat}")
            
        return df_out[features]

class CustomUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module == "__main__" and name == "KrishiSarathiPreprocessor":
            return KrishiSarathiPreprocessor
        return super().find_class(module, name)

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
            self.preprocessor = CustomUnpickler(f).load()
        with open(meta_path, "r") as f:
            self.metadata = json.load(f)
        with open(feats_path, "r") as f:
            self.feature_order = json.load(f)
        with open(lbls_path, "rb") as f:
            self.label_encoder = pickle.load(f)
            
        logger.info(f"Successfully loaded production model: {self.metadata['model_type']}")

model_loader = ModelLoader()
