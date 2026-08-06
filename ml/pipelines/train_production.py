"""Canonical training entry point: it uses the same builder and preprocessor as serving."""

import json
import pickle
from pathlib import Path

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, balanced_accuracy_score, f1_score, log_loss

from backend.app.ml.feature_builder import build_frame
from backend.app.ml.preprocessing import KrishiSarathiPreprocessor

ROOT = Path(__file__).resolve().parents[2]
INPUT_COLUMNS = ["District", "Soil_Color", "N", "P", "K", "pH", "Temperature", "Humidity", "Rainfall"]


def train():
    train_df = pd.read_csv(ROOT / "datasets/final/train.csv")
    validation_df = pd.read_csv(ROOT / "datasets/final/validation.csv")
    preprocessor = KrishiSarathiPreprocessor()
    training_features = build_frame(train_df[INPUT_COLUMNS].to_dict("records"))
    validation_features = build_frame(validation_df[INPUT_COLUMNS].to_dict("records"))
    preprocessor.fit(training_features)
    x_train, x_validation = preprocessor.transform(training_features), preprocessor.transform(validation_features)
    y_train = train_df["Crop"].map(preprocessor.crop_map)
    y_validation = validation_df["Crop"].map(preprocessor.crop_map)
    model = RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42)
    model.fit(x_train, y_train)
    probabilities = model.predict_proba(x_validation)
    predictions = probabilities.argmax(axis=1)
    metrics = {"accuracy": float(accuracy_score(y_validation, predictions)), "balanced_accuracy": float(balanced_accuracy_score(y_validation, predictions)), "macro_f1": float(f1_score(y_validation, predictions, average="macro")), "log_loss": float(log_loss(y_validation, probabilities, labels=list(range(16))),), "training_contract": "feature_builder_v1"}
    targets = [ROOT / "backend/app/models", ROOT / "ml/models/production"]
    for target in targets:
        target.mkdir(parents=True, exist_ok=True)
        with open(target / "model.pkl", "wb") as handle: pickle.dump(model, handle)
        with open(target / "preprocessor.pkl", "wb") as handle: pickle.dump(preprocessor, handle)
        (target / "feature_order.json").write_text(json.dumps(preprocessor.feature_names(), indent=2))
        (target / "metadata.json").write_text(json.dumps({"model_type": "RandomForest", "contract_version": "feature_builder_v1", "metrics": metrics}, indent=2))
    print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
    train()
