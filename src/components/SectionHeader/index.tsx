import React from 'react'

interface SectionHeaderProps {
  num: string
  title: React.ReactNode
  description?: string
}

export function SectionHeader({ num, title, description }: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <div>
        <div className="num">{num}</div>
        <h2>{title}</h2>
      </div>
      <div />
      {description && <p className="desc">{description}</p>}
    </div>
  )
}
