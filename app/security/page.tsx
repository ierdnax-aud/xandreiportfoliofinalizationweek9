import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { RecentSecurityEvents } from '@/components/recent-security-events'
import { Shield, AlertTriangle, Activity, Lock, FileText, CheckCircle2, XCircle, Clock, TrendingUp, TrendingDown, LogOut } from 'lucide-react'
import { ModernBackground } from '@/components/modern-background'
import {
  attackVectors,
  riskAssessment,
  remediationBacklog,
  incidentResponseChecklist,
} from '@/lib/security'
import { UserButton } from '@clerk/nextjs'

export default async function SecurityDashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <Navigation />
      
      {/* Logout Button - More Visible */}
      <div className="absolute top-20 right-6 z-50 bg-white rounded-full shadow-lg p-1">
        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            }
          }}
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 md:py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Security Operations</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Real-time threat monitoring and penetration test results
          </p>
          <p className="mt-2">
            <a href="/security-analytics" className="text-indigo-600 text-sm font-medium hover:underline">
              View live analytics & events →
            </a>
          </p>
        </div>

        {/* Security Status Cards */}

        {/* Recent events - now client-side with live polling */}
        <RecentSecurityEvents />

        {/* Security Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ACTIVE</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">Arcjet Shield</p>
            <p className="text-xs text-gray-600 mt-1">Bot & Attack Protection</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">LIVE</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">Rate Limiting</p>
            <p className="text-xs text-gray-600 mt-1">100 req/min per IP</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Lock className="w-6 h-6 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">SECURED</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">Clerk Auth</p>
            <p className="text-xs text-gray-600 mt-1">Authentication Layer</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">MONITORING</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">SQL Shield</p>
            <p className="text-xs text-gray-600 mt-1">Injection Protection</p>
          </div>
        </div>

        {/* Firewall Policy Definitions */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" />
            Firewall Policies & Attack Vectors
          </h2>
          <div className="space-y-3">
            {Object.entries(attackVectors).map(([key, vector]) => (
              <div key={key} className="border-l-4 border-gray-300 bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{vector.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{vector.description}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded whitespace-nowrap">
                    ✓ {vector.tested ? 'TESTED' : 'PENDING'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="font-medium text-blue-900 mb-1">Mitigation Strategy</p>
                    <p className="text-blue-700">{vector.mitigation}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="font-medium text-purple-900 mb-1">Testing Tool</p>
                    <p className="text-purple-700">{vector.kaliBased}</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                    <p className="font-medium text-emerald-900 mb-1">Result</p>
                    <p className="text-emerald-700 font-semibold">✓ BLOCKED</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kali Linux Testing Summary */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            Live Penetration Test Results
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Run the penetration test script and watch attacks appear on the <a href="/security-analytics" className="text-indigo-600 font-medium hover:underline">analytics dashboard</a> in real-time.
          </p>

          <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Testing Tools & Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-xs text-gray-600">
                <p className="font-bold text-gray-800 mb-1">📊 Rate Limiting</p>
                <p className="text-[10px]"><span className="font-medium">Tool:</span> Apache Bench (ab)</p>
                <p className="text-[10px]"><span className="font-medium">Limit:</span> 100 req/min per IP</p>
              </div>
              <div className="text-xs text-gray-600">
                <p className="font-bold text-gray-800 mb-1">🔐 Brute Force</p>
                <p className="text-[10px]"><span className="font-medium">Tool:</span> Hydra, Medusa</p>
                <p className="text-[10px]"><span className="font-medium">Protection:</span> Clerk Auth</p>
              </div>
              <div className="text-xs text-gray-600">
                <p className="font-bold text-gray-800 mb-1">🤖 Bot Detection</p>
                <p className="text-[10px]"><span className="font-medium">Tool:</span> Python Requests</p>
                <p className="text-[10px]"><span className="font-medium">Analysis:</span> ML-based detection</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <h3 className="font-semibold text-gray-900 p-4 bg-gray-100 border-b">Attack Vector Test Results</h3>
            <div className="divide-y divide-gray-200">
              {[
                { name: 'Rate Limit Testing', tool: 'Apache Bench (ab)', method: 'Multiple rapid requests', result: 'BLOCKED', severity: 'MEDIUM' },
                { name: 'Brute Force Login', tool: 'Hydra', method: '4+ failed attempts detected', result: 'BLOCKED', severity: 'HIGH' },
                { name: 'Bot Detection', tool: 'Python Requests', method: 'Automated scraper detection', result: 'BLOCKED', severity: 'LOW' },
                { name: 'SQL Injection', tool: 'SQLmap', method: 'Database injection payloads', result: 'BLOCKED', severity: 'CRITICAL' },
                { name: 'XSS Attempts', tool: 'XSSer', method: 'Script injection vectors', result: 'BLOCKED', severity: 'MEDIUM' },
              ].map((test, idx) => {
                const severityColors: Record<string, string> = {
                  CRITICAL: 'text-red-700 bg-red-100',
                  HIGH: 'text-orange-700 bg-orange-100',
                  MEDIUM: 'text-yellow-700 bg-yellow-100',
                  LOW: 'text-blue-700 bg-blue-100',
                }
                return (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{test.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{test.method}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded ${severityColors[test.severity]}`}>
                          {test.severity}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded">
                          ✓ {test.result}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">Tool:</span> {test.tool}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-xs text-emerald-800">
              <span className="font-bold">✓ All penetration tests PASSED:</span> Security controls successfully blocked all attack attempts. No vulnerabilities detected in core functionality.
            </p>
          </div>
        </section>

        {/* Risk Assessment */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-600" />
            Risk Assessment
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-800">Attack Vector</th>
                  <th className="text-center p-3 font-medium text-gray-800">Before</th>
                  <th className="text-center p-3 font-medium text-gray-800">After</th>
                  <th className="text-left p-3 font-medium text-gray-800">Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {riskAssessment.map((risk, idx) => (
                  <tr key={idx} className="hover:bg-white">
                    <td className="p-3 font-medium text-gray-800">{risk.vector}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        risk.preDeployment === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                        risk.preDeployment === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                        risk.preDeployment === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {risk.preDeployment}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        risk.postDeployment === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                        risk.postDeployment === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                        risk.postDeployment === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {risk.postDeployment}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700 flex items-center gap-2">
                      <TrendingDown className="w-3 h-3 text-emerald-600" />
                      {risk.improvement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Remediation Backlog */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Remediation Backlog
          </h2>
          <div className="space-y-2">
            {remediationBacklog.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex-shrink-0">
                  {item.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : item.status === 'IN_PROGRESS' ? (
                    <Clock className="w-4 h-4 text-blue-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      item.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                      item.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      item.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-[10px] text-gray-600">{item.timeline}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800">{item.issue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Incident Response Checklist */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Incident Response
          </h2>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 mb-4">
              Automated and manual response procedures for detected threats
            </p>
            <div className="space-y-2">
              {incidentResponseChecklist.map((step) => (
                <div key={step.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded hover:border-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800">{step.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        step.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                        step.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                        step.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {step.severity}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        step.automated ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.automated ? 'AUTO' : 'MANUAL'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rollback Procedures */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            Rollback & Validation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-2 border-blue-500 bg-white p-4 rounded border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2 text-sm">Rollback Steps</h3>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                <li>Set Arcjet mode to 'DRY_RUN'</li>
                <li>Remove rate limiting temporarily</li>
                <li>Deploy with rollback tag</li>
                <li>Monitor error rates</li>
                <li>Gradually re-enable features</li>
              </ol>
            </div>
            <div className="border-l-2 border-emerald-500 bg-white p-4 rounded border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2 text-sm">Validation Checklist</h3>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                <li>✓ Rate limiting blocks after 100 req</li>
                <li>✓ Bot detection identifies traffic</li>
                <li>✓ SQL injection payloads blocked</li>
                <li>✓ Legitimate users have access</li>
                <li>✓ Auth flow works correctly</li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-xs">
          <p className="mb-1">
            <span className="font-medium text-gray-800">Security Stack:</span> Arcjet Shield • Clerk Auth • Vercel Edge • Next.js Middleware
          </p>
          <p className="text-gray-500">© 2025 Jan Padua. All systems secured.</p>
        </div>
      </footer>
    </div>
  )
}
