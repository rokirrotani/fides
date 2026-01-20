# 🚀 Guida Rapida Testing - Ottimizzazioni Mobile

## ⚡ Come Avviare il Progetto

### 1. Frontend (Web)
```bash
cd web
npm install
npm run dev
```

Il sito sarà disponibile su: **http://localhost:5173**

### 2. Backend (Server) - Opzionale
```bash
cd server
npm install
npm run dev
```

Il server sarà su: **http://localhost:3000**

---

## 📱 Come Testare il Responsive Design

### Opzione 1: Chrome DevTools (Consigliato)

1. **Apri il sito** su Chrome
2. **Premi F12** (o Ctrl+Shift+I)
3. **Attiva Device Toolbar**: Ctrl+Shift+M (o click icona 📱)
4. **Seleziona dispositivi** da testare:
   - iPhone SE
   - iPhone 12 Pro
   - iPhone 14 Pro Max
   - iPad
   - iPad Pro
   - Samsung Galaxy S20
   - Pixel 5

5. **Testa orientamenti**:
   - Click icona rotazione per landscape/portrait
   - Verifica layout in entrambe le orientazioni

### Opzione 2: Responsive Design Mode (Firefox)

1. **Apri il sito** su Firefox
2. **Premi Ctrl+Shift+M**
3. **Seleziona preset** o imposta dimensioni custom
4. **Ruota** con icona rotazione

### Opzione 3: Real Device Testing

#### Metodo A: Network Locale
1. **Trova IP locale**: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
2. **Accedi da smartphone**: `http://[TUO-IP]:5173`
3. **Esempio**: `http://192.168.1.100:5173`

#### Metodo B: Chrome Remote Debugging (Android)
1. **Collega smartphone** via USB
2. **Abilita Developer Options** su Android
3. **Abilita USB Debugging**
4. **Chrome DevTools** > More Tools > Remote Devices
5. **Ispeziona** il sito in tempo reale

---

## 🎯 Cosa Testare - Checklist

### ✅ Layout Responsive

#### Mobile (< 768px)
- [ ] **Navbar**: Hamburger menu visibile
- [ ] **Menu mobile**: Si apre smooth al click
- [ ] **Logo**: Centrato e dimensione corretta
- [ ] **Split homepage**: Stack verticale (Paesana sopra, Torino sotto)
- [ ] **Typography**: Font leggibili (minimo 15-16px)
- [ ] **Buttons**: Larghi 100%, padding adeguato
- [ ] **Footer**: Stack verticale, leggibile
- [ ] **ScrollToTop**: Appare dopo scroll, dimensione 48px

#### Tablet (768px - 1024px)
- [ ] **Navbar**: Desktop nav visibile se > 1100px, altrimenti hamburger
- [ ] **Properties grid**: 2 colonne
- [ ] **Split homepage**: Affiancato con hover effects
- [ ] **Footer**: 2 colonne
- [ ] **Typography**: Scala media

#### Desktop (> 1024px)
- [ ] **Top bar**: Blu con contatti e social
- [ ] **Main navbar**: Bianca con logo e menu completo
- [ ] **Split homepage**: 50/50 con hover effects
- [ ] **Properties grid**: 3+ colonne
- [ ] **Footer**: 3 colonne
- [ ] **All hover effects**: Attivi e smooth

### ✅ Touch Interaction

- [ ] **Tap targets**: Minimo 44x44px (visuale o padding)
- [ ] **Menu items**: Facilmente tappabili
- [ ] **Links**: Padding adeguato, non troppo vicini
- [ ] **Buttons**: Full width su mobile, facili da premere
- [ ] **Active states**: Feedback visivo al tocco
- [ ] **No hover su touch**: Hover disabilitato su touch devices

### ✅ Animazioni & Performance

- [ ] **Menu slide**: Animazione smooth senza jank
- [ ] **Logo float**: Animazione fluida homepage
- [ ] **Hover effects**: Transizioni smooth (0.3s-0.7s)
- [ ] **ScrollToTop**: Fade in/out smooth
- [ ] **Page transitions**: Nessun flash/jump
- [ ] **Images**: Lazy loading funzionante
- [ ] **Scroll**: Smooth, nessun lag

### ✅ Typography & Leggibilità

- [ ] **Titoli**: Leggibili su tutti i dispositivi
- [ ] **Body text**: Mai sotto 15px su mobile
- [ ] **Line height**: Comodo per lettura (1.5-1.7)
- [ ] **Contrasto**: Sufficiente su tutti i bg
- [ ] **Overflow**: Nessun testo tagliato

### ✅ Safe Areas (iPhone X+)

- [ ] **Navbar**: Padding rispetta notch
- [ ] **Footer**: Padding rispetta home indicator
- [ ] **ScrollToTop**: Posizionato sopra safe area
- [ ] **Mobile nav**: Padding bottom safe area

### ✅ Orientamento Landscape

- [ ] **Mobile landscape**: Layout adattato
- [ ] **Height limitata**: Nessun overflow strano
- [ ] **Split homepage**: Visibile completamente
- [ ] **Navbar**: Collassata se necessario

---

## 🔍 Testing Lighthouse

### Come Eseguire Audit

1. **Apri DevTools** (F12)
2. **Tab Lighthouse**
3. **Configurazione**:
   - Device: **Mobile** o **Desktop**
   - Categories: Tutte selezionate
   - Clear storage: ✅
4. **Generate Report**

### Score Target

#### Mobile
- ⚡ Performance: **90+**
- ♿ Accessibility: **95+**
- ✅ Best Practices: **90+**
- 🔍 SEO: **100**

#### Desktop
- ⚡ Performance: **95+**
- ♿ Accessibility: **95+**
- ✅ Best Practices: **95+**
- 🔍 SEO: **100**

### Metriche Chiave
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s

---

## 🐛 Common Issues & Solutions

### Problema: Menu mobile non si apre
**Soluzione**: Verifica che la viewport sia < 1100px

### Problema: Immagini non caricano
**Soluzione**: 
1. Verifica path immagini in `/public`
2. Check lazy loading implementation
3. Console per errori

### Problema: Animazioni lag
**Soluzione**:
1. Verifica GPU acceleration
2. Check `will-change` usage
3. Reduce animation complexity

### Problema: Layout rotto su iPhone
**Soluzione**:
1. Verifica safe area insets
2. Check viewport meta tag
3. Test su Safari iOS DevTools

### Problema: Font troppo piccoli
**Soluzione**:
1. Verifica media queries
2. Controlla `clamp()` values
3. Assicurati minimo 15-16px mobile

---

## 🎨 DevTools Tips

### Mobile Simulation
```
1. Network throttling: "Fast 3G" o "Slow 3G"
2. CPU throttling: 4x slowdown
3. Test scrolling performance
4. Check touch events
```

### Performance Recording
```
1. Performance tab
2. Start recording
3. Interact with site
4. Stop recording
5. Analyze flame chart
```

### Coverage Analysis
```
1. More Tools > Coverage
2. Start coverage
3. Navigate site
4. See unused CSS/JS
```

---

## 📊 Testing Matrix

| Device         | Width  | Navbar      | Split   | Footer  | Menu    |
|----------------|--------|-------------|---------|---------|---------|
| iPhone SE      | 375px  | Hamburger   | Stack   | Stack   | Mobile  |
| iPhone 12      | 390px  | Hamburger   | Stack   | Stack   | Mobile  |
| iPhone 14 Max  | 430px  | Hamburger   | Stack   | Stack   | Mobile  |
| Samsung Galaxy | 360px  | Hamburger   | Stack   | Stack   | Mobile  |
| iPad           | 768px  | Hamburger   | Stack   | 2 cols  | Mobile  |
| iPad Pro       | 1024px | Desktop     | Side    | 3 cols  | Desktop |
| Desktop        | 1920px | Desktop     | Side    | 3 cols  | Desktop |

---

## ✨ Features da Testare

### 1. Lazy Loading
- Scroll veloce giù nella homepage
- Verifica che immagini carichino progressivamente
- Check placeholder durante loading

### 2. ScrollToTop Button
- Scroll > 300px
- Button appare con fade-in
- Click riporta smooth in cima
- Posizione responsive (24px → 16px mobile)

### 3. Toast Notifications (se implementate)
- Appaiono in alto centro
- Auto-dismiss dopo 3s
- Close button funzionante
- Responsive positioning

### 4. Glassmorphism Effects
- Menu mobile backdrop blur
- Button hover glassmorphism
- Cross-browser compatibility

### 5. Touch States
- Buttons `:active` su mobile
- Cards tap feedback
- Links touch response

---

## 🚀 Quick Test Commands

### Check Build
```bash
cd web
npm run build
npm run preview
```

### Check Linting
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

---

## 📱 Recommended Tools

### Browser Extensions
- **Lighthouse** (Built-in Chrome)
- **WAVE** (Accessibility)
- **axe DevTools** (Accessibility)
- **Responsive Viewer** (Multi-device)

### Online Tools
- **responsively.app** - Multi-device preview
- **BrowserStack** - Real device testing
- **PageSpeed Insights** - Google performance
- **Mobile-Friendly Test** - Google mobile test

### Desktop Apps
- **Responsively** - Multi-screen testing
- **Sizzy** - Device previewer

---

## ✅ Pre-Production Checklist

Prima di andare in produzione:

- [ ] Test su almeno 3 device fisici
- [ ] Lighthouse score > 90 mobile
- [ ] Nessun errore console
- [ ] Tutte le immagini caricano
- [ ] Menu mobile funzionante
- [ ] Forms validano correttamente
- [ ] SEO meta tags presenti
- [ ] manifest.json corretto
- [ ] robots.txt configurato
- [ ] Analytics setup (opzionale)
- [ ] GDPR/Cookie consent (Iubenda)

---

## 📞 Support

Se trovi problemi:
1. Check **Console** per errori
2. Verifica **Network tab** per failed requests
3. Test su **browser diverso**
4. Clear **cache** e riprova

---

**Happy Testing! 🎉**

Ricorda: Il sito è ottimizzato per **tutti i dispositivi** da 320px a 4K! 📱💻🖥️
