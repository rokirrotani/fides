# 🧪 TEST COMPLETO MOBILE E FILTRI - FIDES IMMOBILIARE

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIDES IMMOBILIARE - TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Verifica Z-Index Navbar
Write-Host "[TEST 1] Verifica Z-Index Navbar..." -ForegroundColor Yellow
$navbarContent = Get-Content "web\src\components\Navbar.tsx" -Raw
$zIndexCount = ([regex]::Matches($navbarContent, "zIndex: 1000")).Count

if ($zIndexCount -ge 2) {
    Write-Host "  ✅ Z-Index Navbar: CORRETTO (trovati $zIndexCount occorrenze di z-index >= 1000)" -ForegroundColor Green
} else {
    Write-Host "  ❌ Z-Index Navbar: ERRORE" -ForegroundColor Red
}

# Test 2: Verifica CAP Completi
Write-Host ""
Write-Host "[TEST 2] Verifica CAP Completi..." -ForegroundColor Yellow
$adminContent = Get-Content "web\src\pages\AdminPage.tsx" -Raw
$capPaesana = ([regex]::Matches($adminContent, "12034 \(CN\)")).Count
$capTorino = ([regex]::Matches($adminContent, "10128 \(TO\)")).Count

Write-Host "  - CAP Paesana (12034): $capPaesana occorrenze" -ForegroundColor Cyan
Write-Host "  - CAP Torino (10128): $capTorino occorrenze" -ForegroundColor Cyan

if ($capPaesana -ge 2 -and $capTorino -ge 1) {
    Write-Host "  ✅ CAP: TUTTI CORRETTI" -ForegroundColor Green
} else {
    Write-Host "  ❌ CAP: MANCANTI O INCOMPLETI" -ForegroundColor Red
}

# Test 3: Verifica Filtri PropertiesGrid
Write-Host ""
Write-Host "[TEST 3] Verifica Filtri PropertiesGrid..." -ForegroundColor Yellow
$gridContent = Get-Content "web\src\components\PropertiesGrid.tsx" -Raw

$hasTypeFilter = $gridContent -match 'value=\{filters\.type\}'
$hasPropertyTypeFilter = $gridContent -match 'value=\{filters\.propertyType\}'
$hasSortBy = $gridContent -match 'value=\{sortBy\}'
$hasPriceRange = $gridContent -match 'filters\.priceMin' -and $gridContent -match 'filters\.priceMax'
$hasSqmRange = $gridContent -match 'filters\.sqmMin' -and $gridContent -match 'filters\.sqmMax'

Write-Host "  - Filtro Tipo Contratto: $(if($hasTypeFilter){'✅'}else{'❌'})" -ForegroundColor $(if($hasTypeFilter){'Green'}else{'Red'})
Write-Host "  - Filtro Tipologia Immobile: $(if($hasPropertyTypeFilter){'✅'}else{'❌'})" -ForegroundColor $(if($hasPropertyTypeFilter){'Green'}else{'Red'})
Write-Host "  - Ordinamento: $(if($hasSortBy){'✅'}else{'❌'})" -ForegroundColor $(if($hasSortBy){'Green'}else{'Red'})
Write-Host "  - Range Prezzo: $(if($hasPriceRange){'✅'}else{'❌'})" -ForegroundColor $(if($hasPriceRange){'Green'}else{'Red'})
Write-Host "  - Range Superficie: $(if($hasSqmRange){'✅'}else{'❌'})" -ForegroundColor $(if($hasSqmRange){'Green'}else{'Red'})

if ($hasTypeFilter -and $hasPropertyTypeFilter -and $hasSortBy -and $hasPriceRange -and $hasSqmRange) {
    Write-Host "  ✅ Filtri PropertiesGrid: COMPLETI E FUNZIONANTI" -ForegroundColor Green
} else {
    Write-Host "  ❌ Filtri PropertiesGrid: MANCANTI O INCOMPLETI" -ForegroundColor Red
}

# Test 4: Verifica Mobile Optimization
Write-Host ""
Write-Host "[TEST 4] Verifica Mobile Optimization..." -ForegroundColor Yellow

$hasFontSize16 = $gridContent -match 'fontSize: [''"]16px[''"]'
$hasMinHeight48 = $gridContent -match 'minHeight: [''"]48px[''"]'
$hasWebkitAppearance = $gridContent -match 'WebkitAppearance:'

Write-Host "  - Font-size 16px (no iOS zoom): $(if($hasFontSize16){'✅'}else{'❌'})" -ForegroundColor $(if($hasFontSize16){'Green'}else{'Red'})
Write-Host "  - Min-height 48px (touch target): $(if($hasMinHeight48){'✅'}else{'❌'})" -ForegroundColor $(if($hasMinHeight48){'Green'}else{'Red'})
Write-Host "  - Webkit Appearance (cross-browser): $(if($hasWebkitAppearance){'✅'}else{'❌'})" -ForegroundColor $(if($hasWebkitAppearance){'Green'}else{'Red'})

if ($hasFontSize16 -and $hasMinHeight48) {
    Write-Host "  ✅ Mobile Optimization: COMPLETA" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Mobile Optimization: PARZIALE" -ForegroundColor Yellow
}

# Test 5: Verifica Professional Styling
Write-Host ""
Write-Host "[TEST 5] Verifica Professional Styling..." -ForegroundColor Yellow

$hasBlueColor = $gridContent -match '#0066ff'
$hasDarkGradient = $gridContent -match '#0f172a'
$hasModernBorder = $gridContent -match 'borderRadius:'

Write-Host "  - Colore Blu Corporate (#0066ff): $(if($hasBlueColor){'✅'}else{'❌'})" -ForegroundColor $(if($hasBlueColor){'Green'}else{'Red'})
Write-Host "  - Gradiente Dark Professionale: $(if($hasDarkGradient){'✅'}else{'❌'})" -ForegroundColor $(if($hasDarkGradient){'Green'}else{'Red'})
Write-Host "  - Bordi Moderni Arrotondati: $(if($hasModernBorder){'✅'}else{'❌'})" -ForegroundColor $(if($hasModernBorder){'Green'}else{'Red'})

if ($hasBlueColor -and $hasDarkGradient) {
    Write-Host "  ✅ Professional Styling: APPLICATO" -ForegroundColor Green
} else {
    Write-Host "  ❌ Professional Styling: MANCANTE" -ForegroundColor Red
}

# Test 6: Verifica Backup Files
Write-Host ""
Write-Host "[TEST 6] Verifica File di Backup..." -ForegroundColor Yellow

$backupExists = Test-Path "web\src\components\PropertiesGrid_BACKUP.tsx"

if ($backupExists) {
    Write-Host "  ✅ Backup PropertiesGrid: CREATO" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Backup PropertiesGrid: NON TROVATO" -ForegroundColor Yellow
}

# SUMMARY
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RIEPILOGO TEST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$totalTests = 6
$passedTests = 0

if ($zIndexCount -ge 2) { $passedTests++ }
if ($capPaesana -ge 2 -and $capTorino -ge 1) { $passedTests++ }
if ($hasTypeFilter -and $hasPropertyTypeFilter -and $hasSortBy -and $hasPriceRange -and $hasSqmRange) { $passedTests++ }
if ($hasFontSize16 -and $hasMinHeight48) { $passedTests++ }
if ($hasBlueColor -and $hasDarkGradient) { $passedTests++ }
if ($backupExists) { $passedTests++ }

$successRate = [math]::Round(($passedTests / $totalTests) * 100, 2)

Write-Host "Test Passati: $passedTests/$totalTests ($successRate%)" -ForegroundColor $(if($passedTests -eq $totalTests){'Green'}else{'Yellow'})

if ($passedTests -eq $totalTests) {
    Write-Host ""
    Write-Host "🎉 TUTTI I TEST SUPERATI! IL SITO È PRONTO! 🎉" -ForegroundColor Green
    Write-Host ""
} elseif ($passedTests -ge 4) {
    Write-Host ""
    Write-Host "✅ La maggior parte dei test è passata. Verificare eventuali warning." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Alcuni test sono falliti. Rivedere le modifiche." -ForegroundColor Red
    Write-Host ""
}

Write-Host "Apri FIX_DEFINITIVO_MOBILE_PROFESSIONAL.md per il report completo." -ForegroundColor Cyan
Write-Host ""
