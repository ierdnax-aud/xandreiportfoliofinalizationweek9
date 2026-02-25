$uri = "https://xandreiportfoliofinalizationweek9.vercel.app/api/security"

Write-Host ""
Write-Host "🚨 ADVANCED SECURITY ATTACK SIMULATOR - Full Threat Scenario" -ForegroundColor DarkRed
Write-Host "============================================================" -ForegroundColor DarkRed
Write-Host ""

# ==================== SQL INJECTION ATTACKS ====================
Write-Host "[1/5] SQL Injection Attacks (8 events)" -ForegroundColor Red

$e1 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="192.168.1.100"; path="/api/users"; reason="SQL: OR 1=1"; userAgent="Mozilla"; method="GET"}
$e2 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="203.45.120.55"; path="/api/products"; reason="SQL: UNION SELECT"; userAgent="sqlmap"; method="GET"}
$e3 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="185.220.100.10"; path="/api/login"; reason="SQL: DROP TABLE users"; userAgent="curl"; method="POST"}
$e4 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="91.199.45.22"; path="/api/admin/users"; reason="SQL: '; EXEC sp_MSForEachTable"; userAgent="nikto"; method="POST"}
$e5 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="176.32.89.123"; path="/api/db/backup"; reason="SQL: * FROM information_schema.TABLES"; userAgent="sqlmap"; method="GET"}
$e6 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="89.163.128.55"; path="/api/auth/verify"; reason="SQL: WAITFOR DELAY '00:00:05'"; userAgent="curl"; method="POST"}
$e7 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="104.21.12.45"; path="/api/search"; reason="SQL: CAST(CAST((SELECT * FROM users) AS SIGNED))"; userAgent="MetaSploit"; method="GET"}
$e8 = @{type="SQL_INJECTION"; severity="CRITICAL"; ip="162.125.18.133"; path="/api/reports"; reason="SQL: eval(base64_decode())"; userAgent="sqlmap"; method="POST"}

# ==================== XSS ATTACKS ====================
Write-Host "[2/5] XSS Attacks (6 events)" -ForegroundColor Yellow

$e9 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="10.0.0.50"; path="/api/comments"; reason="XSS: <script>alert(1)</script>"; userAgent="xssser"; method="POST"}
$e10 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="172.16.0.30"; path="/api/profile"; reason="XSS: onerror=fetch('https://attacker.com')"; userAgent="Mozilla"; method="GET"}
$e11 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="195.154.0.100"; path="/api/posts"; reason="XSS: img tag with onerror handler"; userAgent="BeEF"; method="POST"}
$e12 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="31.13.195.60"; path="/api/review"; reason="XSS: javascript eval injection"; userAgent="curl"; method="GET"}
$e13 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="149.154.167.100"; path="/api/message"; reason="XSS: UTF-7: +ADw-script+AD4-alert(1)+ADw-/script+AD4-"; userAgent="xssser"; method="POST"}
$e14 = @{type="XSS_ATTEMPT"; severity="HIGH"; ip="216.58.194.35"; path="/api/feedback"; reason="XSS: SVG onload vector"; userAgent="Mozilla"; method="POST"}

# ==================== BRUTE FORCE ATTACKS ====================
Write-Host "[3/5] Brute Force Attacks (8 events)" -ForegroundColor DarkYellow

$e15 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="198.51.100.5"; path="/api/auth/login"; reason="Failed logins: 25 attempts"; userAgent="hydra"; method="POST"}
$e16 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="203.0.113.8"; path="/admin/login"; reason="Failed logins: 50 attempts"; userAgent="medusa"; method="POST"}
$e17 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="192.0.2.50"; path="/api/auth/ssh"; reason="SSH Brute Force: 100 attempts"; userAgent="paramiko"; method="POST"}
$e18 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="198.18.0.100"; path="/api/vault/unlock"; reason="Unlock attempts: 15 failures"; userAgent="curl"; method="POST"}
$e19 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="205.185.120.45"; path="/api/2fa/bypass"; reason="2FA bypass: 30 attempts"; userAgent="John"; method="POST"}
$e20 = @{type="BRUTE_FORCE"; severity="HIGH"; ip="162.142.125.60"; path="/api/password/reset"; reason="Password reset abuse: 40 failures"; userAgent="curl"; method="POST"}
$e21 = @{type="BRUTE_FORCE"; severity="CRITICAL"; ip="91.210.12.1"; path="/api/admin/panel"; reason="Admin panel: 75 attempts"; userAgent="Hashcat"; method="POST"}
$e22 = @{type="BRUTE_FORCE"; severity="CRITICAL"; ip="185.220.100.200"; path="/api/database/credentials"; reason="DB credential attack: 120 attempts"; userAgent="custom-bot"; method="POST"}

# ==================== RATE LIMIT VIOLATIONS ====================
Write-Host "[4/5] Rate Limiting Violations (7 events)" -ForegroundColor Blue

$e23 = @{type="RATE_LIMIT"; severity="MEDIUM"; ip="192.0.2.100"; path="/api/search"; reason="1000 req/min"; userAgent="ab"; method="GET"}
$e24 = @{type="RATE_LIMIT"; severity="MEDIUM"; ip="198.51.100.200"; path="/api/list"; reason="2500 req/min"; userAgent="ApacheBench"; method="GET"}
$e25 = @{type="RATE_LIMIT"; severity="HIGH"; ip="203.0.113.100"; path="/api/download"; reason="5000 req/min"; userAgent="wget"; method="GET"}
$e26 = @{type="RATE_LIMIT"; severity="HIGH"; ip="192.168.100.50"; path="/api/export"; reason="10000 req/min - DDoS pattern"; userAgent="custom-flooder"; method="GET"}
$e27 = @{type="RATE_LIMIT"; severity="CRITICAL"; ip="185.220.101.1"; path="/api/*"; reason="20000 req/min - Distributed attack"; userAgent="botnet"; method="GET"}
$e28 = @{type="RATE_LIMIT"; severity="CRITICAL"; ip="91.243.55.10"; path="/api/";reason="Sustained: 100k+ combined requests"; userAgent="amplification"; method="GET"}
$e29 = @{type="RATE_LIMIT"; severity="CRITICAL"; ip="104.16.0.1"; path="/api/critical"; reason="Resource exhaustion attempt"; userAgent="stress-test"; method="POST"}

# ==================== BOT & AUTOMATED ATTACKS ====================
Write-Host "[5/5] Bot Detection & Automated Attacks (6 events)" -ForegroundColor Magenta

$e30 = @{type="BOT_DETECTED"; severity="LOW"; ip="203.113.45.20"; path="/api/data"; reason="Automated bot - Web crawler"; userAgent="python-requests"; method="GET"}
$e31 = @{type="BOT_DETECTED"; severity="MEDIUM"; ip="198.18.25.10"; path="/"; reason="Suspicious pattern - Scrapy"; userAgent="scrapy"; method="GET"}
$e32 = @{type="BOT_DETECTED"; severity="MEDIUM"; ip="185.244.38.1"; path="/api/prices"; reason="Price scraping bot detected"; userAgent="Googlebot-fake"; method="GET"}
$e33 = @{type="BOT_DETECTED"; severity="HIGH"; ip="162.142.125.1"; path="/api/emails"; reason="Email harvesting bot"; userAgent="custom-harvester"; method="GET"}
$e34 = @{type="BOT_DETECTED"; severity="HIGH"; ip="5.188.86.1"; path="/api/credentials"; reason="Credential stuffing bot"; userAgent="credential-checker"; method="POST"}
$e35 = @{type="BOT_DETECTED"; severity="CRITICAL"; ip="195.2.75.1"; path="/admin"; reason="Malicious botnet - Advanced scanning"; userAgent="masscan/1.0"; method="GET"}

# ==================== COMPILE ALL EVENTS ====================
$all = $e1, $e2, $e3, $e4, $e5, $e6, $e7, $e8, $e9, $e10, $e11, $e12, $e13, $e14, $e15, $e16, $e17, $e18, $e19, $e20, $e21, $e22, $e23, $e24, $e25, $e26, $e27, $e28, $e29, $e30, $e31, $e32, $e33, $e34, $e35

Write-Host ""
Write-Host "📤 Injecting $(($all).Count) attack events into dashboard..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
foreach ($event in $all) {
    try {
        $body = $event | ConvertTo-Json
        $result = Invoke-RestMethod -Method Post -Uri $uri -ContentType "application/json" -Body $body -ErrorAction Stop
        Write-Host ("   ✓ Inserted: {0,-20} | IP: {1,-18} | Severity: {2}" -f $event.type, $event.ip, $event.severity)
        $successCount++
    } catch {
        Write-Host ("   ✗ Failed: {0}" -f $event.type) -ForegroundColor Red
    }
    Start-Sleep -Milliseconds 50
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "=== COMPREHENSIVE SECURITY METRICS ===" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

try {
    $metrics = Invoke-RestMethod -Uri ($uri + "?type=metrics")
    
    Write-Host ""
    Write-Host "📊 DASHBOARD SUMMARY:" -ForegroundColor Cyan
    Write-Host ("├─ Total Events Injected:          {0}" -f $successCount) -ForegroundColor White
    Write-Host ("├─ Total Requests Recorded:        {0}" -f $metrics.totalRequests) -ForegroundColor Cyan
    Write-Host ("├─ Blocked Requests:               {0}" -f $metrics.blockedRequests) -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🎯 ATTACK BREAKDOWN:" -ForegroundColor Cyan
    Write-Host ("├─ SQL Injection Attempts:         {0}" -f $metrics.sqlInjectionAttempts) -ForegroundColor Red
    Write-Host ("├─ XSS Attempts:                   {0}" -f $metrics.xssAttempts) -ForegroundColor Yellow
    Write-Host ("├─ Brute Force Attempts:           {0}" -f $metrics.bruteForceAttempts) -ForegroundColor DarkYellow
    Write-Host ("├─ Rate Limit Violations:          {0}" -f $metrics.rateLimitHits) -ForegroundColor Blue
    Write-Host ("└─ Bot Detections:                 {0}" -f $metrics.botDetections) -ForegroundColor Magenta
    Write-Host ""
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "✅ Dashboard fully populated with realistic attack scenarios!" -ForegroundColor Green
    Write-Host "✅ All attack types now visible in Attack Types Distribution chart" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Visit your dashboard to see the comprehensive security analytics:" -ForegroundColor Cyan
    Write-Host "   https://xandreiportfoliofinalizationweek9.vercel.app/security-analytics" -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host "⚠️  Could not retrieve metrics" -ForegroundColor Yellow
}
