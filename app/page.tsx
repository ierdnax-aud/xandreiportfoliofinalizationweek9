import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Mail, Code2, Award, BookOpen, ArrowRight } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { HoverLink } from '@/components/hover-link'
import { ModernBackground } from '@/components/modern-background'

export default async function Home() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen flex flex-col relative pb-20 md:pb-0">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-20 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight mb-4">
                  Jan Xandrei Padua
                </h1>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge-primary">Information Technology Student</span>
                  <span className="badge-secondary">Third Year</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                Passionate about crafting intelligent solutions through <span className="text-indigo-600 font-semibold">AI</span>, <span className="text-purple-600 font-semibold">web development</span>, and emerging technologies.
              </p>
              
              <div className="flex items-center gap-3 text-lg">
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Tuguegarao City, Cagayan</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">
                Currently working on <HoverLink text="Beaconet" />, a proximity grid system for lost item tracking with AI capabilities.
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <img 
                  src="/profileheroxandrei25.jpg" 
                  alt="Jan Padua" 
                  className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl shadow-2xl object-cover ring-2 ring-white/50 dark:ring-white/10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: 'Projects', value: '10+' },
            { label: 'Languages', value: '8+' },
            { label: 'Certifications', value: '15+' },
          ].map((stat, index) => (
            <div key={index} className="group card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 text-center" style={{ animationDelay: `${index * 50}ms` }}>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section className="mb-20 pb-16 border-b border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">About</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Third-year <HoverLink text="Information Technology" /> student at <HoverLink text="St. Paul University Philippines" />, driven by curiosity and a passion for solving real-world problems with technology. I thrive in environments where innovation meets practical application.
            </p>
            <div className="card-interactive bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-8 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Specialties</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Full-stack web development</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-600 rounded-full" /> AI & Machine Learning</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Security & Penetration Testing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-20 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Explore</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {[
              { label: 'Education & Timeline', href: '/education', icon: BookOpen },
              { label: 'Technical Skills', href: '/skills', icon: Code2 },
              { label: 'Events & Speaking', href: '/events', icon: Award },
              { label: 'Certificates', href: '/certificates', icon: Award },
            ].map((link, index) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group card-interactive bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl px-8 py-8 flex items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-600"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                      <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                      {link.label}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Discover more</p>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section className="pt-16 border-t border-gray-200 dark:border-slate-800 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
          </div>
          
          <div className="card-interactive bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl px-8 py-12 max-w-2xl">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Interested in connecting? Let's collaborate on something amazing.
            </p>
            <a href="mailto:janpadua@spup.edu.ph" className="btn-primary inline-flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Send me an email
            </a>
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
