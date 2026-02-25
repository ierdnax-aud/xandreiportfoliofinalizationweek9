import { Navigation } from '@/components/navigation'
import { HoverLink } from '@/components/hover-link'
import { BookOpen, Award, Target } from 'lucide-react'
import { ModernBackground } from '@/components/modern-background'
import { Timeline } from '@/components/timeline'

export default function Education() {
  const educationTimeline = [
    {
      year: '2023 – Present',
      title: 'Bachelor of Science in Information Technology',
      subtitle: 'St. Paul University Philippines',
      description: 'Capstone Project: Beaconet - Proximity Grid for Lost Item Tracking with AI Application and Decision Support',
      status: 'completed' as const
    },
    {
      year: '2021 – 2023',
      title: 'Senior High School',
      subtitle: 'Veridiano Sto. Niño Institute',
      description: 'Completed senior high school education with strong academic foundation',
      status: 'completed' as const
    },
    {
      year: '2017 – 2021',
      title: 'Junior High School',
      subtitle: 'Veridiano Sto. Niño Institute',
      description: 'Foundational years where interest in technology and programming began',
      status: 'completed' as const
    }
  ]

  return (
    <div className="min-h-screen flex flex-col relative pb-20 md:pb-0">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 relative z-10">
        <div className="mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-1">My academic journey and learning path</p>
        </div>

        {/* Timeline */}
        <section className="mb-16 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <Timeline items={educationTimeline} />
        </section>

        {/* Key Achievements */}
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Academic Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border-l-4 border-indigo-600">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">President's List</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Certificate of Academic Excellence for outstanding academic performance</p>
            </div>
            <div className="card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border-l-4 border-purple-600">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Technical Focus</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Specializing in <HoverLink text="AI" />, <HoverLink text="Web Development" />, and emerging technologies</p>
            </div>
          </div>
        </section>

        {/* Skills Developed */}
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Skills Developed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Full-stack web development with modern frameworks',
              'Artificial Intelligence and machine learning',
              'Database design and management',
              'IoT development and microcontroller programming',
              'Problem-solving and analytical thinking',
              'Team collaboration and leadership'
            ].map((skill, index) => (
              <div key={index} className="card-interactive bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-2" />
                <span className="text-gray-700 dark:text-gray-300">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-8 mt-20 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 Jan Xandrei Padua. Crafted with care and passion for excellence.</p>
        </div>
      </footer>
    </div>
  )
}
