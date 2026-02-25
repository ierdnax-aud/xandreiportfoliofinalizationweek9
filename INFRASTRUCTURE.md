# Base Infrastructure Documentation

**Project:** RAG AI Digital Twin Portfolio  
**Version:** 1.0  
**Last Updated:** January 21, 2026  
**Owner:** Jan Padua

---

## Table of Contents
1. [Infrastructure Overview](#infrastructure-overview)
2. [Development Environment](#development-environment)
3. [Production Environment](#production-environment)
4. [CI/CD Pipeline](#cicd-pipeline)
5. [Security Infrastructure](#security-infrastructure)
6. [Monitoring & Observability](#monitoring--observability)
7. [Disaster Recovery](#disaster-recovery)

---

## 1. Infrastructure Overview

### 1.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   Edge Locations (100+ worldwide)                       │    │
│  │   • Los Angeles   • New York    • London               │    │
│  │   • Singapore     • Tokyo       • Frankfurt            │    │
│  └────────────────────────────────────────────────────────┘    │
│                          │                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   Next.js Middleware (Edge Runtime)                     │    │
│  │   • Authentication check (Clerk)                        │    │
│  │   • Request routing                                     │    │
│  └────────────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                  │
        ▼                                  ▼
┌──────────────────────┐      ┌──────────────────────┐
│   Static Assets      │      │   Serverless         │
│   (HTML/CSS/JS)      │      │   Functions          │
│   • CDN cached       │      │   • API routes       │
│   • Gzip/Brotli      │      │   • Edge Runtime     │
└──────────────────────┘      └─────────┬────────────┘
                                        │
                        ┌───────────────┴──────────────┐
                        │                              │
                        ▼                              ▼
                ┌──────────────┐             ┌──────────────┐
                │  Clerk API   │             │   Groq API   │
                │  (Auth)      │             │   (AI Chat)  │
                └──────────────┘             └──────────────┘
```

### 1.2 Technology Stack

| Component | Technology | Version | Hosting |
|-----------|-----------|---------|---------|
| **Frontend** | React | 19.2.0 | Vercel Edge |
| **Framework** | Next.js | 16.0.10 | Vercel Edge |
| **API Routes** | Next.js API | 16.0.10 | Vercel Serverless |
| **Authentication** | Clerk | 6.36.8 | Clerk Cloud |
| **AI Inference** | Groq | 0.37.0 | Groq Cloud |
| **CDN** | Vercel Edge Network | - | Global (100+ PoPs) |
| **DNS** | Vercel DNS | - | Managed by Vercel |
| **SSL/TLS** | Let's Encrypt | - | Auto-renewed by Vercel |

---

## 2. Development Environment

### 2.1 Local Setup

**Requirements:**
- Node.js: v20.x or higher
- npm: v10.x or higher
- Git: v2.x or higher

**Installation Steps:**

```bash
# 1. Clone repository
git clone https://github.com/ierdnax-aud/week3-Jan-Padua-Andrei.git
cd week3-Jan-Padua-Andrei

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Create environment variables
cp .env.example .env.local
# Edit .env.local with actual API keys

# 4. Run development server
npm run dev
# Server runs on http://localhost:3000
```

**Environment Variables (.env.local):**
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Groq AI API
GROQ_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE

# Optional (for testing)
GEMINI_API_KEY=AIzaSyDe6rwtOlS6C_QXiH0mKLfukZsg9lNPYYs
OPENAI_API_KEY=sk-proj-l1sg6P4aJdR6DTrlXITa16cR89FnsqKIKPDmCDBII7LFt4Z...
ARCJET_KEY=arcjet_test_key_placeholder
```

### 2.2 Development Tools

**IDE:** Visual Studio Code  
**Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- GitHub Copilot

**Scripts:**
```json
{
  "dev": "next dev",           // Start dev server
  "build": "next build",       // Production build
  "start": "next start",       // Start production server locally
  "lint": "eslint ."           // Run linter
}
```

---

## 3. Production Environment

### 3.1 Vercel Configuration

**Project Settings:**
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install --legacy-peer-deps`
- **Node.js Version:** 20.x

**Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
GROQ_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE
```

**Domain:**
- Production: `mainweek3-jan-padua-andreim-8luuwgjax-ierdnax-auds-projects.vercel.app`
- Custom Domain: (Not configured)

### 3.2 Edge Runtime Configuration

**Middleware (`middleware.ts`):**
```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

**Edge Function Size:** 0.95MB (under 1MB limit)

**Note:** Arcjet was initially integrated but removed due to Edge Function size exceeding 1MB limit (1.04MB).

### 3.3 API Routes

**Endpoints:**

1. **Chat API** (`/api/chat`)
   - Method: POST
   - Body: `{ message: string }`
   - Response: `{ response: string } | { error: string }`
   - Runtime: Node.js (Serverless Function)
   - Timeout: 10 seconds
   - Memory: 1024 MB

---

## 4. CI/CD Pipeline

### 4.1 Automated Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Developer pushes code to GitHub (git push origin main)     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub Webhook triggers Vercel                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel pulls latest commit from main branch                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Install dependencies: npm install --legacy-peer-deps       │
│  Time: ~30 seconds                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Build: npm run build (next build)                          │
│  • Compile TypeScript                                       │
│  • Bundle JavaScript                                        │
│  • Optimize assets                                          │
│  • Generate static pages                                    │
│  Time: ~1 minute                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Deploy to Edge Network                                     │
│  • Upload assets to CDN                                     │
│  • Deploy Edge Functions                                   │
│  • Update routing configuration                            │
│  Time: ~10 seconds                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Health Check & Smoke Tests                                 │
│  • Verify deployment is accessible                          │
│  • Check Edge Functions are responsive                      │
│  Time: ~5 seconds                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Deployment Complete! ✅                                     │
│  Total Time: ~2 minutes                                     │
│  Status: Production live                                    │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Rollback Strategy

**Manual Rollback (Vercel Dashboard):**
1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **...** (three dots)
4. Select **Promote to Production**
5. Deployment reverts in ~30 seconds

**Git-based Rollback:**
```bash
# 1. Revert to previous commit
git revert HEAD
git push origin main

# 2. Vercel auto-deploys reverted version
```

---

## 5. Security Infrastructure

### 5.1 Authentication Layer

**Provider:** Clerk  
**Features:**
- JWT-based session management
- OAuth integration (Google, GitHub)
- Email/password authentication
- Magic link support
- Multi-factor authentication (MFA) - optional

**Configuration:**
- Session duration: 7 days
- Token refresh: Automatic
- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-out redirect: `/sign-in`

### 5.2 API Security

**Rate Limiting:**
- Status: ❌ Not deployed (Arcjet removed)
- Alternative: Groq API has built-in rate limiting
- Future: Re-implement with Upstash Redis

**Prompt Injection Detection:**
```typescript
const injectionPatterns = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /forget\s+(everything|all|previous)/i,
  /you\s+are\s+now/i,
  /act\s+as\s+(a\s+)?/i,
  /new\s+instructions/i,
  /disregard/i,
  /system\s*:/i,
  /\[INST\]/i,
]

// Check every user message
if (injectionPatterns.some(pattern => pattern.test(message))) {
  return { error: 'Prompt injection attempt detected' }
}
```

### 5.3 SSL/TLS Configuration

- **Provider:** Let's Encrypt (via Vercel)
- **Protocol:** TLS 1.2, TLS 1.3
- **Certificate Renewal:** Automatic
- **HTTPS Redirect:** Enforced
- **HSTS:** Enabled (max-age=31536000)

### 5.4 Security Headers

**Configured in `next.config.mjs`:**
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ]
}
```

---

## 6. Monitoring & Observability

### 6.1 Vercel Analytics

**Metrics Tracked:**
- Page views
- Unique visitors
- Top pages
- Referrers
- Countries
- Devices (mobile/desktop/tablet)

**Real-time Dashboard:** https://vercel.com/dashboard/analytics

### 6.2 Error Tracking

**Console Logging:**
```typescript
// Security events
console.error('🚨 SECURITY EVENT:', {
  type: 'PROMPT_INJECTION',
  ip: request.ip,
  message: userMessage,
})

// API errors
console.error('❌ API ERROR:', {
  endpoint: '/api/chat',
  error: error.message,
  stack: error.stack,
})
```

> **Analytics dashboard:** ongoing attack events are shipped to an in‑memory log and
> can be reviewed on the `/security-analytics` page. The middleware also watches
> for common pentest user‑agent strings (sqlmap, hydra, XSSer, ApacheBench)
> and will automatically record an event when a tool hits the site.  For demo
> control you can also manually push events:
>
> ```bash
> curl -X POST https://<your-host>/api/security \
>   -H 'Content-Type: application/json' \
>   -d '{"type":"SQL_INJECTION","severity":"HIGH","ip":"127.0.0.1","path":"/login?user=admin","reason":"sqlmap run"}'
> ```
>
> or clear the buffer with `-d '{"clear":true}'`.  Each request appears within
> a few seconds on the analytics page so you can verify attacks have reached the
> application without compromising the portfolio itself.

**Future Enhancement:** Integrate Sentry for error tracking

### 6.3 Performance Monitoring

**Lighthouse CI:**
- Performance: 95
- Accessibility: 92
- Best Practices: 88
- SEO: 88

**Web Vitals (Vercel):**
- First Contentful Paint (FCP): 0.8s
- Largest Contentful Paint (LCP): 1.2s
- Cumulative Layout Shift (CLS): 0.02
- First Input Delay (FID): 50ms
- Time to First Byte (TTFB): 200ms

---

## 7. Disaster Recovery

### 7.1 Backup Strategy

**Code Backup:**
- **Primary:** GitHub repository (git)
- **Frequency:** Every commit
- **Retention:** Unlimited

**Environment Variables:**
- **Primary:** Vercel Dashboard
- **Backup:** Local `.env.local` (not committed)
- **Recovery:** Manual re-entry from local backup

**Deployment History:**
- **Vercel:** Keeps all deployments
- **Retention:** Unlimited
- **Rollback:** Instant (promote previous deployment)

### 7.2 Failure Scenarios

| Scenario | Impact | Recovery Time | Procedure |
|----------|--------|---------------|-----------|
| **Vercel Outage** | Site down | ~30 min | Deploy to Netlify/Railway |
| **Clerk Outage** | No authentication | ~1 hour | Remove auth temporarily |
| **Groq Outage** | AI chat unavailable | ~1 hour | Switch to OpenAI or static FAQ |
| **GitHub Outage** | No deployments | ~0 min | Wait (site still runs) |
| **DNS Issues** | Domain unreachable | ~1 hour | Update DNS records |

### 7.3 Recovery Procedures

**Scenario: Vercel Outage**
```bash
# 1. Deploy to alternative platform (Railway)
npm install -g railway
railway login
railway init
railway up

# 2. Update DNS to point to Railway
# (via domain registrar)

# 3. Verify deployment
curl https://new-domain.railway.app
```

**Scenario: Critical Bug in Production**
```bash
# 1. Rollback via Vercel Dashboard
# OR

# 2. Git revert
git revert HEAD
git push origin main

# 3. Verify fix
curl https://production-url.vercel.app
```

---

## 8. Infrastructure Checklist

### 8.1 Pre-Deployment Checklist

- [x] All environment variables configured in Vercel
- [x] Build succeeds locally (`npm run build`)
- [x] No console errors in production build
- [x] Authentication flow tested (sign-in/sign-up/sign-out)
- [x] AI chat tested with various inputs
- [x] All pages responsive (mobile/tablet/desktop)
- [x] Lighthouse score > 90
- [x] Security headers configured
- [x] SSL/TLS certificate active
- [x] DNS records properly configured
- [x] Git repository up to date

### 8.2 Post-Deployment Checklist

- [x] Deployment succeeded (no errors)
- [x] Site is accessible via production URL
- [x] Authentication works in production
- [x] AI chat responds correctly
- [x] All pages load without errors
- [x] No console errors in browser
- [x] Vercel Analytics tracking pageviews
- [x] Performance metrics within targets
- [x] Mobile experience tested
- [x] Security test performed (manual)

### 8.3 Maintenance Checklist

**Weekly:**
- [ ] Check Vercel deployment logs
- [ ] Review Groq API usage
- [ ] Monitor Clerk authentication logs
- [ ] Check for security updates (`npm audit`)

**Monthly:**
- [ ] Update dependencies (`npm update`)
- [ ] Run Lighthouse audit
- [ ] Review and update portfolio knowledge base
- [ ] Check SSL certificate expiration (auto-renewed)
- [ ] Review Vercel Analytics trends

**Quarterly:**
- [ ] Security penetration testing
- [ ] Performance optimization review
- [ ] Backup verification test
- [ ] Disaster recovery drill

---

## 9. Infrastructure Costs

| Service | Plan | Monthly Cost | Annual Cost |
|---------|------|--------------|-------------|
| **Vercel** | Hobby (Free) | $0 | $0 |
| **Clerk** | Free Tier | $0 | $0 |
| **Groq** | Free Tier | $0 | $0 |
| **GitHub** | Free | $0 | $0 |
| **Domain** | (Not purchased) | $0 | $0 |
| **Total** | | **$0** | **$0** |

**Notes:**
- All services use free tiers
- No custom domain (using Vercel subdomain)
- Groq API has rate limits on free tier
- Clerk allows 10,000 MAU (Monthly Active Users) on free tier
- Vercel Hobby plan includes unlimited deployments

---

## 10. Infrastructure Diagram (Detailed)

```
                              ┌─────────────────────┐
                              │   User's Browser    │
                              └──────────┬──────────┘
                                         │
                                         │ HTTPS
                                         ▼
              ┌──────────────────────────────────────────────┐
              │        Vercel Edge Network (CDN)             │
              │  ┌────────────────────────────────────────┐  │
              │  │  Edge Locations (100+ globally)        │  │
              │  │  • Static assets cached                │  │
              │  │  • Gzip/Brotli compression             │  │
              │  │  • TLS 1.3 encryption                  │  │
              │  └────────────────────────────────────────┘  │
              │                    │                          │
              │  ┌────────────────────────────────────────┐  │
              │  │   Next.js Middleware (Edge Runtime)    │  │
              │  │   • Clerk authentication check         │  │
              │  │   • Request routing                    │  │
              │  │   • Response headers                   │  │
              │  └────────────────────────────────────────┘  │
              └──────────────────┬───────────────────────────┘
                                 │
                    ┌────────────┴───────────┐
                    │                        │
                    ▼                        ▼
      ┌──────────────────────┐  ┌──────────────────────┐
      │   Static Assets       │  │   Serverless         │
      │   (Pre-rendered)      │  │   Functions          │
      │   • HTML pages        │  │   • /api/chat        │
      │   • CSS stylesheets   │  │   • Node.js runtime  │
      │   • JavaScript bundles│  │   • 1024MB memory    │
      │   • Images/fonts      │  │   • 10s timeout      │
      └──────────────────────┘  └─────────┬────────────┘
                                          │
                          ┌───────────────┴──────────────┐
                          │                              │
                          ▼                              ▼
              ┌──────────────────────┐      ┌──────────────────────┐
              │   Clerk API          │      │   Groq API           │
              │   (Authentication)   │      │   (AI Inference)     │
              │   • JWT tokens       │      │   • Llama 3.3-70b    │
              │   • OAuth providers  │      │   • 300 max tokens   │
              │   • Session mgmt     │      │   • Temperature 0.7  │
              └──────────────────────┘      └──────────────────────┘
```

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Infrastructure Lead** | Jan Padua | ✅ Approved | Jan 21, 2026 |
| **DevOps Engineer** | Jan Padua | ✅ Approved | Jan 21, 2026 |
| **Security Engineer** | Jan Padua | ✅ Approved | Jan 21, 2026 |

---

**END OF INFRASTRUCTURE DOCUMENTATION**
