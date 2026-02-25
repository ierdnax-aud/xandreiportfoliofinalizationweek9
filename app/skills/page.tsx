import { Navigation } from '@/components/navigation'
import { HoverLink } from '@/components/hover-link'
import { Code2 } from 'lucide-react'
import { ModernBackground } from '@/components/modern-background'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend Development',
      skills: ['React', 'Next.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
      description: 'Building responsive and interactive user interfaces'
    },
    {
      category: 'Backend Development',
      skills: ['PHP', 'Laravel', 'Python', 'Node.js', 'SQL'],
      description: 'Creating robust and scalable server-side solutions'
    },
    {
      category: 'AI & Machine Learning',
      skills: ['RAG AI', 'Python Libraries', 'Decision Support Systems'],
      description: 'Implementing intelligent algorithms and AI applications'
    },
    {
      category: 'Hardware & IoT',
      skills: ['Arduino', 'Microcontroller Programming', 'IoT Systems'],
      description: 'Developing embedded systems and IoT solutions'
    },
    {
      category: 'Other Technologies',
      skills: ['Java', 'Database Design', 'API Development', 'Git'],
      description: 'Additional tools and technologies in my toolkit'
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Code2 className="w-10 h-10 text-slate-700" />
            Technical Skills
          </h1>
          <p className="text-gray-600 mt-2">Technologies and expertise I work with</p>
        </div>

        {/* All Skills at a Glance */}
        <section className="mb-12 pb-12 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">All Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React', 'Next.js', 'JavaScript', 'Python', 'PHP', 'Laravel', 'SQL', 'HTML/CSS', 'Java', 'Arduino', 'RAG AI', 'Node.js', 'Tailwind CSS', 'Git', 'APIs', 'Databases'].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 hover:bg-gray-100 rounded px-4 py-3 text-center text-gray-800 font-medium text-sm transition-colors cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Categories */}
        <section className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.category} className="pb-8 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{category.category}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="inline-block bg-slate-100 text-slate-900 rounded-full px-4 py-2 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Proficiency Levels */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Proficiency Levels</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900">Frontend Development (React, Next.js)</p>
                <span className="text-sm text-gray-600">Advanced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900">Backend Development (PHP, Python)</p>
                <span className="text-sm text-gray-600">Advanced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900">AI & Machine Learning</p>
                <span className="text-sm text-gray-600">Intermediate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900">IoT & Arduino</p>
                <span className="text-sm text-gray-600">Intermediate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900">Database Design & SQL</p>
                <span className="text-sm text-gray-600">Advanced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning & Growth */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Continuous Learning</h2>
          <p className="text-gray-700 mb-4">
            I'm constantly expanding my technical knowledge through:
          </p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex gap-3">
              <span className="text-slate-700 font-bold">•</span>
              <span>Attending tech conferences and workshops</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-700 font-bold">•</span>
              <span>Working on real-world projects and capstone initiatives</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-700 font-bold">•</span>
              <span>Exploring emerging technologies and frameworks</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-700 font-bold">•</span>
              <span>Contributing to collaborative projects and learning from peers</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2025 Jan Padua. Crafted with care.</p>
        </div>
      </footer>
    </div>
  )
}
