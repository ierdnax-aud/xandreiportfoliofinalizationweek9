'use client'

export function ModernBackground() {
  return (
    <>
      {/* Premium Gradient Base */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
      
      {/* Enhanced Animated Blur Orbs with Better Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15"
          style={{ animation: 'blob 8s infinite' }}
        />
        <div 
          className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-10"
          style={{ animation: 'blob 8s infinite 2s' }}
        />
        <div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15"
          style={{ animation: 'blob 8s infinite 4s' }}
        />
        
        {/* Additional accent blob for depth */}
        <div 
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
      </div>

      {/* Enhanced Grid Pattern */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05] -z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Radial gradient vignette for depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none" />

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.2;
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
            opacity: 0.25;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
            opacity: 0.15;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  )
}
