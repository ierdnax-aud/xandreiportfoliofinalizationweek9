import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { HoverLink } from '@/components/hover-link'
import { ModernBackground } from '@/components/modern-background'

export default async function About() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ModernBackground />
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">About Me</h1>
          <p className="text-gray-600 mt-2">Learn more about my background and passion</p>
        </div>

        <section className="space-y-8">
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who I Am</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I'm a third-year <HoverLink text="Information Technology" /> student at <HoverLink text="St. Paul University Philippines" /> in Tuguegarao City, Cagayan. My journey in technology has been driven by curiosity and a passion for creating solutions that make a real impact.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Born on August 2, 2005, I've grown up in a rapidly evolving digital landscape. This exposure has shaped my interest in leveraging technology to solve complex problems and improve people's lives.
            </p>
          </div>

          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">My Passion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I'm deeply passionate about three core areas:
            </p>
            <ul className="space-y-3 text-gray-700 ml-4">
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span><HoverLink text="Artificial Intelligence" /> - Building intelligent systems that can learn and adapt</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span><HoverLink text="Web Development" /> - Creating beautiful, functional digital experiences</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span><HoverLink text="Emerging Technologies" /> - Staying at the forefront of innovation</span>
              </li>
            </ul>
          </div>

          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Projects</h2>
            <div className="bg-gray-50 rounded p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Beaconet</h3>
              <p className="text-gray-700 mb-3">
                <HoverLink text="Proximity Grid for Lost Item Tracking with AI Application and Decision Support" />
              </p>
              <p className="text-sm text-gray-600">
                My capstone project that combines IoT, proximity detection, and AI to help people locate lost items. This project represents my commitment to practical, innovative solutions.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Beyond Technology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When I'm not coding or working on tech projects, you can find me:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span>Participating in volleyball and folk dance events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span>Attending tech conferences and workshops to stay updated</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-700 font-bold">•</span>
                <span>Exploring new technologies and their practical applications</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Let's Connect</h2>
          <p className="text-gray-700 mb-4">
            Whether you're interested in technology, collaboration, or just want to chat, feel free to reach out at <HoverLink href="mailto:janpadua@spup.edu.ph" text="janpadua@spup.edu.ph" />.
          </p>
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
