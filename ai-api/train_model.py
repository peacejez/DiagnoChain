# train_model.py
import json
import joblib
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score

CSV_PATH = Path("transformed_disease_symptoms_randomized.csv")
MODEL_PATH = Path("diagnochain_model.joblib")
META_PATH = Path("diagnochain_meta.json")

def main():
    df = pd.read_csv(CSV_PATH)

    # Assume: label column is named 'disease'; all others are symptom features (0/1 or numeric)
    if "disease" not in df.columns:
        raise ValueError("Expected a 'disease' column in the CSV.")

    X = df.drop(columns=["disease"])
    y = df["disease"].astype(str)

    symptom_columns = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.35, random_state=42, stratify=y
    )

    # Simple, strong baseline
    pipe = Pipeline([
        ("scaler", StandardScaler(with_mean=False)),  # with_mean=False is okay for sparse-like 0/1
        ("clf", LogisticRegression(
            max_iter=2000,
            n_jobs=-1,
            class_weight="balanced",
            multi_class="ovr",
            solver="liblinear"  # robust for small/medium, binary features
        ))
    ])

    pipe.fit(X_train, y_train)

    # Basic evaluation (printed once at train time)
    y_pred = pipe.predict(X_test)
    y_proba = pipe.predict_proba(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"[INFO] Test accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred, zero_division=0))

    # Persist model + metadata
    joblib.dump(pipe, MODEL_PATH)
    META_PATH.write_text(json.dumps({
        "symptom_columns": symptom_columns
    }, indent=2))

    print(f"[OK] Saved model → {MODEL_PATH}")
    print(f"[OK] Saved metadata → {META_PATH}")

if __name__ == "__main__":
    main()
