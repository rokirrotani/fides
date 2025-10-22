fides/
├── server/                 # Backend
│   ├── src/
│   │   ├── config/        # Configurazioni
│   │   ├── controllers/   # Logic controller
│   │   ├── dao/          # Data Access Objects
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── models/       # Modelli database
│   │   ├── routes/       # Route API
│   │   ├── middleware/   # Middleware custom
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utilities
│   │   └── database/     # Setup DB
│   ├── dist/             # Build output
│   └── uploads/          # File upload
│
├── web/                  # Frontend React
│   ├── src/
│   │   ├── components/   # Componenti React
│   │   ├── pages/        # Pagine
│   │   ├── services/     # API calls
│   │   ├── types/        # TypeScript types
│   │   ├── utils/        # Utilities
│   │   └── assets/       # Immagini, CSS
│   └── public/
│
└── shared/               # Tipi condivisi
    └── types/