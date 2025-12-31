# 🔐 DOCUMENTAZIONE SICUREZZA FIDES IMMOBILIARE

## ⚠️ CREDENZIALI ADMIN - STRETTAMENTE CONFIDENZIALI

### Accesso Area Admin

**URL:** http://localhost:5173/admin (dev) / https://fides-immobiliare.it/admin (prod)

**Username:** `fides_admin_2025`  
**Password:** `F!d3$_S3cur3_2025#Imm0b!l!@r3`

> 🚨 **IMPORTANTE**: Queste credenziali sono state hashate con bcrypt (10 rounds). Non condividere con nessuno al di fuori del personale autorizzato.

---

## 🛡️ MISURE DI SICUREZZA IMPLEMENTATE

### 1. Autenticazione Sicura
- ✅ **Bcrypt hashing** (10 rounds) per le password
- ✅ **Protezione timing attacks**: delay intenzionale su username errato
- ✅ **Rate limiting admin**: massimo 5 tentativi ogni 15 minuti per IP
- ✅ **Lockout automatico** dopo tentativi falliti
- ✅ **Logging** dei tentativi di accesso (con timestamp e IP)

### 2. Protezione Brute-Force
- ✅ Tracciamento tentativi falliti per IP
- ✅ Blocco temporaneo (15 minuti) dopo 5 tentativi
- ✅ Messaggio con countdown rimanente
- ✅ Reset automatico dopo periodo di lockout

### 3. Security Headers (Configurati)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### 4. Input Validation
- ✅ Validazione tipo dati (string check)
- ✅ Lunghezza massima (100 caratteri)
- ✅ Sanitizzazione input lato server
- ✅ Protezione SQL injection (SQLite parametrizzato)

### 5. Rate Limiting Globale
- ✅ API generale: 100 richieste/15min per IP
- ✅ API admin: 5 richieste/15min per IP
- ✅ Middleware rate limiter configurato

### 6. Vulnerabilità NPM
- ✅ Audit eseguito: **0 vulnerabilità**
- ✅ Tutte le dipendenze aggiornate
- ✅ `qs` v6.14.1 → v6.14.2 (fix DoS)

---

## 🔍 SECURITY AUDIT CHECKLIST

### Backend (✅ Completato)
- [x] Password hashate con bcrypt
- [x] Nessuna credenziale in chiaro nel codice
- [x] Rate limiting implementato
- [x] Input validation
- [x] Security headers configurati
- [x] Vulnerabilità npm risolte
- [x] Logging accessi admin
- [x] Protezione timing attacks

### Frontend (✅ Completato)
- [x] Token salvato in localStorage (con prefisso)
- [x] AutoComplete configurato correttamente
- [x] Input type="password" per password
- [x] Nessuna credenziale hardcoded
- [x] UI sicura e user-friendly
- [x] Messaggi errore generici (non rivelano info)

### Database (✅ Completato)
- [x] SQLite con prepared statements
- [x] Nessuna query concatenata
- [x] Validazione DTO con Zod
- [x] Sanitizzazione dati

---

## 🚀 SETUP PRODUZIONE

### 1. Environment Variables
Creare file `.env` in `/server`:

```bash
# Credenziali Admin (usare hash generato)
ADMIN_USERNAME=fides_admin_2025
ADMIN_PASSWORD_HASH=$2b$10$dFgjvdjIL33KW7wZpRVoXOGNlwVeFEgyln6L.4eiGmYSdolnw2DY6

# JWT Secret (generare con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=<generare_secret_sicuro>

# Database
DB_PATH=./data/fides.db

# Server
PORT=4000
NODE_ENV=production
```

### 2. HTTPS (Obbligatorio in Produzione)
```bash
# Usare Let's Encrypt
sudo certbot --nginx -d fides-immobiliare.it -d www.fides-immobiliare.it
```

### 3. Firewall Rules
```bash
# Permettere solo porte necessarie
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 4. Backup Automatici
```bash
# Cron job giornaliero
0 2 * * * /usr/local/bin/backup-fides.sh
```

---

## 📊 MONITORAGGIO

### Log Files
- `/var/log/fides/access.log` - Accessi API
- `/var/log/fides/auth.log` - Tentativi login admin
- `/var/log/fides/error.log` - Errori applicazione

### Metriche da Monitorare
- Tentativi di login falliti (alert se > 10/ora)
- Richieste API anomale (spike improvvisi)
- Errori 500 (indicano problemi server)
- Tempo risposta API (> 2s = problema)

---

## 🔄 ROTAZIONE CREDENZIALI

### Cambiare Password Admin (Ogni 90 giorni)

1. Generare nuova password forte:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

2. Generare hash bcrypt:
```bash
cd server/src/config
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('NUOVA_PASSWORD', 10).then(hash => console.log(hash));"
```

3. Aggiornare `security.ts`:
```typescript
const ADMIN_PASSWORD_HASH = '<nuovo_hash>';
```

4. Notificare titolare agenzia

---

## ⚠️ COSA FARE IN CASO DI BREACH

1. **IMMEDIATO**: Cambiare password admin
2. Analizzare log per identificare breach
3. Revocare tutti i token attivi
4. Verificare integrità database
5. Notificare utenti se dati sensibili compromessi
6. Documentare incidente per GDPR

---

## 📞 CONTATTI SICUREZZA

**Responsabile Tecnico:** [Inserire Nome]  
**Email:** security@fides-immobiliare.it  
**Telefono Emergenze:** [Inserire Numero]

---

**Ultimo Aggiornamento:** 31 Dicembre 2025  
**Versione:** 1.0  
**Autore:** Sistema di Sicurezza Fides
