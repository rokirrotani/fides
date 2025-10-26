import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tuosito.com'] // Cambia con il tuo dominio in produzione
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 ore
};