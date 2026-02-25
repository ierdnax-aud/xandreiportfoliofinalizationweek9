import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import SecurityAnalyticsPanel from '@/components/security-analytics-panel'
import { UserButton } from '@clerk/nextjs'
import { Shield } from 'lucide-react'

export default async function SecurityAnalyticsPage() {
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
              avatarBox: "w-10 h-10",
            },
          }}
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 md:py-12">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Security Analytics</h1>
        </div>

        <SecurityAnalyticsPanel />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-xs">
          <p className="mb-1">
            <span className="font-medium text-gray-800">
              Security Stack:
            </span>{' '}
            Arcjet Shield • Clerk Auth • Vercel Edge • Next.js Middleware
          </p>
          <p className="text-gray-500">© 2025 Jan Padua. All systems secured.</p>
        </div>
      </footer>
    </div>
  )
}
