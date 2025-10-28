from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np

app = Flask(__name__)

texts = [
    "fever cough sore throat flu influenza",
    "chest pain shortness of breath heart attack cardiac",
    "headache nausea dizziness migraine",
    "back pain muscle pain leg pain strain sprain",
    "rash itching allergy hives"
]
labels = ["Influenza", "Myocardial Infarction", "Migraine", "Musculoskeletal Pain", "Allergic Reaction"]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)
clf = LogisticRegression(max_iter=1000)
clf.fit(X, labels)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    symptoms = data.get('symptoms','')
    Xq = vectorizer.transform([symptoms])
    if hasattr(clf, "predict_proba"):
        probs = clf.predict_proba(Xq)[0]
        classes = clf.classes_
        top_idx = np.argsort(probs)[::-1][:3]
        preds = [{"disease": classes[i], "probability": round(float(probs[i])*100,2)} for i in top_idx]
    else:
        pred = clf.predict(Xq)[0]
        preds = [{"disease": pred, "probability": 100.0}]
    return jsonify({"predictions": preds})

@app.get('/')
def health():
    return jsonify({"status":"ok"})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
