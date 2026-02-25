'use client'

interface HoverLinkProps {
  href?: string
  text: string
  isExternal?: boolean
}

export function HoverLink({ href, text, isExternal }: HoverLinkProps) {
  const content = (
    <span className="relative inline-block">
      {text}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-700 transition-all duration-300 hover:w-full" />
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="cursor-pointer hover:text-slate-700 transition-colors"
      >
        {content}
      </a>
    )
  }

  return <span className="cursor-pointer hover:text-slate-700 transition-colors">{content}</span>
}
