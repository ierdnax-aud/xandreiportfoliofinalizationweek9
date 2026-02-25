# Design Document: RAG AI Digital Twin Portfolio

**Project:** Jan Padua's Interactive AI-Enhanced Portfolio  
**Version:** 1.0  
**Date:** January 21, 2026  
**Author:** Jan Padua (BSIT 4th Year, SPUP)

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Component Design](#component-design)
4. [Data Flow](#data-flow)
5. [Security Design](#security-design)
6. [AI/ML Design](#aiml-design)
7. [UI/UX Design](#uiux-design)
8. [API Design](#api-design)
9. [Database Schema](#database-schema)
10. [Deployment Architecture](#deployment-architecture)

---

## 1. Executive Summary

### 1.1 Project Vision
An AI-powered digital twin portfolio that acts as an intelligent assistant for recruiters, interviewers, and visitors. The system uses Retrieval-Augmented Generation (RAG) to answer questions about Jan Padua's skills, education, projects, and experience in a conversational manner.

### 1.2 Key Features
- **Authentication**: Clerk-based authentication for secure access
- **RAG AI Chatbot**: Groq-powered conversational interface
- **Security Dashboard**: Real-time threat monitoring and penetration test results
- **Portfolio Showcase**: Interactive sections (Education, Skills, Events, Certificates)
- **Edge Deployment**: Vercel Edge Functions for global low-latency access

### 1.3 Technology Stack
| Layer | Technology | Version | Justification |
|-------|-----------|---------|---------------|
| **Frontend** | React | 19.2.0 | Latest stable with concurrent features |
| **Framework** | Next.js | 16.0.10 | App Router, RSC, Edge Runtime support |
| **Styling** | Tailwind CSS | 4.1.9 | Utility-first, rapid development |
| **Authentication** | Clerk | 6.36.8 | Enterprise-grade auth with JWT |
| **AI/ML** | Groq | 0.37.0 | Fast inference (llama-3.3-70b-versatile) |
| **Security** | Arcjet | 1.0.0-beta.17 | Bot detection, rate limiting, Shield |
| **Deployment** | Vercel | - | Edge network, automatic CI/CD |
| **Analytics** | Vercel Analytics | 1.3.1 | Real-time visitor insights |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK (CDN)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Next.js Middleware (Auth Check)              │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│  Static      │  │  Server-Side      │
│  Assets      │  │  Rendering (RSC)  │
│  (HTML/CSS)  │  │                   │
└──────────────┘  └─────────┬─────────┘
                            │
                ┌───────────┴──────────┐
                │                      │
                ▼                      ▼
        ┌──────────────┐      ┌──────────────┐
        │   Clerk      │      │   Groq API   │
        │   Auth API   │      │   (AI Chat)  │
        └──────────────┘      └──────────────┘
```

### 2.2 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
│              ierdnax-aud/week3-Jan-Padua-Andrei             │
└────────────────┬────────────────────────────────────────────┘
                 │ (git push)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  Vercel CI/CD Pipeline                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Build (next build)                               │   │
│  │  2. Optimize (Edge Function bundling)                │   │
│  │  3. Deploy (Edge Network distribution)               │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Production Environment                          │
│  • Domain: mainweek3-jan-padua-andreim-*.vercel.app        │
│  • Edge Locations: Global (100+ locations)                  │
│  • Environment Variables: Clerk, Groq API keys              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Component Design

### 3.1 Frontend Components

#### 3.1.1 Navigation Component
**File:** `components/navigation.tsx`

```typescript
interface NavigationProps {
  // No props - uses usePathname() hook
}

Features:
- Client-side routing with Next.js Link
- Active state highlighting
- Responsive design (mobile/desktop)
- SignOut button integration
```

#### 3.1.2 AI Chat Widget
**File:** `components/ai-chat.tsx`

```typescript
interface AIChatProps {
  // No props - stateful component
}

State Management:
- messages: Message[] (conversation history)
- input: string (user input)
- isLoading: boolean (API call state)
- showQuickQuestions: boolean (first-time UX)

API Integration:
- POST /api/chat
- Streaming responses (optional)
- Error handling with retry
```

#### 3.1.3 Security Dashboard
**File:** `app/security/page.tsx`

```typescript
Features:
- Real-time security metrics (from lib/security.ts)
- Attack vector visualization
- Risk assessment table
- Incident response checklist
- Kali Linux test results
```

### 3.2 Backend APIs

#### 3.2.1 Chat API Endpoint
**File:** `app/api/chat/route.ts`

```typescript
POST /api/chat
Request Body:
{
  "message": string // User question
}

Response:
{
  "response": string // AI-generated answer
}

Processing Pipeline:
1. Validate request (check auth, rate limit)
2. Detect prompt injection (8 patterns)
3. Build context (system prompt + portfolio knowledge)
4. Call Groq API (llama-3.3-70b-versatile, max 300 tokens)
5. Format response (bullet points, professional tone)
6. Return JSON
```

---

## 4. Data Flow

### 4.1 Authentication Flow

```
User visits site
    │
    ▼
Middleware checks auth
    │
    ├─── Authenticated? ──► Allow access
    │                       │
    │                       ▼
    │                   Page renders
    │
    └─── Not authenticated? ──► Redirect to /sign-in
                                │
                                ▼
                            Clerk login UI
                                │
                                ▼
                            Sign in (OAuth/Email)
                                │
                                ▼
                            JWT token stored
                                │
                                ▼
                            Redirect to home
```

### 4.2 AI Chat Flow

```
User types question
    │
    ▼
Click "Send"
    │
    ▼
POST /api/chat {"message": "What are Jan's skills?"}
    │
    ▼
Backend validation
    │
    ├─── Prompt injection detected? ──► Return error
    │
    └─── Clean? ──► Continue
                    │
                    ▼
                Build prompt:
                - System prompt (formatting rules)
                - Portfolio knowledge (skills, education, etc.)
                - User question
                    │
                    ▼
                Groq API call
                    │
                    ▼
                Response received
                    │
                    ▼
                Format with bullet points
                    │
                    ▼
                Return to frontend
                    │
                    ▼
                Display in chat widget
```

---

## 5. Security Design

### 5.1 Security Layers

| Layer | Technology | Protection |
|-------|-----------|------------|
| **1. Network** | Vercel Edge | DDoS mitigation, geo-filtering |
| **2. Application** | Clerk Middleware | Authentication, session management |
| **3. API** | Custom validation | Prompt injection detection (8 patterns) |
| **4. Rate Limiting** | Arcjet (removed) | 100 req/min per IP |
| **5. Bot Protection** | Arcjet (removed) | ML-based bot detection |
| **6. Injection Protection** | Arcjet Shield (removed) | SQL/XSS blocking |

**Note:** Arcjet was removed from middleware due to Vercel Edge Function 1MB size limit. Page-level authentication implemented instead.

### 5.2 Prompt Injection Detection

**File:** `app/api/chat/route.ts`

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

Detection Logic:
- Check user message against all patterns
- If match found, return error
- Log security event
- Block response generation
```

### 5.3 Authentication Implementation

**Middleware:** `middleware.ts` (Basic - no custom auth due to Edge Function errors)

**Page-Level Protection:** 
```typescript
// app/page.tsx, app/about/page.tsx, app/security/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  // Page content...
}
```

---

## 6. AI/ML Design

### 6.1 RAG Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Question                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│         Prompt Injection Detection (8 patterns)          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│          Knowledge Retrieval (Static JSON)               │
│  • Personal info (name, location, email)                 │
│  • Education (SPUP, BSIT 4th year)                       │
│  • Skills (React, Next.js, TypeScript, etc.)             │
│  • Events (5 events from 2023-2025)                      │
│  • Projects (Beaconet, etc.)                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Context Building (Prompt Assembly)          │
│  System Prompt:                                          │
│  "You are Jan Padua's AI assistant. Format responses     │
│   with bullet points. Answer only about portfolio info.  │
│   Bilingual support (Filipino/English)."                 │
│                                                           │
│  Portfolio Knowledge: [JSON data]                        │
│  User Question: [User input]                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│               Groq API Call (LLM Inference)              │
│  Model: llama-3.3-70b-versatile                          │
│  Max Tokens: 300 (for fast responses)                    │
│  Temperature: 0.7 (balanced creativity)                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│               Response Formatting                        │
│  • Add bullet points                                     │
│  • Professional tone                                     │
│  • Concise summaries                                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                Return to User                            │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Knowledge Base Design

**File:** `lib/portfolio-knowledge.ts`

```typescript
export const portfolioKnowledge = {
  personal: {
    name: "Jan Padua",
    email: "janpadua@spup.edu.ph",
    location: "Tuguegarao City, Cagayan",
    university: "St. Paul University Philippines (SPUP)",
    program: "Bachelor of Science in Information Technology",
    year: "4th Year",
  },
  skills: {
    expert: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    advanced: ["Node.js", "REST APIs", "Git", "Vercel"],
    intermediate: ["Python", "AI Integration", "Security"],
  },
  // ... more data
}
```

**Design Decisions:**
- **Static JSON** (no vector database) for simplicity
- **Full context injection** (entire knowledge base in prompt)
- **No semantic search** (small dataset doesn't require it)
- **Fast retrieval** (no database queries)

### 6.3 Model Selection

| Model | Pros | Cons | Selected? |
|-------|------|------|-----------|
| **Groq Llama 3.3-70b** | Free, Fast (tokens/sec), Good quality | API quota limits | ✅ **YES** |
| Google Gemini Pro | Good quality, Free tier | Model availability issues (v1beta) | ❌ |
| OpenAI GPT-4 | Best quality | User quota exceeded | ❌ |

---

## 7. UI/UX Design

### 7.1 Design Principles
1. **Minimalism**: Clean white backgrounds, subtle shadows
2. **Professionalism**: Gray color palette, small fonts
3. **Responsiveness**: Mobile-first design with Tailwind
4. **Accessibility**: Semantic HTML, ARIA labels

### 7.2 Color Palette

```css
Primary: 
- White (#FFFFFF) - Backgrounds
- Gray-900 (#111827) - Primary text
- Gray-600 (#4B5563) - Secondary text

Accents:
- Emerald-600 (#059669) - Success states
- Red-600 (#DC2626) - Logout button, errors
- Blue-600 (#2563EB) - Information, links
- Amber-600 (#D97706) - Warnings
```

### 7.3 Component Library
- **Radix UI** - Headless accessible components
- **Lucide React** - Icon system
- **Tailwind CSS** - Utility classes
- **Custom components** - Navigation, HoverLink, AIChat

### 7.4 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

---

## 8. API Design

### 8.1 RESTful Endpoints

#### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

Request:
{
  "message": "What programming languages does Jan know?"
}

Response (200 OK):
{
  "response": "Jan Padua has expertise in:\n\n• JavaScript/TypeScript (Expert level)\n• Python (Intermediate)\n• React & Next.js (Expert)\n• HTML/CSS (Advanced)\n\nHe specializes in modern web development with a focus on React-based frameworks."
}

Response (400 Bad Request):
{
  "error": "Prompt injection attempt detected"
}

Response (500 Internal Server Error):
{
  "error": "AI service temporarily unavailable"
}
```

### 8.2 Error Handling Strategy

```typescript
try {
  // API call
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    return { error: 'Too many requests. Please wait.' }
  }
  if (error.code === 'INVALID_API_KEY') {
    return { error: 'Service configuration error' }
  }
  // Generic error
  return { error: 'Something went wrong. Please try again.' }
}
```

---

## 9. Database Schema

**Note:** This project uses **NO DATABASE** - all data is static JSON in `lib/portfolio-knowledge.ts`.

**Rationale:**
- Portfolio data is relatively static (changes infrequently)
- No user-generated content (except chat, which is ephemeral)
- Simpler deployment (no database hosting required)
- Faster reads (no database queries)

**Future Enhancement:** If adding features like visitor analytics, chat history, or blog posts, migrate to:
- **Vercel Postgres** - Serverless SQL
- **Supabase** - PostgreSQL with real-time
- **MongoDB Atlas** - NoSQL for flexible schema

---

## 10. Deployment Architecture

### 10.1 Vercel Configuration

**File:** `vercel.json` (implicit - no custom config needed)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["all"]
}
```

### 10.2 Environment Variables

**Production (Vercel Dashboard):**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
GROQ_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE
```

**Local (.env.local - gitignored):**
- Same variables as production
- Additional keys for testing (Gemini, OpenAI - not used in prod)

### 10.3 CI/CD Pipeline

```
Developer pushes code
    │
    ▼
GitHub webhook triggers Vercel
    │
    ▼
Vercel pulls latest commit
    │
    ▼
npm install (install dependencies)
    │
    ▼
npm run build (Next.js build)
    │
    ├─── Build fails? ──► Rollback, notify dev
    │
    └─── Build succeeds? ──► Continue
                            │
                            ▼
                        Edge Function bundling
                            │
                            ▼
                        Deploy to Edge Network
                            │
                            ▼
                        Health check
                            │
                            ▼
                        Live in <2 minutes
```

### 10.4 Performance Optimizations

1. **Static Generation** - Pre-render pages at build time
2. **Edge Runtime** - Server Components run on Edge
3. **Image Optimization** - Next.js Image component (if images added)
4. **Code Splitting** - Automatic route-based splitting
5. **Compression** - Gzip/Brotli compression enabled
6. **Caching** - Aggressive caching for static assets

---

## Appendix A: File Structure

```
padua react portfolio/
├── app/
│   ├── layout.tsx           # Root layout (ClerkProvider, AIChat)
│   ├── page.tsx             # Home page (with auth protection)
│   ├── globals.css          # Global styles
│   ├── about/page.tsx       # About page (with auth)
│   ├── security/page.tsx    # Security dashboard (with auth)
│   ├── api/
│   │   └── chat/route.ts    # AI chat API endpoint
│   └── sign-in/[[...sign-in]]/page.tsx  # Clerk sign-in
├── components/
│   ├── navigation.tsx       # Main navigation with logout
│   ├── ai-chat.tsx          # Floating chat widget
│   └── ui/                  # Shadcn/Radix UI components
├── lib/
│   ├── portfolio-knowledge.ts  # RAG knowledge base
│   ├── security.ts          # Security utilities
│   └── utils.ts             # Helper functions
├── middleware.ts            # Basic Clerk middleware (no custom auth)
├── .env.local               # Environment variables (gitignored)
├── package.json             # Dependencies
├── next.config.mjs          # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Appendix B: Design Decisions Log

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| **Auth System** | Firebase, NextAuth, Clerk | **Clerk** | Best DX, built-in UI, JWT support |
| **AI Provider** | Gemini, OpenAI, Groq | **Groq** | Free, fast inference, stable API |
| **Database** | Postgres, Supabase, None | **None** | Static data, no DB needed yet |
| **Styling** | CSS Modules, Emotion, Tailwind | **Tailwind** | Utility-first, fast prototyping |
| **Deployment** | AWS, Railway, Vercel | **Vercel** | Best Next.js support, Edge Network |
| **Security** | Manual, Arcjet, Cloudflare | **Arcjet** (then removed) | Initially chosen, removed due to size limit |

---

## Appendix C: Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **First Contentful Paint** | < 1.5s | 0.8s | ✅ |
| **Time to Interactive** | < 3s | 2.1s | ✅ |
| **Lighthouse Score** | > 90 | 95 | ✅ |
| **API Response Time** | < 2s | 1.2s | ✅ |
| **Edge Function Size** | < 1MB | 0.95MB | ✅ |

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 21, 2026 | Jan Padua | Initial design document |

---

**Approval:**
- Technical Lead: Jan Padua ✅
- Security Review: Completed ✅
- UX Review: Completed ✅
