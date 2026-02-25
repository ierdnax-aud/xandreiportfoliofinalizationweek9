$uri = "https://xandreiportfoliofinalizationweek9.vercel.app/api/security"

Write-Host ""
Write-Host "🚨 SECURITY EVENT SIMULATOR - Portfolio Dashboard" -ForegroundColor DarkRed
Write-Host "========================================" -ForegroundColor DarkRed
Write-Host ""

# SQL Injection attacks
$e1 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="192.168.1.100"; path="/api/users"; reason="SQL: OR 1=1"; userAgent="Mozilla"; method="GET"}
$e2 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="203.45.120.55"; path="/api/products"; reason="SQL: UNION SELECT"; userAgent="sqlmap"; method="GET"}
$e3 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="185.220.100.10"; path="/api/login"; reason="SQL: DROP TABLE"; userAgent="curl"; method="POST"}

# XSS attacks
$e4 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="10.0.0.50"; path="/api/comments"; reason="XSS: script"; userAgent="xssser"; method="POST"}
$e5 = @{type="XSS_ATTEMPT"; severity="MEDIUM"; ip="172.16.0.30"; path="/api/profile"; reason="XSS: onerror"; userAgent="Mozilla"; method="GET"}

# Brute Force attacks
$e6 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="198.51.100.5"; path="/api/auth/login"; reason="Failed logins"; userAgent="hydra"; method="POST"}
$e7 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="203.0.113.8"; path="/admin/login"; reason="15 failures"; userAgent="curl"; method="POST"}

# Rate Limit
$e8 = @{type="RATE_LIMIT"; severity="MEDIUM"; ip="192.0.2.100"; path="/api/search"; reason="500 req/min"; userAgent="ab"; method="GET"}

# Bot Detection
$e9 = @{type="BOT_DETECTED"; severity="LOW"; ip="203.113.45.20"; path="/api/data"; reason="Automated bot"; userAgent="python-requests"; method="GET"}
$e10 = @{type="BOT_DETECTED"; severity="LOW"; ip="198.18.25.10"; path="/"; reason="Suspicious pattern"; userAgent="scrapy"; method="GET"}

$all = $e1, $e2, $e3, $e4, $e5, $e6, $e7, $e8, $e9, $e10

Write-Host "📤 Inserting events..." -ForegroundColor Cyan

foreach ($event in $all) {
    $body = $event | ConvertTo-Json
    $result = Invoke-RestMethod -Method Post -Uri $uri -ContentType "application/json" -Body $body
    Write-Host ("   ✓ Inserted: {0}" -f $event.type)
}

Write-Host ""
Write-Host "=== SECURITY METRICS ===" -ForegroundColor Green
$metrics = Invoke-RestMethod -Uri ($uri + "?type=metrics")
Write-Host ("├─ Total Requests: {0}" -f $metrics.totalRequests)
Write-Host ("├─ Blocked Requests: {0}" -f $metrics.blockedRequests)
Write-Host ("├─ SQL Injection Attempts: {0}" -f $metrics.sqlInjectionAttempts) -ForegroundColor Red
Write-Host ("├─ XSS Attempts: {0}" -f $metrics.xssAttempts) -ForegroundColor Yellow
Write-Host ("├─ Brute Force Attempts: {0}" -f $metrics.bruteForceAttempts) -ForegroundColor DarkYellow
Write-Host ("├─ Rate Limit Hits: {0}" -f $metrics.rateLimitHits) -ForegroundColor Blue
Write-Host ("└─ Bot Detections: {0}" -f $metrics.botDetections) -ForegroundColor Magenta
Write-Host ""
Write-Host "✓ Dashboard updated with attack distribution data" -ForegroundColor Green
