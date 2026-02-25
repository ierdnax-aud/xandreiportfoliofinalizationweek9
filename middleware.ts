import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'
import { logSecurityEvent } from '@/lib/security'

// wrap Clerk's middleware so we can inspect every request and log potential
// penetration-test traffic based on user-agent, path, etc.  during the video
// demo we simply run attacks from Kali; common tools leave identifiable
// strings in the User‑Agent and this allows the site to "see" them and record
// the event for the dashboard.

export default async function middleware(req: NextRequest) {
  // simple scanner detection heuristics (expandable)
  try {
    const ua = (req.headers.get('user-agent') || '').toLowerCase()
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    let type: Parameters<typeof logSecurityEvent>[0]['type'] | null = null

    if (ua.includes('sqlmap')) {
      type = 'SQL_INJECTION'
    } else if (ua.includes('hydra')) {
      type = 'BRUTE_FORCE'
    } else if (ua.includes('xss') && ua.includes('ser')) {
      // XSSer tool
      type = 'XSS_ATTEMPT'
    } else if (ua.includes('apachebench') || ua.includes('ab/')) {
      type = 'RATE_LIMIT'
    } else if (ua.includes('python') && ua.includes('requests')) {
      type = 'BOT_DETECTED'
    }

    if (type) {
      // map types to sensible severity levels
      const severityMap: Record<string, Parameters<typeof logSecurityEvent>[0]['severity']> = {
        SQL_INJECTION: 'CRITICAL',
        BRUTE_FORCE: 'HIGH',
        XSS_ATTEMPT: 'MEDIUM',
        RATE_LIMIT: 'MEDIUM',
        BOT_DETECTED: 'LOW',
      }

      logSecurityEvent({
        type,
        severity: severityMap[type] || 'HIGH',
        ip: Array.isArray(ip) ? ip[0] : ip,
        path: req.nextUrl.pathname,
        reason: `detected scanner via User-Agent (${ua.slice(0,40)})`,
        userAgent: ua,
        method: req.method,
      })
    }
  } catch (e) {
    console.error('attack detection failed', e)
  }

  // finally invoke clerk middleware to preserve existing auth behavior
  const clerkResponse = await clerkMiddleware()(req)
  return clerkResponse
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
