# 🚀 FIDES IMMOBILIARE - Guida Rapida Sviluppo

**Progetto**: Piattaforma immobiliare con doppia sede (Paesana + Torino)  
**Stack**: Node.js + Express + React + TypeScript + SQLite

## 📁 Struttura Progetto
```
fides/
├── server/                 # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── routes/        # URL endpoints
│   │   ├── controllers/   # HTTP handlers
│   │   ├── services/      # Business logic
│   │   ├── dao/          # Database queries
│   │   ├── dto/          # Validazione input
│   │   ├── models/       # TypeScript types
│   │   ├── middleware/   # Auth, CORS, security
│   │   └── config/       # DB config
│   └── uploads/          # Immagini caricate
│
├── web/                   # Frontend React SPA
│   ├── src/
│   │   ├── pages/        # HomePage, PaesanaPage, TorinoPage, AdminPage
│   │   ├── components/   # Navbar, Footer, PropertiesGrid
│   │   ├── services/     # API calls al backend
│   │   └── assets/       # CSS, immagini statiche
│   └── public/           # Immagini pubbliche (zani1.jpeg, torino.jpg)
│
└── shared/               # Types condivisi tra client e server
```

## 🔄 Flow Veloce
**Request → Route → Controller → Service → DAO → Database**

```typescript
// 1. ROUTE (/routes/propertyRoutes.ts)
router.post('/properties', controller.create);

// 2. CONTROLLER (/controllers/PropertyController.ts)  
create = async (req, res) => {
  const data = CreatePropertyDTO.parse(req.body); // Valida
  const result = await this.service.create(data);  // Chiama service
  res.json(result);
}

// 3. SERVICE (/services/PropertyService.ts)
async create(data) {
  // Business logic qui
  return this.dao.create(data);
}

// 4. DAO (/dao/PropertyDAO.ts)
async create(data) {
  // SQL qui
  return await db.run('INSERT...');
}
```

## 📦 Descrizione Layer Backend

### 🛣️ **ROUTE** - "Chi gestisce questo URL?"
- **Fa**: Collega URL HTTP ai metodi del Controller
- **Esempio**: `POST /api/properties` → `controller.createProperty()`
- **File**: `/routes/propertyRoutes.ts`

### 🎮 **CONTROLLER** - "Gestisco HTTP e coordino"
- **Fa**: Riceve richiesta HTTP, valida input con DTO, chiama Service, restituisce risposta
- **NON fa**: Business logic o accesso database
- **Esempio**: Converte errori in status code HTTP
- **File**: `/controllers/PropertyController.ts`

### 🏭 **SERVICE** - "La logica di business"
- **Fa**: Contiene regole business, orchestrazione, calcoli
- **Esempio**: "Se prezzo > 1M€, aggiungi tassa lusso"
- **Chiama**: DAO per salvare/leggere database
- **File**: `/services/PropertyService.ts`

### 🗄️ **DAO** - "Parlo solo con il database"
- **Fa**: Query SQL (SELECT, INSERT, UPDATE, DELETE)
- **NON fa**: Business logic, calcoli, validazioni
- **Esempio**: `INSERT INTO properties VALUES (...)`
- **File**: `/dao/PropertyDAO.ts`

### 📋 **DTO** - "Validatore di input"
- **Fa**: Definisce struttura dati in/out, valida con Zod
- **Esempio**: "title deve essere stringa non vuota"
- **File**: `/dto/PropertyDTO.ts`

## 🎯 DTO = Validazione Input

```typescript
// /dto/PropertyDTO.ts
export const CreatePropertyDTO = z.object({
  title: z.string().min(1),
  price: z.number().positive(),
  type: z.enum(['sale', 'rent'])
});
```

## 🔧 Setup Veloce

### 1. Backend
```bash
cd server
npm install
npm run dev  # Server API su http://localhost:4000
```

### 2. Frontend  
```bash
cd web
npm install
npm run dev  # React app su http://localhost:5173
```

## 🌐 API Principali

### Properties (Immobili)
```typescript
// GET - Lista immobili per sede
GET /api/properties/branch/paesana
GET /api/properties/branch/torino

// GET - Dettaglio immobile
GET /api/properties/:id

// POST - Crea nuovo immobile (admin)
POST /api/properties
{
  title: "Villa in Valle Po",
  price: 350000,
  branch: "paesana",
  type: "sale",
  location: { city: "Paesana", province: "CN" },
  details: { rooms: 5, bathrooms: 2, sqm: 180 },
  images: ["url1.jpg", "url2.jpg"]
}

// Frontend chiama backend
const properties = await fetch('http://localhost:4000/api/properties/branch/paesana')
  .then(res => res.json());
```

## 🎨 Frontend - Pagine Principali

### HomePage.tsx
- Split-screen full-height con hover dinamico
- Sinistra: Paesana (zani1.jpeg) → naviga a /paesana
- Destra: Torino (torino.jpg) → naviga a /torino
- Logo centrale "FIDES IMMOBILIARE" con fade-out su hover

### PaesanaPage.tsx / TorinoPage.tsx
- Hero section con immagine di sfondo
- Griglia immobili filtrati per branch
- Card cliccabili → PropertyDetailPage

### AdminPage.tsx
- Form creazione/modifica immobili
- Upload immagini multiple
- Gestione completa CRUD

## 🎯 Come Aggiungere Feature

### Esempio: Aggiungere "Preferiti"

```typescript
// 1. DTO - Validazione (/dto/FavoriteDTO.ts)
export const AddFavoriteDTO = z.object({
  propertyId: z.string().uuid(),
  userId: z.string()
});

// 2. DAO - Database (/dao/FavoriteDAO.ts)
class FavoriteDAO {
  async addFavorite(userId: string, propertyId: string) {
    return db.run('INSERT INTO favorites (user_id, property_id) VALUES (?, ?)', 
      [userId, propertyId]);
  }
}

// 3. SERVICE - Business Logic (/services/FavoriteService.ts)
class FavoriteService {
  async addToFavorites(userId: string, propertyId: string) {
    // Verifica duplicati, limiti, etc.
    const exists = await this.dao.checkExists(userId, propertyId);
    if (exists) throw new Error('Already in favorites');
    return this.dao.addFavorite(userId, propertyId);
  }
}

// 4. CONTROLLER - HTTP (/controllers/FavoriteController.ts)
addFavorite = async (req, res) => {
  const data = AddFavoriteDTO.parse(req.body);
  const result = await this.service.addToFavorites(req.userId, data.propertyId);
  res.json(result);
}

// 5. ROUTE - Endpoint (/routes/favoriteRoutes.ts)
router.post('/favorites', auth, controller.addFavorite);
```

## 📋 Ordine di Sviluppo
1. **DTO** → Definisci struttura dati e validazione
2. **DAO** → Implementa query SQL  
3. **SERVICE** → Aggiungi business logic
4. **CONTROLLER** → Gestisci HTTP request/response
5. **ROUTE** → Esponi endpoint API
6. **Frontend** → Crea UI e chiamate API

## 🔥 Tips Sviluppo

- **Middleware**: Aggiungi in `/middleware/` per auth, validation, logging
- **Immagini**: Salva in `/uploads/` (backend) o `/public/` (frontend)
- **Branch Filter**: Usa `branch: 'paesana' | 'torino'` nelle query
- **TypeScript**: Condividi types in `/shared/types/`
- **Hot Reload**: Entrambi server/web hanno auto-reload

---

**Sviluppatori**: Roki Rrotani & Alessandro Olivero — 2025 
