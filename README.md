# 🏠 FIDES IMMOBILIARE - Developer Documentation

Piattaforma web professionale per agenzia immobiliare con due sedi in Piemonte (Paesana e Torino).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation
```bash
# Install dependencies
npm install
cd server && npm install
cd ../web && npm install

# Run development
npm run dev              # Concurrent server + frontend
# OR
cd server && npm run dev # Backend only (http://localhost:3001)
cd web && npm run dev    # Frontend only (http://localhost:5173)
```

### Build for Production
```bash
npm run build           # Build both server and web
cd server && npm test   # Run server tests with coverage
```

---

## 📁 Project Structure

```
fides/
├── server/                      # Backend API (Express + TypeScript)
│   ├── src/
│   │   ├── __tests__/          # Jest tests
│   │   ├── config/
│   │   │   ├── database.ts     # SQLite configuration
│   │   │   └── security.ts     # Bcrypt, auth logic
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   ├── PropertyController.ts
│   │   │   └── RequestController.ts
│   │   ├── dao/
│   │   │   ├── PropertyDAO.ts
│   │   │   └── RequestDAO.ts
│   │   ├── dto/                # Zod validation schemas
│   │   │   ├── PropertyDTO.ts
│   │   │   └── RequestDTO.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── corsConfig.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   ├── sanitize.ts
│   │   │   └── validateRequest.ts
│   │   ├── models/             # TypeScript interfaces
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   ├── database/
│   │   └── database.sqlite     # SQLite DB
│   ├── uploads/                # File uploads
│   ├── jest.config.js
│   └── package.json
│
├── web/                         # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── __tests__/          # React Testing Library tests
│   │   ├── components/
│   │   │   ├── Navbar.tsx      # Mobile-optimized navigation
│   │   │   ├── Footer.tsx      # Iubenda integration
│   │   │   ├── PropertiesGrid.tsx  # Carousel on mobile
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Properties.tsx
│   │   │   ├── Admin/
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.ts          # Axios API client
│   │   ├── types/
│   │   └── main.tsx
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
│
└── shared/                      # Shared TypeScript types
    └── types/
```

---

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** SQLite
- **Validation:** Zod
- **Authentication:** Bcrypt + custom JWT-like auth
- **Security:** Helmet, CORS, rate limiting, input sanitization
- **Testing:** Jest
- **Architecture:** DAO + Service + Controller pattern

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Inline CSS-in-JS
- **Privacy:** Iubenda integration
- **Mobile:** Responsive design (breakpoints: 1100px, 768px, 480px)

---

## 🔐 Admin Access

**URL:** `http://localhost:5173/admin`

**Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **CHANGE THESE IN PRODUCTION!**

---

## 🧪 Testing

### Server Tests
```bash
cd server
npm test                 # Run all tests
npm test -- --coverage   # With coverage report
npm test -- --watch      # Watch mode
```

**Test Coverage Goals:**
- ✅ Controllers: 100%
- ✅ Services: 100%
- ✅ Security: 100%

**Current Test Files:**
- `AuthController.test.ts` - Login, logout, token verification
- `PropertyService.test.ts` - Property search and filters
- `RequestService.test.ts` - Buy/sell request handling
- `security.test.ts` - Password hashing, credential verification

### Frontend Tests
```bash
cd web
npm test                 # Run all tests
npm test -- --coverage   # With coverage
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login          # Admin login
POST   /api/auth/logout         # Logout
GET    /api/auth/verify         # Verify token
```

### Properties
```
GET    /api/properties          # Get all properties
GET    /api/properties/:id      # Get property by ID
POST   /api/properties          # Create property (admin only)
PUT    /api/properties/:id      # Update property (admin only)
DELETE /api/properties/:id      # Delete property (admin only)
```

### Requests
```
GET    /api/requests/buy        # Get all buy requests
GET    /api/requests/sell       # Get all sell requests
POST   /api/requests/buy        # Create buy request
POST   /api/requests/sell       # Create sell request
PUT    /api/requests/:id        # Update request status (admin only)
DELETE /api/requests/:id        # Delete request (admin only)
```

---

## 🎨 Frontend Features

### Responsive Design
- **Desktop:** Full navigation bar, grid layout
- **Tablet (≤1100px):** Condensed layout
- **Mobile (≤768px):** Hamburger menu, carousel for properties
- **Small Mobile (≤480px):** Single column layout

### Key Components

**Navbar.tsx**
- Desktop/mobile adaptive menu
- Hamburger menu with slide-in animation
- Auto scroll-to-top on navigation
- Fixed positioning with high z-index (2500)

**PropertiesGrid.tsx**
- Grid layout on desktop
- Horizontal scroll carousel on mobile (≤900px)
- Scroll-snap behavior
- Left/right navigation buttons

**Footer.tsx**
- Contact information for both offices
- Iubenda privacy/cookie policy integration
- Social links placeholder

### Mobile Optimizations
- Touch-friendly tap targets (min 44x44px)
- Reduced motion for accessibility
- Optimized images
- CSS containment removed to prevent clipping

---

## 🔒 Security Features

### Backend Security
1. **Input Sanitization** - Remove XSS attempts (`<script>`, `<img>`, etc.)
2. **Rate Limiting** - Prevent brute-force attacks
3. **CORS Configuration** - Whitelist allowed origins
4. **Security Headers** - Helmet.js implementation
5. **Password Hashing** - Bcrypt with salt rounds
6. **SQL Injection Prevention** - Parameterized queries

### Authentication Flow
1. User submits credentials
2. Server validates with bcrypt
3. Rate limiter tracks failed attempts (max 3)
4. Token generated on success
5. Middleware validates token on protected routes

---

## 🌐 Environment Variables

### Server (`.env`)
```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./database/database.sqlite
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-secret-key
UPLOAD_DIR=./uploads
```

### Web (`.env`)
```env
VITE_API_URL=http://localhost:3001/api
VITE_IUBENDA_SITE_ID=your-iubenda-id
```

---

## 🐛 Debugging

### Enable Verbose Logging
```bash
# Server logs
cd server && npm run dev

# Check console for:
# - ✅ Success logs (green)
# - ⚠️ Warning logs (yellow)
# - ❌ Error logs (red)
```

### Common Issues

**Tests Failing?**
- Check TypeScript compilation: `npx tsc --noEmit`
- Verify imports match actual exports
- Ensure mock structure matches real implementation

**Mobile Menu Not Showing?**
- Verify z-index hierarchy
- Check if element is outside parent with `contain: paint`
- Inspect with Chrome DevTools mobile emulator

**CORS Errors?**
- Check `corsConfig.ts` whitelist
- Verify frontend URL in CORS origins
- Check browser console for specific error

---

## 📦 Deployment

### Build
```bash
# Build both server and frontend
npm run build

# Or individually:
cd server && npm run build
cd web && npm run build
```

### Production Checklist
- [ ] Change admin credentials
- [ ] Set production environment variables
- [ ] Configure real Iubenda site ID
- [ ] Update CORS whitelist with production URL
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up SSL certificate
- [ ] Configure logging service
- [ ] Set up monitoring (uptime, errors)

### Hosting Recommendations
- **Backend:** Heroku, DigitalOcean, AWS EC2, Railway
- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Database:** PostgreSQL on Heroku/Railway (migrate from SQLite)
- **Files:** AWS S3, Cloudinary (for property images)

---

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features
- Document complex logic with comments

### Git Workflow
```bash
# Feature branch
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/your-feature
# Create pull request
```

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

---

## 📞 Contact

**Fides Immobiliare**
- Email: info@fidesimmobiliare.it
- Phone: +39 011 428 2544

**Locations:**
- 🏔️ Paesana (CN) - Via Po, 1, 12034
- 🏙️ Torino (TO) - Via Paolo Sacchi, 32, 10128

---

## 📄 License

© 2025 Fides Immobiliare. All rights reserved.

---

**Last Updated:** January 2026
- ✅ Pubblicare nuovi immobili
- ✅ Modificare immobili esistenti
- ✅ Marcare immobili come "Venduti"
- ✅ Gestire richieste clienti
- ✅ Upload foto multiple

**Guida Completa:** Vedi [GUIDA_UTENTE.md](GUIDA_UTENTE.md)

---

## 🔒 Privacy e Cookie

Il sito è conforme al GDPR tramite **iubenda**:
- 🍪 **Cookie Policy** - Gestione consensi
- 🔒 **Privacy Policy** - Protezione dati clienti
- ⚙️ **Preferenze Cookie** - Link nel footer

**Setup:** Vedi [SETUP_IUBENDA.md](SETUP_IUBENDA.md)

---

## 📱 Compatibilità

✅ **Desktop** - Windows, Mac, Linux
✅ **Tablet** - iPad, Android tablet
✅ **Mobile** - iPhone, Android (ottimizzato)
✅ **Browser** - Chrome, Firefox, Safari, Edge

---

## 🚀 Avvio del Sito

### Utenti Non Tecnici

**Metodo Semplice:**
1. Chiedi al tuo sviluppatore di avviare il server
2. Apri il browser
3. Vai su `http://localhost:5173`

### Sviluppatori

Vedi [DEVELOPER.md](DEVELOPER.md) per istruzioni tecniche complete.

---

## 📞 Supporto

**Problemi Tecnici:**
- Email: [email supporto tecnico]
- Tel: [numero supporto]

**Richieste Commerciali:**
- Email: info@fidesimmobiliare.it
- Tel: +39 011 428 2544

---

## 📚 Documentazione Aggiuntiva

- **Per Utenti:** [GUIDA_UTENTE.md](GUIDA_UTENTE.md) - Guida completa pannello admin
- **Per Sviluppatori:** [DEVELOPER.md](DEVELOPER.md) - Documentazione tecnica completa
- **Sicurezza:** [SECURITY.md](SECURITY.md) - Informazioni sicurezza e password
- **Privacy:** [SETUP_IUBENDA.md](SETUP_IUBENDA.md) - Configurazione GDPR/Cookie

---

**© 2025 Fides Immobiliare - Tutti i diritti riservati**

📍 Paesana (CN) | Torino (TO)
🌐 [Sito Web] | 📧 info@fidesimmobiliare.it | ☎️ +39 011 428 2544


