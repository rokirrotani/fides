# 📖 GUIDA UTENTE - FIDES IMMOBILIARE

**Manuale completo per l'utilizzo del pannello amministrativo**

---

## 📋 INDICE

1. [Accesso al Pannello Admin](#1-accesso-al-pannello-admin)
2. [Dashboard Principale](#2-dashboard-principale)
3. [Gestione Immobili](#3-gestione-immobili)
4. [Caricamento Immagini](#4-caricamento-immagini)
5. [Modifica ed Eliminazione](#5-modifica-ed-eliminazione)
6. [Gestione Richieste Clienti](#6-gestione-richieste-clienti)
7. [Navigazione Sito Pubblico](#7-navigazione-sito-pubblico)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. ACCESSO AL PANNELLO ADMIN

### 1.1 Come Accedere

**Passo 1:** Apri il browser e vai all'URL:
```
https://fides-immobiliare.it/admin
```
oppure in locale:
```
http://localhost:5173/admin
```

**Passo 2:** Vedrai la schermata di login con:
- Campo "Username"
- Campo "Password"
- Bottone "Accedi"

**Passo 3:** Inserisci le credenziali:
```
Username: fides_admin_2025
Password: F!d3$_S3cur3_2025#Imm0b!l!@r3
```

> ⚠️ **Attenzione:** Le credenziali sono case-sensitive! Copia-incolla per evitare errori.

**Passo 4:** Clicca su **"Accedi"**

✅ Se le credenziali sono corrette, sarai reindirizzato alla dashboard

❌ Se sbagli password:
- Vedrai messaggio "Credenziali non valide"
- Hai 5 tentativi ogni 15 minuti
- Dopo 5 errori, dovrai attendere 15 minuti

---

## 2. DASHBOARD PRINCIPALE

### 2.1 Panoramica

Dopo il login vedrai la **Dashboard Admin** con:

**Header:**
- Logo "FIDES IMMOBILIARE"
- Benvenuto "Admin"
- Bottone "Logout" (in alto a destra)

**Sezione Principale:**
- Bottone **"+ Nuovo Immobile"** (blu scuro)
- Tabella immobili esistenti
- Filtri per sede (Paesana/Torino)

**Colonne Tabella:**
| Colonna | Descrizione |
|---------|-------------|
| **Immagine** | Thumbnail prima foto |
| **Titolo** | Nome immobile |
| **Sede** | Paesana o Torino |
| **Tipo** | Vendita/Affitto |
| **Prezzo** | Euro |
| **Stato** | Disponibile/Venduto |
| **Azioni** | Modifica/Elimina |

### 2.2 Navigazione

**Per tornare al sito pubblico:**
- Clicca su logo "FIDES IMMOBILIARE" in alto a sinistra

**Per disconnetterti:**
- Clicca bottone **"Logout"** in alto a destra

---

## 3. GESTIONE IMMOBILI

### 3.1 Creare Nuovo Immobile

**Passo 1:** Clicca bottone **"+ Nuovo Immobile"**

**Passo 2:** Compila il form con tutti i dettagli:

#### 📝 Informazioni Base

**Titolo Immobile** *(obbligatorio)*
```
Esempio: "Appartamento panoramico con terrazzo"
Lunghezza: max 100 caratteri
```

**Descrizione** *(obbligatorio)*
```
Esempio: "Luminoso bilocale completamente ristrutturato, 
con vista panoramica sulla valle. Finiture di pregio, 
riscaldamento autonomo, balcone vivibile."

Suggerimenti:
- Descrivi punti di forza
- Includi ristrutturazioni recenti
- Menziona dotazioni (riscaldamento, infissi, ecc.)
- Max 500 caratteri
```

**Sede** *(obbligatorio)*
- Seleziona **Paesana** o **Torino**
- Determina in quale sezione del sito apparirà

**Tipo Contratto** *(obbligatorio)*
- **Vendita** → Immobile in vendita
- **Affitto** → Immobile in affitto

**Categoria** *(obbligatorio)*
- **Appartamento** → Unità in condominio
- **Casa Indipendente** → Villa, villetta, rustico
- **Commerciale** → Negozio, ufficio, capannone
- **Terreno** → Lotto edificabile, terreno agricolo

#### 💰 Prezzo

**Prezzo** *(obbligatorio)*
```
Esempio Vendita: 145000 (= €145.000)
Esempio Affitto: 650 (= €650/mese)

- Solo numeri, senza simboli
- Verrà formattato automaticamente come €145.000
```

#### 📍 Localizzazione

**Indirizzo** *(opzionale ma consigliato)*
```
Esempio: "Via Roma, 45"
```

**Città** *(obbligatorio)*
```
Esempio: "Paesana" o "Torino"
```

**Provincia** *(obbligatorio)*
```
Esempio: "CN" o "TO"
Formato: sigla 2 lettere
```

**CAP** *(opzionale)*
```
Esempio: "12034" o "10128"
```

#### 🏠 Caratteristiche

**Camere** *(obbligatorio)*
```
Numero locali principali: 1, 2, 3, 4, 5+
Conta solo camere abitabili (escluso bagni e cucina)
```

**Bagni** *(obbligatorio)*
```
Numero bagni: 1, 2, 3, 4+
Includi mezzi bagni
```

**Metri Quadri (m²)** *(obbligatorio)*
```
Esempio: 85 (= 85 m²)
Solo superfici calpestabili
```

**Piano** *(obbligatorio per appartamenti)*
```
Esempi:
- 0 (Piano terra)
- 1 (Primo piano)
- -1 (Seminterrato)
- 3 (Terzo piano)

Per case indipendenti: 0
```

**Anno Costruzione** *(opzionale)*
```
Esempio: 1985
Anno 4 cifre
```

**Classe Energetica** *(opzionale)*
```
A+, A, B, C, D, E, F, G
```

#### 📸 Immagini

**Caricamento Foto** *(obbligatorio - min 1 foto)*

**Formati supportati:**
- JPG/JPEG
- PNG
- WebP

**Dimensioni consigliate:**
- Larghezza minima: 1200px
- Ratio consigliato: 16:9 o 4:3
- Peso max: 5MB per foto

**Come caricare:**
1. Clicca bottone **"Scegli file"** o **"+"**
2. Seleziona una o più foto dal computer
3. Vedrai anteprima thumbnail
4. Puoi caricare fino a 10 foto

**Ordine foto:**
- La prima foto sarà la copertina
- Trascina per riordinare (se disponibile)
- Consiglio: metti la foto migliore come prima

**Cosa fotografare (best practice):**
1. **Esterno edificio** (se casa indipendente)
2. **Soggiorno** (angolazione ampia)
3. **Cucina**
4. **Camere da letto**
5. **Bagni**
6. **Balconi/Terrazzi**
7. **Vista panoramica** (se rilevante)
8. **Dettagli pregio** (camino, parquet, ecc.)

#### ✅ Stato Immobile

**Disponibilità:**
- ☑️ **Disponibile** → Immobile visibile e acquistabile
- ☑️ **Venduto** → Apparirà badge rosso "VENDUTO" con overlay

**Quando segnare come venduto:**
- Contratto firmato
- Rogito concluso
- Mantieni visibile per mostrare portfolio

#### 💾 Salvataggio

**Passo 3:** Dopo aver compilato tutto, clicca bottone **"Salva Immobile"**

**Cosa succede:**
- ✅ Form validato (campi obbligatori controllati)
- ✅ Immagini caricate sul server
- ✅ Immobile salvato nel database
- ✅ Reindirizzamento alla dashboard
- ✅ Messaggio conferma "Immobile creato con successo"

**Se ci sono errori:**
- ❌ Campi obbligatori mancanti → Evidenziati in rosso
- ❌ Immagini troppo grandi → "File supera 5MB"
- ❌ Formato non supportato → "Solo JPG/PNG/WebP"

---

## 4. CARICAMENTO IMMAGINI

### 4.1 Preparazione Foto

**Prima di caricare:**

**✅ FARE:**
- Scatta con buona luce naturale (mattina/primo pomeriggio)
- Usa fotocamera di qualità o smartphone recente
- Inquadrature ampie per mostrare spazio
- Foto orizzontali (landscape)
- Pulisci e sistema ambiente prima di fotografare
- Raddrizza linee verticali/orizzontali

**❌ EVITARE:**
- Foto sfocate o mosse
- Luce scarsa o controluce
- Foto verticali (portrait)
- Disordine visibile
- Effetti filtri eccessivi
- Watermark/scritte

### 4.2 Ottimizzazione Immagini

**Strumenti gratuiti consigliati:**

**Online:**
- **TinyPNG** (https://tinypng.com) → Compressione senza perdita qualità
- **Squoosh** (https://squoosh.app) → Conversione e resize

**Dimensioni ottimali:**
```
Larghezza: 1920px (Full HD)
Altezza: 1080px (16:9) o 1440px (4:3)
Peso: 500KB - 1.5MB (dopo compressione)
Formato: JPG (qualità 85%) o WebP
```

**Come ottimizzare:**
1. Apri TinyPNG
2. Trascina tutte le foto
3. Attendi compressione automatica (30-70% riduzione)
4. Scarica file compressi
5. Carica nel pannello admin

### 4.3 Upload Multiplo

**Per caricare più foto insieme:**

**Passo 1:** Clicca campo upload immagini

**Passo 2:** Tieni premuto **Ctrl** (Windows) o **Cmd** (Mac)

**Passo 3:** Seleziona tutte le foto desiderate (max 10)

**Passo 4:** Clicca "Apri"

✅ Tutte le foto saranno caricate insieme

**Verifica upload:**
- Ogni foto mostra anteprima
- Nome file visibile
- Dimensione file mostrata
- Icona "✓" verde quando caricata

### 4.4 Risoluzione Problemi Upload

**Upload fallisce?**

**Problema: "File troppo grande"**
```
Soluzione:
1. Comprimi con TinyPNG
2. Oppure riduci risoluzione a 1920x1080
```

**Problema: "Formato non supportato"**
```
Formati accettati: JPG, PNG, WebP
Soluzione: Converti con Squoosh
```

**Problema: "Upload lento"**
```
Cause possibili:
- Connessione internet lenta
- File troppo pesanti (>3MB)
- Molte foto insieme (>10)

Soluzione:
- Carica 3-4 foto alla volta
- Comprimi prima di caricare
```

---

## 5. MODIFICA ED ELIMINAZIONE

### 5.1 Modificare Immobile Esistente

**Passo 1:** Dalla dashboard, trova l'immobile nella tabella

**Passo 2:** Clicca icona **"✏️ Modifica"** (matita blu)

**Passo 3:** Form pre-compilato con dati attuali

**Passo 4:** Modifica i campi desiderati:
- Puoi cambiare qualsiasi informazione
- Aggiungere/rimuovere foto
- Cambiare stato disponibilità
- Aggiornare prezzo

**Passo 5:** Clicca **"Salva Modifiche"**

✅ Immobile aggiornato immediatamente sul sito pubblico

**Casi d'uso comuni:**

**Riduzione prezzo:**
```
1. Modifica immobile
2. Cambia campo "Prezzo"
3. Salva
→ Prezzo aggiornato istantaneamente
```

**Segnare come venduto:**
```
1. Modifica immobile
2. Spunta checkbox "Venduto"
3. Salva
→ Appare badge rosso "VENDUTO" sul sito
```

**Aggiungere foto:**
```
1. Modifica immobile
2. Clicca "Aggiungi foto"
3. Seleziona nuove immagini
4. Salva
→ Foto aggiunte alla galleria
```

### 5.2 Eliminare Immobile

**⚠️ ATTENZIONE: L'eliminazione è PERMANENTE e irreversibile!**

**Passo 1:** Dalla dashboard, trova immobile da eliminare

**Passo 2:** Clicca icona **"🗑️ Elimina"** (cestino rosso)

**Passo 3:** Apparirà popup conferma:
```
"Sei sicuro di voler eliminare questo immobile?"
```

**Passo 4:** 
- Clicca **"Conferma"** → Immobile eliminato
- Clicca **"Annulla"** → Operazione annullata

**Cosa viene eliminato:**
- ❌ Dati immobile dal database
- ❌ Tutte le foto associate
- ❌ Riferimenti dal sito pubblico

**⚠️ NON ELIMINARE se:**
- Immobile venduto (segna come "Venduto" invece)
- Temporaneamente non disponibile (rimuovi da visibilità)

**💡 Alternative all'eliminazione:**

**Invece di eliminare, considera:**
1. **Segnare come venduto** → Mantieni portfolio
2. **Mettere in bozza** (se funzione disponibile)
3. **Archiviare** per statistiche future

---

## 6. GESTIONE RICHIESTE CLIENTI

### 6.1 Richieste di Acquisto

**Dove trovarle:**
- Dashboard admin → Sezione "Richieste Acquisto"
- Oppure tab dedicato "Richieste"

**Informazioni ricevute:**
```
Nome: Mario Rossi
Email: mario.rossi@email.it
Telefono: 333 123 4567
Budget: €150.000 - €200.000
Tipologia: Appartamento
Camere: 3
Città preferita: Paesana
Messaggio: "Cerco trilocale con terrazzo..."
Data richiesta: 03/01/2026 14:35
```

**Come gestire:**

**Passo 1:** Leggi dettagli richiesta

**Passo 2:** Verifica immobili corrispondenti nel database

**Passo 3:** Contatta cliente:
- Via email (copia indirizzo)
- Via telefono (click to call)

**Passo 4:** Proponi immobili adatti

**Passo 5:** Segna richiesta come:
- ✅ **Gestita** → Cliente contattato
- ⏳ **In corso** → Trattativa attiva
- ❌ **Chiusa** → Non interessato / venduto ad altri

### 6.2 Richieste di Vendita

**Informazioni ricevute:**
```
Nome: Anna Bianchi
Email: anna.bianchi@email.it
Telefono: 347 987 6543
Indirizzo immobile: Via Po 12, Paesana
Tipologia: Casa indipendente
Mq: 120
Anno: 1980
Stato: Da ristrutturare
Prezzo richiesto: €180.000
Motivo vendita: Trasferimento
Tempistiche: Entro 6 mesi
Messaggio: "Casa ereditata, necessita lavori..."
Data: 02/01/2026 10:20
```

**Workflow consigliato:**

**Passo 1:** Contatta proprietario
```
Email template:
"Gentile [Nome],
abbiamo ricevuto la sua richiesta di valutazione 
per l'immobile in [Indirizzo].

Saremo lieti di fissare un sopralluogo per 
una valutazione gratuita.

Le proponiamo:
- Martedì 07/01 ore 10:00
- Mercoledì 08/01 ore 15:00

Cordiali saluti,
Fides Immobiliare"
```

**Passo 2:** Sopralluogo e valutazione

**Passo 3:** Se incarico confermato:
```
1. Fotografa immobile
2. Crea nuovo immobile in admin
3. Carica foto professionali
4. Pubblica sul sito
```

**Passo 4:** Marketing
```
- Condividi su social
- Invia a database clienti
- Pubblicizza su portali esterni (se integrato)
```

---

## 7. NAVIGAZIONE SITO PUBBLICO

### 7.1 Struttura Sito

**Homepage** → `https://fides-immobiliare.it`
```
- Split screen Paesana/Torino
- Click su sezione → Lista immobili sede
```

**Paesana** → `/paesana`
```
- Tutti immobili Paesana
- Filtri disponibili
- Griglia responsive
```

**Torino** → `/torino`
```
- Tutti immobili Torino
- Filtri disponibili
- Griglia responsive
```

**Dettaglio Immobile** → `/property/:id`
```
- Galleria foto full-screen
- Caratteristiche dettagliate
- Mappa località
- Form contatto rapido
```

**Chi Siamo** → `/chi-siamo`
```
- Storia azienda
- Valori
- Team
```

**Contatti** → `/contatti`
```
- Form contatti
- Mappa sedi
- Info Paesana e Torino
```

**Vendi Casa** → `/vendi-casa`
```
- Form richiesta valutazione
- Processo vendita
- Vantaggi Fides
```

**Compra Casa** → `/compra-casa`
```
- Form ricerca immobile
- Categorie disponibili
- Servizi acquisto
```

### 7.2 Come i Clienti Vedono gli Immobili

**Step cliente:**

**1. Homepage**
```
Cliente vede split Paesana/Torino
Sceglie zona interesse
```

**2. Lista Immobili**
```
Vede griglia card immobili:
- Foto copertina
- Titolo
- Prezzo grande evidenza
- Caratteristiche (camere, mq)
- Badge "VENDUTO" se non disponibile
```

**3. Click su Card**
```
Apre pagina dettaglio con:
- Galleria scorrevole tutte foto
- Descrizione completa
- Tabella caratteristiche
- Mappa Google Maps
- Bottone "Contattaci"
```

**4. Contatto**
```
Cliente può:
- Compilare form "Richiedi info"
- Chiamare telefono (click to call mobile)
- Scrivere email
```

### 7.3 Verifica Pubblicazione

**Checklist dopo pubblicazione immobile:**

✅ **Verifica visibilità homepage**
```
1. Vai su homepage
2. Click su sezione (Paesana/Torino)
3. Trova immobile in griglia
```

✅ **Verifica dettaglio**
```
1. Click su card immobile
2. Controlla tutte foto caricano
3. Verifica descrizione formattata bene
4. Testa mappa mostra posizione corretta
```

✅ **Verifica mobile**
```
1. Apri sito da smartphone
2. Menu hamburger funziona
3. Foto swipe correttamente
4. Form contatti compilabile
```

✅ **Verifica badge venduto**
```
Se immobile segnato venduto:
1. Card ha overlay scuro
2. Badge rosso "VENDUTO" visibile
3. Dettaglio mostra stato venduto
4. Form contatto disabilitato (opzionale)
```

---

## 8. TROUBLESHOOTING

### 8.1 Problemi Login

**❌ "Credenziali non valide"**
```
Verifica:
- Username esatto: fides_admin_2025
- Password case-sensitive
- Nessuno spazio prima/dopo

Soluzione: Copia-incolla da CREDENZIALI_ADMIN.md
```

**❌ "Troppi tentativi, riprova tra 15 minuti"**
```
Causa: 5 login falliti
Soluzione: Attendi 15 minuti o chiedi reset admin
```

**❌ Pagina login non carica**
```
Verifica:
- Server backend attivo (porta 4000)
- Frontend attivo (porta 5173)
- Console browser (F12) per errori

Soluzione: Riavvia server
```

### 8.2 Problemi Upload Immagini

**❌ "Upload failed"**
```
Cause:
1. File > 5MB → Comprimi
2. Formato non supportato → Usa JPG
3. Connessione lenta → Attendi
4. Server pieno → Contatta sviluppatore
```

**❌ Immagini non si vedono sul sito**
```
Verifica:
1. Upload completato (✓ verde)
2. Immobile salvato
3. Cache browser (Ctrl+F5)
4. Percorso foto corretto in database

Soluzione: Ricarica foto o svuota cache
```

**❌ Foto sfocate/pixelate**
```
Causa: Risoluzione troppo bassa
Soluzione: Usa foto min 1200px larghezza
```

### 8.3 Problemi Salvataggio

**❌ "Errore salvataggio immobile"**
```
Verifica campi obbligatori:
- [ ] Titolo compilato
- [ ] Descrizione compilata
- [ ] Prezzo > 0
- [ ] Almeno 1 foto caricata
- [ ] Sede selezionata
- [ ] Tipologia selezionata

Soluzione: Compila tutti i campi rossi
```

**❌ Modifiche non si salvano**
```
1. Controlla connessione internet
2. Verifica console errori (F12)
3. Ricarica pagina e riprova
4. Contatta supporto tecnico
```

### 8.4 Problemi Visualizzazione Sito

**❌ Immobile non compare in lista**
```
Verifica:
1. Sede corretta (Paesana/Torino)
2. Stato "Disponibile" o "Venduto"
3. Salvato correttamente
4. Cache browser (Ctrl+Shift+R)

Soluzione: Ricarica pagina forzando cache
```

**❌ Layout mobile rotto**
```
Verifica:
1. Browser aggiornato
2. JavaScript abilitato
3. Dimensione schermo supportata

Soluzione: Usa Chrome/Safari/Edge aggiornati
```

**❌ Badge "VENDUTO" non appare**
```
Verifica:
1. Checkbox "Venduto" spuntato
2. Modifiche salvate
3. Cache pulita

Soluzione: 
1. Modifica immobile
2. Riconferma stato venduto
3. Salva
4. Pulisci cache (Ctrl+Shift+R)
```

### 8.5 Problemi Performance

**❌ Sito lento**
```
Cause:
1. Troppe foto pesanti (>2MB)
2. Molti immobili caricati
3. Server sovraccarico

Soluzioni:
1. Comprimi tutte foto
2. Ottimizza database
3. Contatta supporto
```

**❌ Upload lento**
```
1. Comprimi foto prima
2. Carica 3-4 foto per volta
3. Usa connessione stabile (no WiFi pubblico)
```

---

## 🎯 BEST PRACTICES

### ✅ Creazione Immobili

**1. Foto di qualità**
- Min 5 foto per immobile
- Prima foto = migliore (è la copertina)
- Buona illuminazione naturale
- Inquadrature ampie

**2. Descrizioni efficaci**
```
✅ BUONA:
"Elegante trilocale ristrutturato nel 2023. Soggiorno 
luminoso con parquet rovere, cucina abitabile nuova, 
2 camere spaziose, doppi vetri, riscaldamento autonomo. 
Balcone panoramico vista valle. Cantina e posto auto."

❌ CATTIVA:
"Appartamento carino zona centrale."
```

**3. Prezzi competitivi**
- Ricerca prezzi zona simili
- Considera stato immobile
- Aggiorna se non vendi in 3 mesi

**4. Categorizzazione corretta**
- Appartamento → Condominio
- Casa Indipendente → Ville, villette
- Commerciale → Negozi, uffici
- Terreno → Solo lotti

### ✅ Manutenzione Periodica

**Settimanale:**
- Controlla nuove richieste clienti
- Rispondi entro 24h
- Aggiorna prezzi se necessario

**Mensile:**
- Verifica immobili venduti → Segna
- Rimuovi immobili non più disponibili
- Analizza visualizzazioni (se analytics)
- Backup database

**Trimestrale:**
- Aggiorna foto immobili stagionali
- Rinnova descrizioni
- Verifica link funzionanti
- Cambio password admin

### ✅ Sicurezza

**Password:**
- Cambio ogni 3 mesi
- Mai condividere
- Usa password manager

**Logout:**
- Sempre logout dopo uso
- Mai lasciare sessione aperta
- Specialmente su PC condivisi

**Backup:**
- Database settimanale
- Foto mensile
- Configurazioni

---

## 📞 SUPPORTO

**Problemi tecnici:**
- Email: support@fidesimmobiliare.it
- Telefono: 011 428 2544
- Orari: Lun-Ven 9:00-18:00

**Formazione aggiuntiva:**
- Video tutorial: /docs/video/
- FAQ: /docs/faq.md
- Manuale tecnico: SECURITY.md

**Richieste personalizzazione:**
- Contatta sviluppatori
- Preventivo funzionalità custom
- Integrazione portali esterni

---

## 📚 RISORSE UTILI

**Strumenti consigliati:**
- **TinyPNG** → Compressione foto (https://tinypng.com)
- **Canva** → Grafiche marketing (https://canva.com)
- **Google Analytics** → Statistiche visite
- **Notion** → Organizzazione immobili

**Checklist stampabili:**
- [ ] Checklist nuovo immobile
- [ ] Checklist sopralluogo
- [ ] Checklist foto immobile

---

**Versione Guida:** 1.0  
**Ultimo Aggiornamento:** Gennaio 2026  
**Piattaforma:** Fides Immobiliare Admin Panel

> 💡 **Suggerimento:** Stampa questa guida e tienila vicino alla postazione di lavoro!
