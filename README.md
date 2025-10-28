# DiagnoChain

Monorepo for DiagnoChain:
- `frontend/` — React + Vite app
- `ai-api/` — Flask API for AI predictions
- `blockchain/` — Hardhat smart contracts

## Quick Start

### 1) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2) AI API
```bash
cd ai-api
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3) Blockchain (Hardhat)
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js
```
