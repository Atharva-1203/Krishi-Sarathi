"""Shared preprocessing wrapper for standard scaling in V3."""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from backend.app.ml.v3.feature_contract import FEATURES

class V3Preprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.feature_names = FEATURES

    def fit(self, df: pd.DataFrame):
        """Fits the StandardScaler on the 7 core features."""
        # Ensure correct column ordering
        self.scaler.fit(df[FEATURES])
        return self

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """Scales the 7 features and returns a new DataFrame."""
        scaled_data = self.scaler.transform(df[FEATURES])
        return pd.DataFrame(scaled_data, columns=FEATURES)

    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """Fits and transforms the 7 core features."""
        self.fit(df)
        return self.transform(df)
