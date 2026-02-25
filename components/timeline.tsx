'use client'

import { CheckCircle2 } from 'lucide-react'

interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description?: string
  status?: 'completed' | 'current' | 'upcoming'
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-200" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Timeline Dot */}
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
              item.status === 'current'
                ? 'bg-slate-900 ring-4 ring-gray-200'
                : 'bg-white border-2 border-gray-400'
            }`}>
              {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-slate-900" />}
              {item.status === 'current' && <div className="w-3 h-3 bg-white rounded-full animate-pulse" />}
            </div>

            {/* Content Card */}
            <div className={`card-hover bg-white/80 backdrop-blur-sm border-l-4 rounded-lg p-6 shadow-md ${
              item.status === 'current' ? 'border-slate-900' : 'border-gray-300'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.subtitle}</p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  item.status === 'current'
                    ? 'bg-gray-100 text-slate-900'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.year}
                </span>
              </div>
              {item.description && (
                <p className="text-gray-700 text-sm mt-3">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
