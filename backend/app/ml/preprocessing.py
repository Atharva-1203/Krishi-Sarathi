"""The sole serialized preprocessing implementation for training and serving."""

import pandas as pd


class KrishiSarathiPreprocessor:
    def __init__(self):
        self.medians = {}
        self.means = {}
        self.stds = {}
        self.soil_color_categories = ["Black", "Red", "Dark Brown", "Medium Brown", "Light Brown", "Reddish Brown"]
        self.district_categories = ["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"]
        self.season_categories = ["Kharif", "Rabi"]
        self.oc_categories = ["Low", "Medium", "High"]
        self.numeric_cols = ["N", "P", "K", "pH", "Temperature", "Humidity", "Rainfall", "OC", "EC", "B", "Fe", "Mn", "Cu", "Zn", "S", "District_Normal_Rainfall", "N_P_Ratio", "N_K_Ratio", "P_K_Ratio", "Rainfall_Deviation", "Soil_Health_Score"]
        self.crop_map = {"Sugarcane": 0, "Wheat": 1, "Cotton": 2, "Sorghum": 3, "Maize": 4, "Rice": 5, "Groundnut": 6, "Pigeonpea": 7, "Ginger": 8, "Grapes": 9, "Urad": 10, "Moong": 11, "Chickpea": 12, "Turmeric": 13, "Soyabean": 14, "Masoor": 15}
        self.crop_decoder = list(self.crop_map)

    def fit(self, df: pd.DataFrame):
        for column in self.numeric_cols:
            self.medians[column] = float(df[column].median())
            self.means[column] = float(df[column].mean())
            std = float(df[column].std())
            self.stds[column] = std if std else 1.0

    def feature_names(self):
        return self.numeric_cols + [f"Soil_Color_{x}" for x in self.soil_color_categories] + [f"District_{x}" for x in self.district_categories] + [f"Growing_Season_{x}" for x in self.season_categories] + [f"OC_Class_{x}" for x in self.oc_categories]

    def transform(self, df: pd.DataFrame):
        result = df.copy()
        for column in self.numeric_cols:
            result[column] = result[column].fillna(self.medians[column]) if column in result else 0.0
            result[column] = (result[column] - self.means[column]) / self.stds[column]
        for category in self.soil_color_categories:
            result[f"Soil_Color_{category}"] = (result["Soil_Color"] == category).astype(float)
        for category in self.district_categories:
            result[f"District_{category}"] = (result["District"] == category).astype(float)
        for category in self.season_categories:
            result[f"Growing_Season_{category}"] = (result["Growing_Season"] == category).astype(float)
        for category in self.oc_categories:
            result[f"OC_Class_{category}"] = (result["OC_Class"] == category).astype(float)
        return result[self.feature_names()]
