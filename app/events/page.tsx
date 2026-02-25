import { Navigation } from '@/components/navigation'
import { Calendar } from 'lucide-react'
import { ModernBackground } from '@/components/modern-background'

export default function Events() {
  const events = [
    {
      title: 'IT Cybersecurity Roadshow',
      venue: 'St. Paul University Philippines, Tuguegarao City, Cagayan',
      date: 'October 25, 2024',
      description: 'Roadshow focused on cybersecurity awareness and best practices in information security.',
      type: 'Roadshow'
    },
    {
      title: 'SITE Film Festival 2025',
      venue: 'St. Paul University Philippines, Tuguegarao City, Cagayan',
      date: 'June 19, 2024',
      description: 'Annual film festival celebrating creativity and technological innovation through cinematography.',
      type: 'Festival'
    },
    {
      title: 'ITE CONVENTION 2025',
      venue: 'St. Paul University Philippines, Tuguegarao City',
      date: 'April 20-22, 2024',
      description: 'Theme: Innovate, Transform, Sustain: Shaping a Smarter World',
      theme: 'Innovate, Transform, Sustain: Shaping a Smarter World',
      type: 'Convention'
    },
    {
      title: 'ITE CONVENTION 2024',
      venue: 'St. Paul University Philippines, Tuguegarao City, Cagayan',
      date: 'April 17-19, 2024',
      description: 'A major convention bringing together IT professionals and students.',
      theme: 'Sustainable Synergy: Integrating Information Technology and Engineering for a Greener Tomorrow',
      type: 'Convention'
    },
    {
      title: 'Cyber Summit 2023',
      venue: 'St. Paul University Philippines, Tuguegarao City, Cagayan',
      date: 'May 24-26, 2023',
      description: 'Summit focused on cybersecurity and sustainable development through technology.',
      theme: 'Driving Sustainable Development through Innovation of Technology for a Better Future',
      type: 'Summit'
    }
  ]

  const pastEvents = events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen flex flex-col relative pb-20 md:pb-0">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 relative z-10">
        <div className="mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Events & Conferences
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-1">Seminars, workshops, and conferences I've attended and participated in</p>
        </div>

        {/* Past Events */}
        <section className="mb-20 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Past Events
          </h2>
          <div className="space-y-4">
            {pastEvents.map((event, index) => (
              <div key={index} className="card-interactive group bg-gradient-to-r from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                    <span className="inline-block mt-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-3 py-1">
                      {event.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">{event.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.venue}</p>
                  </div>
                </div>
                {event.theme && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Theme:</span> {event.theme}
                    </p>
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 mt-3">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Event Statistics */}
        <section className="mb-20 pt-8 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Participation Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-interactive bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{events.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Events</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">{pastEvents.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Attended</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">5</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Event Types</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Involved</p>
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="pt-8 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Event Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Conventions</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Large-scale events bringing together IT professionals, students, and educators to discuss industry trends and innovations.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Summits</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Focused gatherings on specialized topics like cybersecurity and sustainable development in technology.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Roadshows</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Educational and awareness programs on specific technology topics and best practices.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Festivals</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Creative showcases celebrating innovation, technology, and artistic expression.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-8 mt-20 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 Jan Xandrei Padua. Crafted with care and passion for excellence.</p>
        </div>
      </footer>
    </div>
  )
}
