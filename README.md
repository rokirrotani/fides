# 🏠 FIDES IMMOBILIARE

Piattaforma immobiliare full-stack per **Fides Immobiliare** con doppia sede: **Paesana (Valle Po)** e **Torino**.  
Gestione completa di immobili in vendita/affitto con interfaccia moderna e amministrazione centralizzata.

**Architettura**: REST API layered + React SPA con design split-screen dinamico.

---

## 🌟 Features Principali

### 🎨 Frontend
- ✨ **Split-Screen Homepage** - Interfaccia dinamica con immagini full-screen per Paesana e Torino
- 🎯 **Animazioni Fluide** - Hover effects e transizioni morbide
- 📱 **Design Responsive** - Ottimizzato per desktop, tablet e mobile
- 🗺️ **Multi-Sede** - Pagine dedicate per ogni branch (Paesana/Torino)
- 🖼️ **Gallerie Immobili** - Visualizzazione proprietà con immagini e dettagli
- 🔍 **Ricerca Avanzata** - Filtri per località, prezzo, tipologia

### 🔧 Backend
- 🔐 **API REST Sicure** - Autenticazione e validazione robusta
- 📊 **Dashboard Admin** - Gestione immobili, upload immagini
- 🗄️ **Database SQLite** - Leggero e performante
- 📤 **Upload Immagini** - Sistema di gestione file
- ✅ **Validazione Zod** - Input/output type-safe

---

## 🚀 Stack Tecnologico

### Backend (server/)
- **Node.js + Express** → REST API server
- **TypeScript** → type safety completa
- **SQLite** → database embedded
- **Zod** → validazione robusta input/output
- **Architettura Layered** → Route → Controller → Service → DAO
- **Middleware Stack** → CORS, security headers, rate limiting, error handling

### Frontend (web/)
- **React 18 + Vite** → SPA ultra-veloce con HMR
- **TypeScript** → type safety end-to-end
- **React Router** → navigazione client-side
- **CSS Modules** → styling modulare
- **Fetch API** → comunicazione REST con backend

---

## 📂 Struttura Progetto

```
fides/
├── server/                    # 🔧 Backend API
│   ├── src/
│   │   ├── config/           # Database & configurazioni
│   │   ├── controllers/      # HTTP request/response logic
│   │   ├── dao/             # Data Access Objects (SQL)
│   │   ├── dto/             # Data Transfer Objects (validazione)
│   │   ├── models/          # TypeScript interfaces
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utilities & helpers
│   ├── dist/               # Build output
│   ├── uploads/            # File upload storage
│   └── database.sqlite     # SQLite database
│
├── web/                     # 🌐 Frontend React
│   ├── src/
│   │   ├── components/     # Componenti React riutilizzabili
│   │   ├── pages/         # Pagine complete dell'app
│   │   ├── services/      # API calls al backend
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utilities frontend
│   │   └── assets/        # CSS, immagini, static files
│   └── dist/              # Build produzione
│
├── shared/                  # 📋 Tipi condivisi
│   └── types/              # Interfaces comuni client/server
│
└── docs/                   # 📚 Documentazione
```

---

## ⚡ Quick Start

### 1. Clona e Setup
```bash
git clone <repo-url>
cd fides
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
✅ Server attivo su **http://localhost:4000**

### 3. Frontend Setup
```bash
cd ../web
npm install  
npm run dev
```
✅ React app attiva su **http://localhost:5173**

---

## 🔗 API Endpoints

### Properties (Immobili)
- `GET    /api/properties` → Lista tutti gli immobili
- `GET    /api/properties/:id` → Dettaglio immobile
- `GET    /api/properties/search?filters` → Ricerca avanzata
- `POST   /api/properties` → Crea nuovo immobile
- `PUT    /api/properties/:id` → Aggiorna immobile
- `DELETE /api/properties/:id` → Elimina immobile

### System
- `GET /api/health` → Health check server
- `POST /api/upload` → Upload immagini

---

## 🏗️ Architettura Backend

**Flow**: `Request → Route → Controller → Service → DAO → Database`

```typescript
// Esempio: Creare immobile
POST /api/properties
│
├── Route (/routes/propertyRoutes.ts)
│   └── router.post('/properties', controller.create)
│
├── Controller (/controllers/PropertyController.ts)  
│   └── Valida input + chiama Service
│
├── Service (/services/PropertyService.ts)
│   └── Business logic + chiama DAO
│
└── DAO (/dao/PropertyDAO.ts)
    └── SQL INSERT nel database
```

### Layer Responsabilità
- **Route** → Mapping URL → Controller
- **Controller** → HTTP handling, validazione DTO
- **Service** → Business logic, orchestrazione
- **DAO** → Database queries (SQL)
- **DTO** → Input/output validation (Zod)

---

## 🎯 Esempi Sviluppo

### Aggiungere nuova feature "Preferiti"

```typescript
// 1. DTO - Validazione
export const AddFavoriteDTO = z.object({
  propertyId: z.string().uuid()
});

// 2. DAO - Database
class FavoriteDAO {
  async addFavorite(userId: string, propertyId: string) {
    return this.db.run('INSERT INTO favorites...');
  }
}

// 3. Service - Business Logic  
class FavoriteService {
  async addToFavorites(userId: string, propertyId: string) {
    // Controlla duplicati, limiti, etc.
    return this.dao.addFavorite(userId, propertyId);
  }
}

// 4. Controller - HTTP
addFavorite = async (req, res) => {
  const data = AddFavoriteDTO.parse(req.body);
  const result = await this.service.addToFavorites(userId, data.propertyId);
  res.json(result);
}

// 5. Route - Endpoint
router.post('/favorites', controller.addFavorite);
```

---

## 🗃️ Database Schema

```sql
-- Properties Table
CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  type TEXT CHECK(type IN ('sale', 'rent')),
  category TEXT CHECK(category IN ('apartment', 'house', 'commercial')),
  address TEXT,
  city TEXT,
  province TEXT,
  rooms INTEGER,
  bathrooms INTEGER,
  sqm REAL,
  floor INTEGER,
  images TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Scripts Disponibili

### Backend
```bash
npm run dev      # Sviluppo con hot-reload
npm run build    # Build TypeScript
npm run start    # Avvio produzione
```

### Frontend  
```bash
npm run dev      # Sviluppo con Vite
npm run build    # Build produzione
npm run preview  # Preview build locale
```

---

## 📱 Pagine Implementate

### 🏠 Homepage
- Split-screen dinamico con immagini full-screen
- Sezione Paesana (sinistra) con zani1.jpeg
- Sezione Torino (destra) con torino.jpg
- Effetti hover interattivi con espansione
- Logo centrale "FIDES IMMOBILIARE"
- Sezione "Chi Siamo" informativa

### 📍 Pagine Sedi
- **Paesana** - Immobili Valle Po e dintorni
- **Torino** - Immobili centro città e provincia
- Griglia proprietà con dettagli e immagini
- Click-through verso dettaglio immobile

### 📄 Pagine Istituzionali
- **Chi Siamo** - Storia e valori aziendali
- **Contatti** - Form contatti e informazioni

### 🔧 Area Admin
- Dashboard gestione immobili
- Upload e gestione immagini
- CRUD completo proprietà

### ✅ Features Tecniche
- [x] CRUD completo immobili
- [x] Validazione robusta input (Zod)
- [x] Upload immagini multiple
- [x] Ricerca e filtri per branch
- [x] Database SQLite ottimizzato
- [x] API REST complete
- [x] Middleware security stack
- [x] Rate limiting
- [x] Error handling centralizzato
- [x] Request logging

### 🚧 Roadmap Futura
- [ ] Autenticazione JWT
- [ ] Sistema preferiti utenti
- [ ] Notifiche email automatiche
- [ ] Integrazione Google Maps
- [ ] Export PDF schede immobili
- [ ] Analytics dashboard

---

## 🔧 Configurazione

### Environment Variables (.env)
```bash
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_PATH=./database.sqlite

# Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880  # 5MB
```

---

## 📚 Documentazione

- [Guida Sviluppo Rapido](./olllooooread.md)
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Frontend Components](./docs/components.md)

---

## 👥 Team

**Roki Rrotani** & **Alessandro Olivero** — 2025

---

## 📄 License

MIT License - Libero per uso commerciale e personale.


