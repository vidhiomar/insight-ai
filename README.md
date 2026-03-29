<!-- ================= HEADER ================= -->

<h1 align="center">
 𝙸𝚗𝚜𝚒𝚐𝚑𝚝𝙰𝙸 ⚡</h1>

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

## ✦ 𝙁𝙚𝙖𝙩𝙪𝙧𝙚𝙨

<div align="center">

| 🚀 Feature             | 💡 Description                           |
| ---------------------- | ---------------------------------------- |
| 🧠 Smart Summarization | Converts long text into concise insights |
| 🎚️ Length Control     | Short / Medium / Long summaries          |
| ⚡ Fast API             | Optimized FastAPI backend                |
| 🔄 Model Comparison    | BART vs T5 vs Pegasus                    |
| 🎨 Clean UI            | Responsive modern interface              |
| 📋 Export Tools        | Copy / Download summaries                |

</div>

---

<!-- ================= ARCHITECTURE ================= -->

## 🏗️ 𝘼𝙧𝙘𝙝𝙞𝙩𝙚𝙘𝙩𝙪𝙧𝙚

```mermaid
flowchart LR
    A[User Input] --> B[React Frontend]
    B --> C[FastAPI Backend]
    C --> D[Service Layer]
    D --> E[Transformer Models]
    E --> C
    C --> B
```

---

<!-- ================= WORKFLOW ================= -->

## ⚙️ 𝙃𝙤𝙬 𝙄𝙩 𝙒𝙤𝙧𝙠𝙨

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

## 🤖 𝘼𝙄 𝙈𝙤𝙙𝙚𝙡𝙨

| Model      | Strength                   |
| ---------- | -------------------------- |
| 🧠 BART    | High-quality summarization |
| ⚡ T5       | Fast & flexible            |
| 📰 Pegasus | News-style summaries       |

---

<!-- ================= TECH STACK ================= -->

## 🧩 𝙏𝙚𝙘𝙝 𝙎𝙩𝙖𝙘𝙠

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,fastapi,python,tailwind,git" />
</p>

---

<!-- ================= API ================= -->

## 🔗 𝘼𝙋𝙄 𝙀𝙣𝙙𝙥𝙤𝙞𝙣𝙩𝙨

### ✧ Summarize

```http
POST /api/summarize
```

```json
{
  "text": "Your text...",
  "type": "short"
}
```

---

### ✧ Compare Models

```http
POST /api/compare
```

---

<!-- ================= INSTALL ================= -->

## 🚀 𝙄𝙣𝙨𝙩𝙖𝙡𝙡𝙖𝙩𝙞𝙤𝙣

### Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---


---

<!-- ================= FUTURE ================= -->

## 🌌 𝙍𝙤𝙖𝙙𝙢𝙖𝙥

* 📊 Real-time analytics dashboard
* 🌍 Multi-language summarization
* ☁️ Cloud deployment
* 🔐 Authentication system

---

<!-- ================= AUTHOR ================= -->

## 🧑‍💻 𝘼𝙪𝙩𝙝𝙤𝙧

**Vidhi** ✨
🚀 AI/ML Developer | Building real-world intelligent systems

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,100:0f2027&height=140&section=footer"/>
</p>

<p align="center">
  ⭐ <b>Star this repo to support the project</b> ⭐
</p>
