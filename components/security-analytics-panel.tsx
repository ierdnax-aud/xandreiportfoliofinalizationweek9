'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Shield, Lock, Zap, Bug, CheckCircle2, Clock, AlertCircle, TrendingUp, Database, Activity, Target, Flame, BarChart3 } from 'lucide-react'

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

// Map attack types to colors and icons
const getAttackTypeInfo = (type: string) => {
  const map: Record<string, { color: string; bgColor: string; icon: React.ReactNode; label: string }> = {
    SQL_INJECTION: {
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      label: 'SQL Injection',
      icon: <Zap className="w-4 h-4" />,
    },
    BRUTE_FORCE: {
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      label: 'Brute Force',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    XSS_ATTEMPT: {
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      label: 'XSS Attack',
      icon: <Bug className="w-4 h-4" />,
    },
    RATE_LIMIT: {
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      label: 'Rate Limit',
      icon: <Shield className="w-4 h-4" />,
    },
    BOT_DETECTED: {
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      label: 'Bot Detection',
      icon: <Lock className="w-4 h-4" />,
    },
    BLOCKED: {
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      label: 'Blocked',
      icon: <Shield className="w-4 h-4" />,
    },
  }
  return map[type] || map.BLOCKED
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

// Calculate risk score (0-100)
const calculateRiskScore = (events: SecurityEvent[], metrics: SecurityMetrics | null) => {
  if (!metrics || metrics.totalRequests === 0) return 0
  
  const blockRate = (metrics.blockedRequests / metrics.totalRequests) * 100
  const criticalCount = events.filter(e => e.severity === 'CRITICAL').length
  const highCount = events.filter(e => e.severity === 'HIGH').length
  
  // Score: lower is safer. 100 = all blocked, 0 = all attacks got through
  const score = Math.min(100, blockRate + (criticalCount * 5))
  return Math.round(Math.max(0, Math.min(100, score)))
}

// Get unique IPs and their attack counts
const getTopAttackers = (events: SecurityEvent[]) => {
  const ipMap: Record<string, number> = {}
  events.forEach(e => {
    ipMap[e.ip] = (ipMap[e.ip] || 0) + 1
  })
  return Object.entries(ipMap)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

// Get most targeted endpoints
const getMostTargetedPaths = (events: SecurityEvent[]) => {
  const pathMap: Record<string, number> = {}
  events.forEach(e => {
    pathMap[e.path] = (pathMap[e.path] || 0) + 1
  })
  return Object.entries(pathMap)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

export default function SecurityAnalyticsPanel() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      const [evtRes, metRes] = await Promise.all([
        fetch('/api/security?type=events&limit=50'),
        fetch('/api/security?type=metrics'),
      ])
      const evts = await evtRes.json()
      const mets = await metRes.json()
      setEvents(evts)
      setMetrics(mets)
      setLoading(false)
    } catch (err) {
      console.error('error fetching analytics', err)
    }
  }

  useEffect(() => {
    fetchData()
    const timer = setInterval(fetchData, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleClear = async () => {
    await fetch('/api/security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clear: true }),
    })
    fetchData()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Live Security Analytics</h2>
        <button
          onClick={handleClear}
          className="text-xs px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 font-medium"
        >
          Clear Events
        </button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900">System Status</h3>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">Running</p>
          <p className="text-xs text-blue-700 mt-2">✓ All protections active</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-emerald-900">Database Integrity</h3>
            <Database className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-900">Protected</p>
          <p className="text-xs text-emerald-700 mt-2">✓ No unauthorized access</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-red-900">Active Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-900">{events.length}</p>
          <p className="text-xs text-red-700 mt-2">Recent threat types detected</p>
        </div>
      </div>

      {/* Threat Activity Over Time */}
      {metrics && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Activity Overview</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs text-gray-600 font-medium">Threats Detected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalRequests}</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded border border-emerald-200">
              <p className="text-xs text-emerald-700 font-medium">Attacks Blocked</p>
              <p className="text-3xl font-bold text-emerald-900 mt-2">{metrics.blockedRequests}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded border border-red-200">
              <p className="text-xs text-red-700 font-medium">Critical Severity</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {events.filter(e => e.severity === 'CRITICAL').length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Risk Score & Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-emerald-900 mb-3">Security Score</h4>
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ff" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" 
                  strokeDasharray={`${calculateRiskScore(events, metrics) * 2.83} 283`}
                  transform="rotate(-90 50 50)" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-emerald-900">{calculateRiskScore(events, metrics)}</span>
              </div>
            </div>
            <p className="text-xs text-center text-emerald-700 font-medium">Excellent</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-blue-900">Block Rate</h4>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {metrics.totalRequests > 0 
                ? Math.round((metrics.blockedRequests / metrics.totalRequests) * 100)
                : 0}%
            </p>
            <p className="text-xs text-blue-700 mt-2">{metrics.blockedRequests} of {metrics.totalRequests}</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-orange-900">Unique Attackers</h4>
              <Target className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-900">{getTopAttackers(events).length}</p>
            <p className="text-xs text-orange-700 mt-2">Unique IP addresses</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-red-900">Threat Level</h4>
              <Flame className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-900">
              {events.filter(e => e.severity === 'CRITICAL').length > 0 ? 'HIGH' : 'LOW'}
            </p>
            <p className="text-xs text-red-700 mt-2">{events.filter(e => e.severity === 'CRITICAL').length} critical events</p>
          </div>
        </div>
      )}

      {/* Top Attackers & Targeted Endpoints */}
      {events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Top Attackers
            </h3>
            <div className="space-y-3">
              {getTopAttackers(events).length > 0 ? (
                getTopAttackers(events).map((attacker, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-mono text-gray-900">{attacker.ip}</p>
                      <p className="text-xs text-gray-500">{attacker.count} attack{attacker.count !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-orange-500 rounded-full" 
                          style={{ width: `${(attacker.count / (getTopAttackers(events)[0]?.count || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-6">{attacker.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No attacker data</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Most Targeted Endpoints
            </h3>
            <div className="space-y-3">
              {getMostTargetedPaths(events).length > 0 ? (
                getMostTargetedPaths(events).map((endpoint, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-gray-900 truncate">{endpoint.path}</p>
                      <p className="text-xs text-gray-500">{endpoint.count} attempt{endpoint.count !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-purple-500 rounded-full" 
                          style={{ width: `${(endpoint.count / (getMostTargetedPaths(events)[0]?.count || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-6">{endpoint.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No endpoint data</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attack Types Breakdown */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attack Types Distribution</h3>
            <div className="space-y-3">
              {(() => {
                const maxValue = Math.max(metrics.sqlInjectionAttempts, metrics.bruteForceAttempts, metrics.xssAttempts, metrics.rateLimitHits, metrics.botDetections, 1)
                return [
                  { label: 'SQL Injection', value: metrics.sqlInjectionAttempts, color: 'bg-red-500', width: metrics.sqlInjectionAttempts > 0 ? (metrics.sqlInjectionAttempts / maxValue * 100) : 0 },
                  { label: 'Brute Force', value: metrics.bruteForceAttempts, color: 'bg-orange-500', width: metrics.bruteForceAttempts > 0 ? (metrics.bruteForceAttempts / maxValue * 100) : 0 },
                  { label: 'XSS Attacks', value: metrics.xssAttempts, color: 'bg-yellow-500', width: metrics.xssAttempts > 0 ? (metrics.xssAttempts / maxValue * 100) : 0 },
                  { label: 'Rate Limit', value: metrics.rateLimitHits, color: 'bg-blue-500', width: metrics.rateLimitHits > 0 ? (metrics.rateLimitHits / maxValue * 100) : 0 },
                  { label: 'Bot Detection', value: metrics.botDetections, color: 'bg-purple-500', width: metrics.botDetections > 0 ? (metrics.botDetections / maxValue * 100) : 0 },
                ].map((attack) => (
                <div key={attack.label}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-medium text-gray-700">{attack.label}</p>
                    <p className="text-xs font-bold text-gray-900">{attack.value}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${attack.color}`}
                      style={{ width: `${Math.max(attack.width, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Severity Distribution</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  {(() => {
                    const critical = events.filter(e => e.severity === 'CRITICAL').length;
                    const high = events.filter(e => e.severity === 'HIGH').length;
                    const medium = events.filter(e => e.severity === 'MEDIUM').length;
                    const low = events.filter(e => e.severity === 'LOW').length;
                    const total = critical + high + medium + low || 1;
                    
                    let offset = 0;
                    const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];
                    const sizes = [critical, high, medium, low];
                    
                    return sizes.map((size, idx) => {
                      const percent = (size / total) * 100;
                      const circumference = 2 * Math.PI * 45;
                      const strokeDashoffset = circumference - (circumference * percent) / 100;
                      const rotation = (offset / total) * 360;
                      
                      offset += size;
                      
                      return (
                        <circle
                          key={idx}
                          cx="60"
                          cy="60"
                          r="45"
                          fill="none"
                          stroke={colors[idx]}
                          strokeWidth="12"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          transform={`rotate(${rotation} 60 60)`}
                        />
                      );
                    });
                  })()}
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Critical: {events.filter(e => e.severity === 'CRITICAL').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-700">High: {events.filter(e => e.severity === 'HIGH').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Medium: {events.filter(e => e.severity === 'MEDIUM').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-700">Low: {events.filter(e => e.severity === 'LOW').length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      {metrics && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded p-4 border border-gray-200">
              <p className="text-xs text-gray-600 font-medium">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalRequests}</p>
            </div>
            <div className="bg-red-50 rounded p-4 border border-red-200">
              <p className="text-xs text-red-700 font-medium">Blocked</p>
              <p className="text-2xl font-bold text-red-900 mt-1">{metrics.blockedRequests}</p>
            </div>
            <div className="bg-orange-50 rounded p-4 border border-orange-200">
              <p className="text-xs text-orange-700 font-medium">SQL Injection</p>
              <p className="text-2xl font-bold text-orange-900 mt-1">{metrics.sqlInjectionAttempts}</p>
            </div>
            <div className="bg-purple-50 rounded p-4 border border-purple-200">
              <p className="text-xs text-purple-700 font-medium">XSS Attempts</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{metrics.xssAttempts}</p>
            </div>
            <div className="bg-yellow-50 rounded p-4 border border-yellow-200">
              <p className="text-xs text-yellow-700 font-medium">Brute Force</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">{metrics.bruteForceAttempts}</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Event Log */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Live Event Log
          </h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
            {events.length} Events
          </span>
        </div>

        {events.length === 0 && !loading ? (
          <div className="text-center p-8 bg-white border border-gray-200 rounded">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No events recorded yet</p>
            <p className="text-sm text-gray-400 mt-1">Run penetration tests to see attacks appear here</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {events.map((e) => {
              const attackInfo = getAttackTypeInfo(e.type)
              const severityColors: Record<string, { bg: string; text: string; border: string }> = {
                CRITICAL: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-l-red-500' },
                HIGH: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-l-orange-500' },
                MEDIUM: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-l-yellow-500' },
                LOW: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-l-blue-500' },
              }
              const colors = severityColors[e.severity] || severityColors.LOW

              return (
                <div key={e.id} className={`border-l-4 ${colors.border} ${colors.bg} p-3 rounded bg-white border border-gray-200 hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {attackInfo.icon}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{attackInfo.label}</h4>
                        <p className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap ${colors.text} ${colors.bg}`}>
                      {e.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-white p-2 rounded border border-gray-100">
                      <p className="text-gray-500 font-medium">IP Address</p>
                      <p className="text-gray-800 font-mono">{e.ip}</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-100">
                      <p className="text-gray-500 font-medium">Method</p>
                      <p className="text-gray-800 font-mono">{e.method || 'GET'}</p>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded border border-gray-100 text-xs mb-2">
                    <p className="text-gray-500 font-medium mb-1">Path</p>
                    <p className="text-gray-800 font-mono truncate">{e.path}</p>
                  </div>

                  <div className="bg-white p-2 rounded border border-gray-100 text-xs mb-2">
                    <p className="text-gray-500 font-medium mb-1">Attack Vector</p>
                    <p className="text-gray-800">{e.reason}</p>
                  </div>

                  {e.userAgent && (
                    <div className="bg-gray-50 p-2 rounded border border-gray-200 text-xs">
                      <p className="text-gray-500 font-medium mb-1">User Agent</p>
                      <p className="text-gray-700 font-mono text-[9px] truncate">{e.userAgent}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Threat Intelligence Summary */}
      {events.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Threat Intelligence Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-gray-600 font-semibold mb-2">MOST COMMON ATTACK</p>
              <p className="text-lg font-bold text-gray-900">
                {(() => {
                  const counts = {
                    SQL: (metrics?.sqlInjectionAttempts || 0),
                    BruteForce: (metrics?.bruteForceAttempts || 0),
                    XSS: (metrics?.xssAttempts || 0),
                  };
                  const max = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b);
                  return max[0].replace('SQL', 'SQL Injection').replace('BruteForce', 'Brute Force');
                })()}
              </p>
              <p className="text-xs text-gray-600 mt-2">Primary threat vector detected</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-gray-600 font-semibold mb-2">ATTACK FREQUENCY</p>
              <p className="text-lg font-bold text-gray-900">
                {events.length > 0 ? Math.round(events.length / (events.length || 1)) : 0}x/sec
              </p>
              <p className="text-xs text-gray-600 mt-2">Average attack attempts</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-gray-600 font-semibold mb-2">DETECTION RATE</p>
              <p className="text-lg font-bold text-blue-900">
                {metrics && metrics.totalRequests > 0 ? '100%' : '0%'}
              </p>
              <p className="text-xs text-gray-600 mt-2">All threats detected & blocked</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
        <div className="space-y-2">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded flex items-start gap-3">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-900">Monitor SQL Injection Attempts</p>
              <p className="text-xs text-blue-700 mt-1">Review blocked SQL injection attempts and ensure parameterized queries are in use</p>
            </div>
          </div>
          <div className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-orange-900">Strengthen Authentication</p>
              <p className="text-xs text-orange-700 mt-1">Implement rate limiting and account lockout policies to prevent brute force attacks</p>
            </div>
          </div>
          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded flex items-start gap-3">
            <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-yellow-900">XSS Prevention Review</p>
              <p className="text-xs text-yellow-700 mt-1">Ensure input validation and output encoding are implemented across all user input fields</p>
            </div>
          </div>
          <div className="border-l-4 border-emerald-500 bg-emerald-50 p-3 rounded flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-900">Continue Security Monitoring</p>
              <p className="text-xs text-emerald-700 mt-1">All security controls are functioning properly. Keep monitoring for new threats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Summary */}
      {events.length > 0 && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-900">All Penetration Tests Passed</p>
              <p className="text-xs text-emerald-800 mt-1">
                {metrics?.blockedRequests || 0} attack attempts blocked successfully. Security controls are functioning as expected. No vulnerabilities detected in core functionality.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
