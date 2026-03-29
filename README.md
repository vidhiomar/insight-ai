<!-- ================= HEADER ================= -->

<h1 align="center">
  InsightAI ⚡</h1>

<p align="center">
  <i>From raw text → to intelligent insights!</i>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=00F7FF&center=true&vCenter=true&width=500&lines=AI+Powered+Summarization;FastAPI+%2B+React+Architecture;Transformer+Models+Integration;Built+for+Real+World+Use" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-black?style=for-the-badge&logo=fastapi&logoColor=00F7FF"/>
  <img src="https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Transformers-black?style=for-the-badge&logo=huggingface&logoColor=FFD21F"/>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,100:2c5364&height=140&section=header"/>
</p>

---

<!-- ================= FEATURES ================= -->

## ✦ Features

<div align="center">

| Feature              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| Smart Summarization  | Converts long text into concise insights                   |
| Length Control       | Short / Medium / Long / Bullet / Key insight modes         |
| Fast API             | FastAPI backend with a shared inference interface          |
| Model Comparison     | BART vs Mistral vs T5 vs Pegasus                           |
| Clean UI             | Responsive frontend for summarization and model comparison |
| Export Tools         | Copy / Download summaries                                  |

</div>

---

<!-- ================= ARCHITECTURE ================= -->

## 🏗️ Architecture

```mermaid
flowchart LR
    A[User Input] --> B[React Frontend]
    B --> C[FastAPI Backend]
    C --> D[Shared Summarization Service]
    D --> E[Local BART via Transformers]
    D --> F[HF Router Models]
    E --> C
    F --> C
    C --> B
```

---

<!-- ================= WORKFLOW ================= -->

## ⚙️ How It Works

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant M as Model

    U->>F: Enter text
    F->>B: API request
    B->>M: Process text
    M-->>B: Generate summary
    B-->>F: Return result
    F-->>U: Display summary
```

---

<!-- ================= MODELS ================= -->

## 🤖 AI Models

| UI Label | Model ID                          | Call Type |
| -------- | --------------------------------- | --------- |
| BART     | `facebook/bart-large-cnn`         | Runs locally using HuggingFace `transformers` |
| Mistral  | `meta-llama/Llama-3.3-70B-Instruct` | Hugging Face router chat-completions |
| T5       | `sshleifer/distilbart-cnn-12-6`   | Hugging Face router text2text-generation slot |
| Pegasus  | `google/pegasus-cnn_dailymail`    | Hugging Face router summarization |

Notes:
- BART runs locally.
- On first run, if BART is not already present in the local HuggingFace cache, the backend downloads it automatically.
- Mistral, T5, and Pegasus are remote calls and require a user-provided Hugging Face token.
- UI labels stay fixed as `BART`, `Mistral`, `T5`, and `Pegasus` even though the underlying router-backed models are selected for live compatibility.

---

<!-- ================= TECH STACK ================= -->

## 🧩 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,fastapi,python,tailwind,git" />
</p>

- Frontend: React + Vite
- Backend: FastAPI
- Local model runtime: HuggingFace `transformers` + PyTorch for BART
- Remote model runtime: Hugging Face router via `httpx`
- Configuration: shared model registry in `Frontend/src/config/models.json`

---

<!-- ================= API ================= -->

## 🔗 API Endpoints

### ✧ Summarize

```http
POST /api/summarize
```

```json
{
  "text": "Your text...",
  "summary_type": "short",
  "model": "facebook/bart-large-cnn"
}
```

Supported `model` values:
- `facebook/bart-large-cnn`
- `meta-llama/Llama-3.3-70B-Instruct`
- `sshleifer/distilbart-cnn-12-6`
- `google/pegasus-cnn_dailymail`

---

### ✧ Compare Models

```http
POST /api/compare
```

```json
{
  "text": "Your text...",
  "summary_type": "short"
}
```

---

<!-- ================= INSTALL ================= -->

## 🚀 Installation

### Environment Variables

Create `Backend/.env` with:

```env
HUGGINGFACE_API_KEY=your_token_here
```

Notes:
- `HUGGINGFACE_API_KEY` is required for Mistral, T5, and Pegasus.
- BART does not require the API key.
- The backend also accepts `HUGGINGFACE_API_TOKEN`, `HF_TOKEN`, and `HUGGINGFACEHUB_API_TOKEN`.

---

### Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

First-time setup notes:
- On first BART request, HuggingFace may download `facebook/bart-large-cnn` into the local cache if it is not already present.
- Keep your internet connection available for the first BART download and for all remote model calls.

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

### Run Locally

1. Start the backend from `Backend/`.
2. Start the frontend from `Frontend/`.
3. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.
4. Use the dashboard or compare page to generate summaries.

The frontend proxies `/api/*` requests to the FastAPI backend during local development.

---

<!-- ================= FUTURE ================= -->

## 🌌 Roadmap

* Real-time analytics dashboard
* Multi-language summarization
* Cloud deployment
* Authentication system

---

<!-- ================= AUTHOR ================= -->

## 🧑‍💻 Author

**Vidhi**
AI/ML Developer

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,100:0f2027&height=140&section=footer"/>
</p>