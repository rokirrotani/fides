# 🏠 FIDES — Agenzia Immobiliare

Progetto full-stack per la gestione e visualizzazione di immobili in vendita o in affitto.  
Stack: **Node.js + Express + TypeScript (backend)** e **React + Vite + TypeScript (frontend)**.

---

## 🚀 Tecnologie usate

### Backend (server/)
- **Node.js + Express** → server REST API
- **TypeScript** → tipizzazione sicura
- **Zod** → validazione input
- **Cors / Morgan / Dotenv** → middleware essenziali
- Struttura a **moduli**: `models.ts`, `routes.ts`, `middleware.ts`

### Frontend (web/)
- **React 18 + Vite** → app veloce e modulare
- **TypeScript** → tipi per componenti e API
- **Fetch API** → comunicazione con backend
- Possibilità di integrare **React Router** per le pagine

---

## 📂 Struttura del progetto

```
fides/
│
├── server/         # Backend Node.js + Express
│   ├── src/
│   │   ├── index.ts
│   │   ├── models.ts
│   │   ├── routes.ts
│   │   └── middleware.ts
│   ├── package.json
│   └── tsconfig.json
│
├── web/            # Frontend React + Vite
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── components/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## ⚡ Come avviare il progetto

### 1. Backend

```bash
cd server
npm install
npm run dev
```
Il server sarà attivo su [http://localhost:4000](http://localhost:4000).

### 2. Frontend

```bash
cd web
npm install
npm run dev
```
L'app React sarà attiva su [http://localhost:5173](http://localhost:5173) (porta di default Vite).

---

## 🔗 API principali

- `GET /api/health` — Stato del server
- `GET /api/properties` — Lista immobili
- `POST /api/properties` — Aggiungi immobile
- `PUT /api/properties/:id` — Modifica immobile
- `DELETE /api/properties/:id` — Elimina immobile

---

## 📝 Note

- Configura le variabili d'ambiente in `.env` nella cartella `server/` se necessario.
- Puoi personalizzare le rotte e i modelli secondo le esigenze dell'agenzia.
- Per suggerimenti o problemi, apri una issue su GitHub.

---

## 👨‍💻 Autore

Roki Rrotani & Alessandro Olivero — 2025


