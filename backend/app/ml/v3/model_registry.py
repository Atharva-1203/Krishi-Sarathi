"""Model registry manager for V3 models."""

import os
import json

class V3ModelRegistry:
    def __init__(self, registry_path=r"d:\Techrush\ml\models\v3_registry.json"):
        self.registry_path = registry_path
        self.data = {"production": None, "comparison_log": []}
        self.load()

    def load(self):
        if os.path.exists(self.registry_path):
            try:
                with open(self.registry_path, "r", encoding="utf-8") as f:
                    self.data = json.load(f)
            except Exception:
                pass

    def save(self):
        os.makedirs(os.path.dirname(self.registry_path), exist_ok=True)
        with open(self.registry_path, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2)

    def register_model(self, run_metadata: dict, set_production: bool = False):
        self.data["comparison_log"].append(run_metadata)
        if set_production or self.data["production"] is None:
            self.data["production"] = run_metadata
        self.save()
