import { Navigation } from '@/components/navigation'
import { Award, Trophy, Star, Zap } from 'lucide-react'
import { ModernBackground } from '@/components/modern-background'

export default function Certificates() {
  const certificatesList = [
    {
      title: 'Certificate of Recognition',
      issuer: 'CEAP',
      achievement: '2026 CEAP Meet 1st Runner Volleyball Mens',
      description: 'Recognition for 1st runner-up achievement in volleyball mens category at CEAP Meet 2026',
      year: '2026',
      category: 'Sports & Activities'
    },
    {
      title: 'Certificate of Academic Excellence',
      issuer: 'St. Paul University Philippines',
      achievement: "President's List",
      description: 'Awarded for outstanding academic performance and excellence in studies',
      year: '2024',
      category: 'Academic Excellence'
    },
    {
      title: 'Certificate of Recognition',
      issuer: 'St. Paul University Philippines',
      achievement: 'SPUP Paskuhan 2023 Volleyball',
      description: 'Recognition for outstanding participation in the university volleyball competition',
      year: '2023',
      category: 'Sports & Activities'
    },
    {
      title: 'Certificate of Recognition',
      issuer: 'Cagayan State University',
      achievement: 'Cluster Meet 2023',
      description: 'Recognized for participation in the inter-school cluster academic competition',
      year: '2023',
      category: 'Academic Competition'
    },
    {
      title: 'Certificate of Recognition',
      issuer: 'St. Paul University Philippines',
      achievement: 'SPUP Paskuhan 2023 Folk Dance',
      description: 'Recognition for cultural contribution through folk dance performance',
      year: '2023',
      category: 'Cultural Events'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'St. Paul University Philippines',
      achievement: 'IT Cybersecurity Roadshow',
      description: 'Participated in cybersecurity awareness and training roadshow',
      year: '2024',
      category: 'Training & Workshops'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'St. Paul University Philippines',
      achievement: 'ITE CONVENTION 2025',
      description: 'Participated in the Information Technology Engineering Convention 2025',
      year: '2025',
      category: 'Conferences'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'St. Paul University Philippines',
      achievement: 'SITE Film Festival 2025',
      description: 'Participated in the Science and Information Technology Excellence Film Festival',
      year: '2025',
      category: 'Events'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'St. Paul University Philippines',
      achievement: 'ITE CONVENTION 2024',
      description: 'Participated in the Information Technology Engineering Convention 2024',
      year: '2024',
      category: 'Conferences'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'St. Paul University Philippines',
      achievement: 'Cyber Summit 2023',
      description: 'Participated in cybersecurity and innovation summit focused on sustainable development',
      year: '2023',
      category: 'Conferences'
    }
  ]

  const categories = ['All', 'Academic Excellence', 'Conferences', 'Training & Workshops', 'Sports & Activities', 'Cultural Events', 'Academic Competition', 'Events']
  
  const certByCategory = certificatesList.reduce((acc, cert) => {
    if (!acc[cert.category]) acc[cert.category] = []
    acc[cert.category].push(cert)
    return acc
  }, {} as Record<string, typeof certificatesList>)

  const certsByYear = certificatesList.reduce((acc, cert) => {
    if (!acc[cert.year]) acc[cert.year] = []
    acc[cert.year].push(cert)
    return acc
  }, {} as Record<string, typeof certificatesList>)

  const sortedYears = Object.keys(certsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className="min-h-screen flex flex-col relative pb-20 md:pb-0">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 relative z-10">
        <div className="mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Certificates & Recognition
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-1">Achievements, certifications, and recognitions across various fields</p>
        </div>

        {/* Statistics */}
        <section className="mb-16 pb-16 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Achievements Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-interactive bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{certificatesList.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Certificates</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">{Object.keys(certByCategory).length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Academic Excellence</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">{sortedYears.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Active</p>
            </div>
          </div>
        </section>

        {/* Certificates by Year */}
        <section className="mb-20">
          {sortedYears.map((year, yearIndex) => (
            <div key={year} className="mb-16 pb-16 border-b border-gray-200 dark:border-slate-800 last:border-b-0 animate-fadeIn" style={{ animationDelay: `${yearIndex * 50}ms` }}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                {year}
              </h2>
              <div className="space-y-4">
                {certsByYear[year].map((cert, index) => (
                  <div key={index} className="card-interactive group bg-gradient-to-r from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{cert.achievement}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                        {cert.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-semibold">Issued by:</span> {cert.issuer}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Category Breakdown */}
        <section className="mb-20 pt-8 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Recognition by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(certByCategory)
              .sort((a, b) => b[1].length - a[1].length)
              .map(([category, certs]) => (
                <div key={category} className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category}</h3>
                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
                      {certs.length}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {certs.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">•</span>
                        <span className="text-sm">{cert.achievement} <span className="text-gray-500 dark:text-gray-500">({cert.year})</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="pt-8 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Key Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-interactive bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Academic Excellence</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Consistent academic recognition with President's List achievement, demonstrating commitment to learning and excellence.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Active Engagement</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Regular participation in cutting-edge technology conferences and workshops to stay ahead of industry trends.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Well-Rounded Growth</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Recognition across academics, sports, and cultural activities showcase balanced and comprehensive personal development.
              </p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Continuous Innovation</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Ongoing involvement in cybersecurity and IT-related initiatives demonstrates commitment to technical excellence.
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
