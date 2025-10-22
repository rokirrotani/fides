# 🏠 FIDES — Agenzia Immobiliare

Progetto full-stack per la gestione e visualizzazione di immobili in vendita o in affitto.  
**Architettura**: REST API con layered architecture + React SPA.

---

## 🚀 Stack Tecnologico

### Backend (server/)
- **Node.js + Express** → REST API server
- **TypeScript** → type safety completa
- **SQLite** → database embedded
- **Zod** → validazione robusta input/output
- **Architettura Layered** → Route → Controller → Service → DAO

### Frontend (web/)
- **React 18 + Vite** → SPA moderna e veloce
- **TypeScript** → type safety end-to-end
- **React Router** → navigazione client-side
- **Fetch API** → comunicazione con backend

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

## 📱 Features Principali

### ✅ Implementate
- [x] CRUD completo immobili
- [x] Validazione robusta input (Zod)
- [x] Upload immagini
- [x] Ricerca e filtri
- [x] Database SQLite
- [x] API REST complete

### 🚧 In Sviluppo
- [ ] Autenticazione utenti
- [ ] Sistema preferiti
- [ ] Dashboard admin
- [ ] Notifiche email
- [ ] Integrazione mappe

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


