import os
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, balanced_accuracy_score, f1_score

def run_training_pipeline():
    dataset_path = r"d:\Techrush\ml\datasets\crop_recommendation.csv"
    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}")
        return
        
    df = pd.read_csv(dataset_path)
    
    # 7 Core features
    feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[feature_cols]
    y = df['label']
    
    # Label mapping
    crop_classes = sorted(list(y.unique()))
    print(f"Unique Crop Classes ({len(crop_classes)}): {crop_classes}")
    
    # Encode y to integers
    y_encoded = y.map(lambda c: crop_classes.index(c))
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )
    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Models to evaluate
    models = {
        "RandomForest": RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42),
        "ExtraTrees": ExtraTreesClassifier(n_estimators=100, class_weight="balanced", random_state=42),
        "DecisionTree": DecisionTreeClassifier(class_weight="balanced", random_state=42)
    }
    
    best_f1 = 0.0
    best_model_name = None
    best_model = None
    evaluation_results = {}
    
    print("\nEvaluating Models:")
    for name, clf in models.items():
        clf.fit(X_train_scaled, y_train)
        preds = clf.predict(X_test_scaled)
        
        acc = accuracy_score(y_test, preds)
        bal_acc = balanced_accuracy_score(y_test, preds)
        f1_macro = f1_score(y_test, preds, average="macro")
        
        print(f" - {name}: Accuracy={acc:.4f}, Balanced Accuracy={bal_acc:.4f}, Macro-F1={f1_macro:.4f}")
        
        evaluation_results[name] = {
            "accuracy": float(acc),
            "balanced_accuracy": float(bal_acc),
            "f1_macro": float(f1_macro)
        }
        
        if f1_macro > best_f1:
            best_f1 = f1_macro
            best_model_name = name
            best_model = clf
            
    print(f"\nOptimal model chosen: {best_model_name} (Macro-F1: {best_f1:.4f})")
    
    # Serialize outputs
    model_dir = r"d:\Techrush\ml\models\production"
    os.makedirs(model_dir, exist_ok=True)
    
    # Save best model
    with open(os.path.join(model_dir, "model.pkl"), "wb") as f:
        pickle.dump(best_model, f)
        
    # Save scaler (preprocessor)
    with open(os.path.join(model_dir, "preprocessor.pkl"), "wb") as f:
        pickle.dump(scaler, f)
        
    # Save label encoder class list
    with open(os.path.join(model_dir, "label_encoder.pkl"), "wb") as f:
        pickle.dump(crop_classes, f)
        
    # Save features list
    with open(os.path.join(model_dir, "feature_order.json"), "w") as f:
        json.dump(feature_cols, f)
        
    # Save metadata JSON
    metadata = {
        "model_type": best_model_name,
        "features": feature_cols,
        "classes": crop_classes,
        "metrics": evaluation_results[best_model_name]
    }
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print("Training pipeline artifacts successfully saved to ml/models/production/")

if __name__ == "__main__":
    run_training_pipeline()
