'use client'

import { useState, useEffect } from 'react'
import { Activity, RefreshCw } from 'lucide-react'

interface SecurityEvent {
  id: string
  type: string
  severity: string
  ip: string
  path: string
  timestamp: string
  reason: string
  userAgent?: string
  method?: string
}

export function RecentSecurityEvents() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  async function fetchEvents() {
    try {
      const res = await fetch('/api/security?type=events&limit=5')
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error('error fetching events', err)
    }
  }

  useEffect(() => {
    fetchEvents()
    setLoading(false)
    const timer = setInterval(fetchEvents, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleManualRefresh = async () => {
    setRefreshing(true)
    await fetchEvents()
    setRefreshing(false)
  }

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      CRITICAL: 'text-red-700 bg-red-100',
      HIGH: 'text-orange-700 bg-orange-100',
      MEDIUM: 'text-yellow-700 bg-yellow-100',
      LOW: 'text-blue-700 bg-blue-100',
    }
    return colors[severity] || colors.LOW
  }

  return (
    <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-600" />
          Recent Security Events
        </h2>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium flex items-center gap-1 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Severity</th>
              <th className="p-2 text-left">IP</th>
              <th className="p-2 text-left">Path</th>
              <th className="p-2 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((e) => (
                <tr key={e.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap text-gray-700">{new Date(e.timestamp).toLocaleTimeString()}</td>
                  <td className="p-2 whitespace-nowrap font-mono text-gray-700">{e.type}</td>
                  <td className="p-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold ${getSeverityColor(e.severity)}`}>
                      {e.severity}
                    </span>
                  </td>
                  <td className="p-2 whitespace-nowrap font-mono text-gray-700 text-[10px]">{e.ip}</td>
                  <td className="p-2 truncate max-w-[180px] text-gray-700">{e.path}</td>
                  <td className="p-2 truncate max-w-[200px] text-gray-600">{e.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  {loading ? 'Loading events...' : 'No recent events. Run penetration tests to see them here.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
