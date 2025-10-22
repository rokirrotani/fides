# 🚀 FIDES - Guida Rapida Sviluppo
## 📁 Struttura Progetto
```
fides/
├── server/     # Backend API
└── web/        # Frontend React
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
npm run dev  # Server su :4000
```

### 2. Frontend  
```bash
cd web
npm install
npm run dev  # React su :5173
```

## 🌐 API Call (Frontend)
```typescript
// Frontend chiama backend
const properties = await fetch('http://localhost:4000/api/properties')
  .then(res => res.json());
```

## 📋 Ordine di Sviluppo
1. **DTO** → Definisci struttura dati
2. **DAO** → Implementa accesso database  
3. **SERVICE** → Aggiungi business logic
4. **CONTROLLER** → Gestisci HTTP
5. **ROUTE** → Esponi endpoint