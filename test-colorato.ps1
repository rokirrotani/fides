# 🎨 Script Test Colorato - Fides Immobiliare
# Output figo con colori e statistiche!

Clear-Host

# Banner iniziale
Write-Host ""
Write-Host "  ███████╗██╗██████╗ ███████╗███████╗" -ForegroundColor Cyan
Write-Host "  ██╔════╝██║██╔══██╗██╔════╝██╔════╝" -ForegroundColor Cyan
Write-Host "  █████╗  ██║██║  ██║█████╗  ███████╗" -ForegroundColor Cyan
Write-Host "  ██╔══╝  ██║██║  ██║██╔══╝  ╚════██║" -ForegroundColor Cyan
Write-Host "  ██║     ██║██████╔╝███████╗███████║" -ForegroundColor Cyan
Write-Host "  ╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "         🏠 TEST SUITE 🏠" -ForegroundColor Yellow
Write-Host ""

Write-Host "🔧 Esecuzione test..." -ForegroundColor Gray
Write-Host ""

Set-Location server
$output = npm test --silent 2>&1 | Out-String
Set-Location ..

# Parse risultati
$passed = if ($output -match "Tests:.*?(\d+) passed") { [int]$matches[1] } else { 0 }
$failed = if ($output -match "(\d+) failed") { [int]$matches[1] } else { 0 }
$total = $passed + $failed
$successRate = if ($total -gt 0) { [math]::Round(($passed / $total) * 100, 1) } else { 0 }

# Mostra risultati
Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                            ║" -ForegroundColor Green
Write-Host "║            ✨ RISULTATI ✨                 ║" -ForegroundColor Green
Write-Host "║                                            ║" -ForegroundColor Green
Write-Host "║   " -NoNewline -ForegroundColor Green
Write-Host "Test Passati:  " -NoNewline -ForegroundColor White
Write-Host "$passed".PadLeft(3) -NoNewline -ForegroundColor Yellow
Write-Host " / $total".PadRight(14) -NoNewline -ForegroundColor White
Write-Host "  ║" -ForegroundColor Green
Write-Host "║   " -NoNewline -ForegroundColor Green
Write-Host "Success Rate:  " -NoNewline -ForegroundColor White
Write-Host "$successRate%".PadLeft(5).PadRight(19) -NoNewline -ForegroundColor $(if ($successRate -eq 100) { "Green" } else { "Yellow" })
Write-Host "  ║" -ForegroundColor Green
Write-Host "║                                            ║" -ForegroundColor Green

if ($successRate -eq 100) {
    Write-Host "║        🏆 PERFETTO AL 100%! 🏆            ║" -ForegroundColor Green
    Write-Host "║                                            ║" -ForegroundColor Green
}

Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Barra di progresso gigante
$barLength = 50
$filled = [math]::Floor($barLength * $successRate / 100)
$empty = $barLength - $filled

Write-Host "  [" -NoNewline -ForegroundColor Cyan
Write-Host ("█" * $filled) -NoNewline -ForegroundColor Green
Write-Host ("░" * $empty) -NoNewline -ForegroundColor DarkGray
Write-Host "] " -NoNewline -ForegroundColor Cyan
Write-Host "$successRate%" -ForegroundColor $(if ($successRate -eq 100) { "Green" } else { "Yellow")
Write-Host ""

if ($successRate -eq 100) {
    Write-Host "  🎊 Tutti i test sono verdi! Codice impeccabile! 🎊" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "📁 Coverage: " -NoNewline -ForegroundColor Cyan
Write-Host "server/coverage/lcov-report/index.html" -ForegroundColor White
Write-Host ""
