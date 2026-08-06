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
from ml.preprocessing.shared_feature_builder import SharedFeatureBuilder, FEATURE_ORDER

def run_training_pipeline():
    dataset_path = r"d:\Techrush\ml\datasets\crop_recommendation.csv"
    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}")
        return
        
    df = pd.read_csv(dataset_path)
    
    # Preprocess targets
    crop_classes = sorted(list(df['label'].unique()))
    print(f"Unique Target Crops ({len(crop_classes)}): {crop_classes}")
    
    y = df['label'].map(lambda c: crop_classes.index(c))
    
    # Process inputs using SharedFeatureBuilder row-by-row to guarantee 100% logic alignment
    processed_rows = []
    for idx, row in df.iterrows():
        query_dict = {
            "N": row["N"],
            "P": row["P"],
            "K": row["K"],
            "temperature": row["temperature"],
            "humidity": row["humidity"],
            "ph": row["ph"],
            "rainfall": row["rainfall"]
        }
        df_row = SharedFeatureBuilder.prepare_input(query_dict)
        processed_rows.append(df_row.iloc[0])
        
    X = pd.DataFrame(processed_rows, columns=FEATURE_ORDER)
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train StandardScaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Benchmark Models
    models = {
        "RandomForest": RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42),
        "ExtraTrees": ExtraTreesClassifier(n_estimators=100, class_weight="balanced", random_state=42),
        "DecisionTree": DecisionTreeClassifier(class_weight="balanced", random_state=42)
    }
    
    best_f1 = 0.0
    best_model_name = None
    best_model = None
    evaluation_results = {}
    
    print("\nBenchmarking Classifiers:")
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
            
    print(f"\nWinner Model: {best_model_name} (Macro-F1: {best_f1:.4f})")
    
    # Save artifacts
    model_dir = r"d:\Techrush\ml\models\production"
    os.makedirs(model_dir, exist_ok=True)
    
    with open(os.path.join(model_dir, "model.pkl"), "wb") as f:
        pickle.dump(best_model, f)
        
    with open(os.path.join(model_dir, "preprocessor.pkl"), "wb") as f:
        pickle.dump(scaler, f)
        
    with open(os.path.join(model_dir, "label_encoder.pkl"), "wb") as f:
        pickle.dump(crop_classes, f)
        
    with open(os.path.join(model_dir, "feature_order.json"), "w") as f:
        json.dump(FEATURE_ORDER, f)
        
    metadata = {
        "model_type": best_model_name,
        "features": FEATURE_ORDER,
        "classes": crop_classes,
        "metrics": evaluation_results[best_model_name]
    }
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print("V3 production model successfully compiled.")

if __name__ == "__main__":
    run_training_pipeline()
