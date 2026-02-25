import { NextRequest, NextResponse } from 'next/server'
import {
  getSecurityEvents,
  getSecurityMetrics,
  logSecurityEvent,
  clearSecurityEvents,
} from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')

    if (type === 'metrics') {
      const metrics = getSecurityMetrics()
      return NextResponse.json(metrics)
    } else if (type === 'events') {
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const events = getSecurityEvents(limit)
      return NextResponse.json(events)
    } else {
      return NextResponse.json({
        metrics: getSecurityMetrics(),
        recentEvents: getSecurityEvents(10),
      })
    }
  } catch (error) {
    console.error('Security API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security data' },
      { status: 500 }
    )
  }
}

// allow penetration-test scripts or manual tools to post events and clear the
// in-memory log. useful for the video demonstration when you want the dashboard
// to immediately reflect activity without having to trigger UA detection.
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    if (data.clear) {
      clearSecurityEvents()
      return NextResponse.json({ ok: true })
    }

    const event = logSecurityEvent(data)
    return NextResponse.json(event)
  } catch (error) {
    console.error('Security API POST error:', error)
    return NextResponse.json(
      { error: 'Failed to log security event' },
      { status: 500 }
    )
  }
}
