# 🍪 GUIDA CONFIGURAZIONE IUBENDA - FIDES IMMOBILIARE

## 📋 Cosa è stato Integrato

Iubenda è ora integrato nel sito Fides per gestire:
- ✅ **Cookie Banner** (consenso GDPR/ePrivacy)
- ✅ **Privacy Policy** (conforme GDPR)
- ✅ **Cookie Policy** (elenco cookie utilizzati)
- ✅ **Gestione Preferenze** (utenti possono modificare consenso)

---

## 🚀 SETUP IUBENDA (Passo per Passo)

### 1. Crea Account Iubenda

1. Vai su **https://www.iubenda.com/it**
2. Clicca "**Inizia Ora**" (gratuito per 14 giorni, poi da 27€/anno)
3. Registrati con email aziendale

### 2. Crea Privacy Policy

1. Nel dashboard iubenda, clicca "**Crea Privacy Policy**"
2. Compila i dati:
   - **Nome sito**: Fides Immobiliare
   - **URL sito**: https://fides-immobiliare.it
   - **Tipo attività**: Agenzia Immobiliare
   - **Paese**: Italia
   - **Email contatto**: info@fidesimmobiliare.it

3. Aggiungi servizi utilizzati dal sito:
   - ☑️ Google Analytics (se usi analytics)
   - ☑️ Google Maps (per mappe uffici)
   - ☑️ Google Fonts
   - ☑️ Form di contatto
   - ☑️ Cookie tecnici

4. **Salva e genera** la Privacy Policy

### 3. Crea Cookie Policy

1. Nel dashboard, vai a "**Cookie Solution**"
2. Clicca "**Scansiona Sito**" (iubenda troverà automaticamente i cookie)
3. Categorizza i cookie:
   - **Necessari**: cookie di sessione, CSRF token
   - **Funzionali**: preferenze utente
   - **Analitici**: Google Analytics (se presente)
   - **Marketing**: nessuno (per ora)

4. **Genera Cookie Policy**

### 4. Ottieni Codici ID

Dopo aver creato le policy, troverai:

**Nel dashboard iubenda → Codici**

```
Site ID: XXXXXXXX
Cookie Policy ID: XXXXXXXX
```

Copia questi numeri!

### 5. Aggiorna il Codice del Sito

Apri il file: **`web/index.html`**

Trova queste righe (circa linea 12-13):

```html
"cookiePolicyId": 12345678, // SOSTITUIRE
"siteId": 12345678, // SOSTITUIRE
```

**Sostituisci `12345678` con i tuoi ID reali**:

```html
"cookiePolicyId": 87654321, // IL TUO ID
"siteId": 98765432, // IL TUO ID
```

### 6. Aggiorna Link Privacy/Cookie Policy

Nel file **`web/src/components/Footer.tsx`** (circa linea 15-30):

Trova:
```tsx
href="https://www.iubenda.com/privacy-policy/12345678"
```

Sostituisci `12345678` con il tuo **Cookie Policy ID** in entrambi i link:
- Privacy Policy: `https://www.iubenda.com/privacy-policy/TUOID`
- Cookie Policy: `https://www.iubenda.com/privacy-policy/TUOID/cookie-policy`

---

## 🎨 Personalizzazione Banner Cookie

Nel file `web/index.html`, puoi personalizzare:

### Colori (già configurati con brand Fides)
```javascript
"acceptButtonColor": "#0f172a", // Blu scuro Fides
"acceptButtonCaptionColor": "white",
"backgroundColor": "#ffffff",
"textColor": "#2c3e50"
```

### Posizione Banner
```javascript
"position": "bottom" // o "float-top-center", "float-bottom-right"
```

### Testo Banner
```javascript
"title": "🍪 Questo sito utilizza cookie",
"body": "Tuo testo personalizzato qui..."
```

---

## ✅ CHECKLIST FINALE

- [ ] Account iubenda creato
- [ ] Privacy Policy generata
- [ ] Cookie Policy generata
- [ ] Site ID copiato
- [ ] Cookie Policy ID copiato
- [ ] `web/index.html` aggiornato con ID reali
- [ ] `Footer.tsx` aggiornato con link corretti
- [ ] Sito testato: banner appare correttamente
- [ ] Link Privacy/Cookie funzionano
- [ ] Preferenze cookie modificabili dal footer

---

## 🧪 TESTING

### 1. Verifica Banner
- Apri il sito in incognito: http://localhost:5173
- Dovresti vedere il **banner cookie in basso**
- Clicca "Personalizza" → verifica che mostri le categorie
- Clicca "Accetta" → banner scompare

### 2. Verifica Link Footer
- Scroll in fondo alla pagina
- Clicca "**Privacy Policy**" → si apre popup iubenda
- Clicca "**Cookie Policy**" → si apre popup cookie
- Clicca "**🍪 Preferenze Cookie**" → riappare il banner

### 3. Verifica Console
Apri DevTools (F12) → Console:
- Dovresti vedere: `✅ Cookie consent: {purposes: {...}}`
- Nessun errore 404 su script iubenda

---

## 💰 PREZZI IUBENDA (2025)

### Piano Starter (Consigliato per Fides)
**27€/anno** per sito

Include:
- ✅ Privacy Policy illimitata
- ✅ Cookie Solution completa
- ✅ Aggiornamenti automatici GDPR
- ✅ Supporto email

### Piano Professional
**87€/anno**

Include tutto Starter + 
- Cookie consent log
- Consent database
- Supporto prioritario

---

## 📞 SUPPORTO

### Iubenda Support
- Email: support@iubenda.com
- Chat: https://www.iubenda.com/it
- Guide: https://www.iubenda.com/it/help

### Problemi Comuni

**Banner non appare?**
- Verifica che i 3 script siano caricati (vedi Network tab)
- Controlla Site ID e Cookie Policy ID corretti
- Pulisci cache browser (Ctrl+Shift+R)

**Link Privacy/Cookie non funzionano?**
- Verifica URL con ID corretto
- Assicurati che le policy siano pubblicate su iubenda

**Errore 404 su script?**
- Verifica connessione internet
- Script iubenda potrebbero essere bloccati da AdBlocker (disattiva temporaneamente)

---

## 🔄 MANUTENZIONE

### Ogni 6 Mesi
1. Scansiona nuovamente il sito per nuovi cookie
2. Aggiorna Cookie Policy se cambi servizi (es. aggiungi Google Analytics)
3. Verifica che Privacy Policy sia ancora completa

### Quando Aggiungere Nuovi Servizi
Se installi:
- Google Analytics
- Facebook Pixel
- Chat widget (es. Tawk.to)
- Mappe Google

**→ Aggiungi il servizio su iubenda** e riscansiona cookie

---

## 📄 DOCUMENTI GENERATI

Dopo setup completo, iubenda genera:

1. **Privacy Policy** (URL: https://www.iubenda.com/privacy-policy/TUOID)
2. **Cookie Policy** (URL: https://www.iubenda.com/privacy-policy/TUOID/cookie-policy)
3. **Cookie Banner** (già integrato nel sito)
4. **Registro Consensi** (se piano Professional)

Questi link possono essere condivisi con clienti o inseriti in:
- Email footer
- Contratti
- Modulistica agenzia

---

**Setup completato con successo! 🎉**

Il sito Fides è ora **100% GDPR compliant** con gestione professionale cookie tramite iubenda.
