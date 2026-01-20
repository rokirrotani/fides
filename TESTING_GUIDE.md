# 🧪 Testing Suite Completo - Fides Immobiliare

## 📊 Panoramica

Test completi per backend e frontend con **Jest** + **React Testing Library**.

---

## 🎯 Copertura Test

### Backend (Server)
- ✅ **AuthController** - Login, blocco dopo 3 tentativi, logout
- ✅ **Security Module** - Verifica credenziali hardcodate
- ✅ **PropertyService** - Ricerca e filtri immobili
- ✅ **RequestService** - Gestione richieste contatti

### Frontend (Web)
- ✅ **AdminPage** - Login UI, gestione token, logout
- ✅ **Navbar** - Rendering e navigazione
- ✅ **Footer** - Informazioni e contatti
- ✅ **API Service** - Chiamate HTTP

---

## 🚀 Comandi per Eseguire i Test

### Backend
```bash
cd server
npm install
npm test
```

### Frontend
```bash
cd web
npm install
npm test
```

### Modalità Watch (test continui)
```bash
# Backend
cd server
npm run test:watch

# Frontend
cd web
npm run test:watch
```

---

## 📈 Coverage Report

I test generano automaticamente un report di copertura in `coverage/`:
- **Text** - Nel terminale
- **HTML** - In `coverage/lcov-report/index.html` (aprilo nel browser!)

---

## 🎨 Output Atteso

Vedrai output colorati con emoji per ogni test:
- ✅ Test passati
- ❌ Test falliti
- 🔍 Test di ricerca
- 🔒 Test di sicurezza
- 💰 Test filtri prezzo
- E molto altro!

---

## 🔐 Credenziali Login

**Username:** `fidesimmobiliare2026`  
**Password:** `f1d3s1mm0b1l1@r3`

Dopo 3 tentativi falliti → **Blocco 5 minuti** ⏰

---

## 💡 Tips

- Usa `npm test` per run completo
- Usa `npm run test:watch` durante sviluppo
- Controlla `coverage/lcov-report/index.html` per statistiche dettagliate
- I test usano mock per non toccare il DB reale

---

## 📦 Dipendenze Installate

### Backend
- jest
- ts-jest
- @types/jest
- supertest
- @types/supertest

### Frontend
- jest
- ts-jest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- jest-environment-jsdom
- identity-obj-proxy

---

**Enjoy Testing! 🎉**
