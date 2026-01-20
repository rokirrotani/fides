# 🚀 Script di Test Completo - Fides Immobiliare
# Esegui questo script per installare e testare tutto il progetto!

Write-Host "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    🏠  FIDES IMMOBILIARE - TEST SUITE COMPLETO  🏠       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

Write-Host "`n📦 Fase 1: Installazione dipendenze...`n" -ForegroundColor Yellow

# Installa dipendenze backend
Write-Host "⚙️  Installando dipendenze BACKEND..." -ForegroundColor Green
Set-Location server
npm install
Write-Host "✅ Backend pronto!`n" -ForegroundColor Green

# Installa dipendenze frontend
Set-Location ..
Write-Host "⚙️  Installando dipendenze FRONTEND..." -ForegroundColor Green
Set-Location web
npm install
Write-Host "✅ Frontend pronto!`n" -ForegroundColor Green

Set-Location ..

Write-Host "`n🧪 Fase 2: Esecuzione Test...`n" -ForegroundColor Yellow

# Test Backend
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "           🔧 TEST BACKEND (SERVER)                        " -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Set-Location server
npm test

Write-Host "`n`n" -ForegroundColor White

# Test Frontend
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "           🎨 TEST FRONTEND (WEB)                          " -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Set-Location ../web
npm test

Set-Location ..

Write-Host "`n
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              🎉 TEST COMPLETATI! 🎉                       ║
║                                                           ║
║  📊 Vedi i report di coverage in:                        ║
║     • server/coverage/lcov-report/index.html             ║
║     • web/coverage/lcov-report/index.html                ║
║                                                           ║
║  🔐 Credenziali Login:                                   ║
║     Username: fidesimmobiliare2026                       ║
║     Password: f1d3s1mm0b1l1@r3                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
" -ForegroundColor Green

Write-Host "`n💡 COMANDI UTILI:" -ForegroundColor Yellow
Write-Host "   • Avvia backend:  cd server && npm run dev" -ForegroundColor White
Write-Host "   • Avvia frontend: cd web && npm run dev" -ForegroundColor White
Write-Host "   • Test backend:   cd server && npm test" -ForegroundColor White
Write-Host "   • Test frontend:  cd web && npm test" -ForegroundColor White
Write-Host "   • Test watch:     npm run test:watch`n" -ForegroundColor White

Write-Host "🌟 Premi INVIO per uscire..." -ForegroundColor Cyan
Read-Host
