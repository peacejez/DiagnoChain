# predict_service.py
import re
import json
import joblib
import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple

MODEL_PATH = Path("diagnochain_model.joblib")
META_PATH = Path("diagnochain_meta.json")

# Minimal synonym/alias map (add more as you go)
# Keys are canonical symptom column names from your CSV.
# Values are lists of phrases you'd expect users to type.
SYMPTOM_ALIASES: Dict[str, List[str]] = {
    "back_pain": ["back pain", "lower back pain", "lumbar pain", "sakit belakang"],
    "joint_pain": ["joint pain", "sendi sakit", "aching joints"],
    "muscle_pain": ["muscle pain", "sore muscles", "myalgia", "otot sakit"],
    "neck_pain": ["neck pain", "stiff neck", "sakit leher"],
    "leg_pain": ["leg pain", "kaki sakit", "pain in leg"],
    "headache": ["headache", "migraine", "sakit kepala"],
    "vomiting": ["vomit", "vomiting", "muntah"],
    "nausea": ["nausea", "nauseous", "loya"],
    "fatigue": ["fatigue", "tired", "exhausted", "letih"],
    "fever": ["fever", "high temperature", "demam"],
    # …extend to match your dataset columns
}

def _normalize_text(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def _load_artifacts():
    if not MODEL_PATH.exists() or not META_PATH.exists():
        raise FileNotFoundError(
            "Model or metadata not found. Run train_model.py first to create .joblib and .json."
        )
    model = joblib.load(MODEL_PATH)
    meta = json.loads(META_PATH.read_text())
    symptom_columns: List[str] = meta["symptom_columns"]
    return model, symptom_columns

def text_to_features(user_text: str, symptom_columns: List[str]) -> np.ndarray:
    """
    Convert free text (e.g., 'I have leg pain...') into a 1D feature array
    matching the training matrix column order.
    """
    norm = _normalize_text(user_text)
    present = set()

    # match aliases
    for col, phrases in SYMPTOM_ALIASES.items():
        for p in phrases:
            if p in norm:
                present.add(col)
                break

    # Feature vector in training order
    x = np.zeros(len(symptom_columns), dtype=float)
    idx_map = {name: i for i, name in enumerate(symptom_columns)}
    for col in present:
        if col in idx_map:
            x[idx_map[col]] = 1.0
    return x

def predict_topk(user_text: str, k: int = 3) -> List[Tuple[str, float]]:
    model, symptom_columns = _load_artifacts()
    x = text_to_features(user_text, symptom_columns).reshape(1, -1)
    probs = model.predict_proba(x)[0]  # shape: (n_classes,)
    classes = model.classes_
    # sort by probability desc
    order = np.argsort(probs)[::-1]
    top = [(classes[i], float(probs[i])) for i in order[:k]]
    # normalize top-k to percentages summing to ~100 (optional, looks nice)
    total = sum(p for _, p in top) or 1.0
    top_pct = [(cls, 100.0 * p / total) for cls, p in top]
    return top_pct

if __name__ == "__main__":
    # quick demo
    example = "I have leg pain, back pain and muscle pain"
    results = predict_topk(example, k=3)
    best = max(results, key=lambda t: t[1])[0]
    print(f"Input: {example}")
    print("Top-3 predictions:")
    for cls, pct in results:
        print(f" • {cls}: {pct:.2f}%")
    print(f"Highest prediction → {best}")
