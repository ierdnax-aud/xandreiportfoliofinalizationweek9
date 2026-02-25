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
      const metrics = await getSecurityMetrics()
      return NextResponse.json(metrics)
    } else if (type === 'events') {
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const events = await getSecurityEvents(limit)
      return NextResponse.json(events)
    } else {
      const metrics = await getSecurityMetrics()
      const recentEvents = await getSecurityEvents(10)
      return NextResponse.json({
        metrics,
        recentEvents,
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
// persistent log. useful for the video demonstration when you want the dashboard
// to immediately reflect activity without having to trigger UA detection.
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    if (data.clear) {
      await clearSecurityEvents()
      return NextResponse.json({ ok: true })
    }

    const event = await logSecurityEvent(data)
    return NextResponse.json(event)
  } catch (error) {
    console.error('Security API POST error:', error)
    return NextResponse.json(
      { error: 'Failed to log security event' },
      { status: 500 }
    )
  }
}
