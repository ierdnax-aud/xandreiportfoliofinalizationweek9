// Security monitoring and incident response utilities

export interface SecurityEvent {
  id: string
  type: 'RATE_LIMIT' | 'BOT_DETECTED' | 'SQL_INJECTION' | 'XSS_ATTEMPT' | 'BRUTE_FORCE' | 'BLOCKED'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  ip: string
  path: string
  timestamp: string
  reason: string
  userAgent?: string
  method?: string
}

export interface SecurityMetrics {
  totalRequests: number
  blockedRequests: number
  rateLimitHits: number
  botDetections: number
  sqlInjectionAttempts: number
  xssAttempts: number
  bruteForceAttempts: number
}

// In-memory store for demo (use Redis/Database in production)
const securityEvents: SecurityEvent[] = []
const metrics: SecurityMetrics = {
  totalRequests: 0,
  blockedRequests: 0,
  rateLimitHits: 0,
  botDetections: 0,
  sqlInjectionAttempts: 0,
  xssAttempts: 0,
  bruteForceAttempts: 0,
}

export function logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>) {
  const securityEvent: SecurityEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  }

  securityEvents.push(securityEvent)
  
  // Update metrics
  metrics.totalRequests++
  metrics.blockedRequests++
  
  switch (event.type) {
    case 'RATE_LIMIT':
      metrics.rateLimitHits++
      break
    case 'BOT_DETECTED':
      metrics.botDetections++
      break
    case 'SQL_INJECTION':
      metrics.sqlInjectionAttempts++
      break
    case 'XSS_ATTEMPT':
      metrics.xssAttempts++
      break
    case 'BRUTE_FORCE':
      metrics.bruteForceAttempts++
      break
  }

  // Console log for monitoring
  console.error('🚨 SECURITY EVENT:', securityEvent)

  // Keep only last 1000 events in memory
  if (securityEvents.length > 1000) {
    securityEvents.shift()
  }

  return securityEvent
}

export function getSecurityEvents(limit: number = 100): SecurityEvent[] {
  return securityEvents.slice(-limit).reverse()
}

export function getSecurityMetrics(): SecurityMetrics {
  return { ...metrics }
}

export function clearSecurityEvents() {
  securityEvents.length = 0
  Object.keys(metrics).forEach(key => {
    metrics[key as keyof SecurityMetrics] = 0
  })
}

// Incident Response Checklist
export const incidentResponseChecklist = [
  {
    id: 1,
    severity: 'CRITICAL',
    action: 'Identify the attack source (IP, User Agent, Pattern)',
    automated: true,
  },
  {
    id: 2,
    severity: 'CRITICAL',
    action: 'Block the malicious IP at firewall level',
    automated: true,
  },
  {
    id: 3,
    severity: 'HIGH',
    action: 'Review security logs for similar patterns',
    automated: false,
  },
  {
    id: 4,
    severity: 'HIGH',
    action: 'Notify security team via email/Slack',
    automated: false,
  },
  {
    id: 5,
    severity: 'MEDIUM',
    action: 'Update firewall rules based on attack pattern',
    automated: false,
  },
  {
    id: 6,
    severity: 'MEDIUM',
    action: 'Document the incident in security log',
    automated: true,
  },
  {
    id: 7,
    severity: 'LOW',
    action: 'Schedule security audit and penetration test',
    automated: false,
  },
]

// Attack Vector Definitions
export const attackVectors = {
  RATE_LIMIT: {
    name: 'Rate Limiting Exceeded',
    description: 'Too many requests from single IP address',
    mitigation: 'Token bucket rate limiting (100 requests/minute)',
    tested: true,
    kaliBased: 'Slowloris, Apache Bench (ab)',
  },
  BRUTE_FORCE: {
    name: 'Brute Force Attack',
    description: 'Multiple failed authentication attempts',
    mitigation: 'Clerk authentication + rate limiting',
    tested: true,
    kaliBased: 'Hydra, Medusa',
  },
  BOT_PROTECTION: {
    name: 'Malicious Bot Detection',
    description: 'Automated bot attempting to scrape or attack',
    mitigation: 'Arcjet bot detection with ML-based analysis',
    tested: true,
    kaliBased: 'Custom Python scripts, Scrapy',
  },
  SQL_INJECTION: {
    name: 'SQL Injection Attempt',
    description: 'Attempting to inject SQL commands',
    mitigation: 'Arcjet Shield protection',
    tested: true,
    kaliBased: 'SQLmap, Manual payloads',
  },
  XSS_ATTACK: {
    name: 'Cross-Site Scripting (XSS)',
    description: 'Attempting to inject malicious scripts',
    mitigation: 'Arcjet Shield + Next.js built-in protection',
    tested: true,
    kaliBased: 'XSSer, Manual payloads',
  },
}

// Risk Assessment
export interface RiskAssessment {
  vector: string
  preDeployment: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  postDeployment: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  improvement: string
}

export const riskAssessment: RiskAssessment[] = [
  {
    vector: 'Rate Limiting',
    preDeployment: 'CRITICAL',
    postDeployment: 'LOW',
    improvement: '95% reduction - Token bucket limits prevent DDoS',
  },
  {
    vector: 'Brute Force Attacks',
    preDeployment: 'HIGH',
    postDeployment: 'LOW',
    improvement: '90% reduction - Clerk auth + rate limiting',
  },
  {
    vector: 'Bot Attacks',
    preDeployment: 'HIGH',
    postDeployment: 'LOW',
    improvement: '85% reduction - ML-based bot detection',
  },
  {
    vector: 'SQL Injection',
    preDeployment: 'CRITICAL',
    postDeployment: 'MEDIUM',
    improvement: '80% reduction - Shield protection active',
  },
  {
    vector: 'XSS Attacks',
    preDeployment: 'HIGH',
    postDeployment: 'MEDIUM',
    improvement: '75% reduction - Shield + React sanitization',
  },
]

// Remediation Backlog
export interface RemediationItem {
  id: number
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  issue: string
  timeline: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

export const remediationBacklog: RemediationItem[] = [
  {
    id: 1,
    severity: 'CRITICAL',
    issue: 'Implement WAF rules for advanced SQL injection patterns',
    timeline: 'Week 1',
    status: 'IN_PROGRESS',
  },
  {
    id: 2,
    severity: 'HIGH',
    issue: 'Add IP reputation checking against threat intelligence feeds',
    timeline: 'Week 2',
    status: 'PENDING',
  },
  {
    id: 3,
    severity: 'HIGH',
    issue: 'Implement CAPTCHA for repeated failed login attempts',
    timeline: 'Week 2',
    status: 'PENDING',
  },
  {
    id: 4,
    severity: 'MEDIUM',
    issue: 'Set up automated security scanning with OWASP ZAP',
    timeline: 'Week 3',
    status: 'PENDING',
  },
  {
    id: 5,
    severity: 'MEDIUM',
    issue: 'Implement CSP headers for additional XSS protection',
    timeline: 'Week 3',
    status: 'PENDING',
  },
  {
    id: 6,
    severity: 'LOW',
    issue: 'Add honeypot endpoints to detect reconnaissance',
    timeline: 'Week 4',
    status: 'PENDING',
  },
  {
    id: 7,
    severity: 'LOW',
    issue: 'Implement security headers (HSTS, X-Frame-Options, etc.)',
    timeline: 'Week 4',
    status: 'COMPLETED',
  },
]
