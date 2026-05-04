import React from 'react'

type ProgramVariant = 'default' | 'featured' | 'master'

interface ProgramCardProps {
  index: string
  title: string
  meta: string
  href?: string
  variant?: ProgramVariant
}

export function ProgramCard({ index, title, meta, href, variant = 'default' }: ProgramCardProps) {
  const className = `prog${variant === 'featured' ? ' prog--featured' : variant === 'master' ? ' prog--master' : ''}`

  const content = (
    <>
      <div className="idx">{index}</div>
      <h4>{title}</h4>
      <div className="prog-meta">
        <span>{meta}</span>
        <span className="arrow">→</span>
      </div>
    </>
  )

  if (href) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }

  return (
    <div className={className}>
      {content}
    </div>
  )
}
