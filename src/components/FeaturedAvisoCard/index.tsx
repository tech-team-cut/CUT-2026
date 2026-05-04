import React from 'react'

interface FeaturedAvisoCardProps {
  day: string
  monthYear: string
  kicker: string
  title: string
  meta: string
  linkText?: string
  href?: string
}

export function FeaturedAvisoCard({ day, monthYear, kicker, title, meta, linkText, href }: FeaturedAvisoCardProps) {
  return (
    <div className="feat-card">
      <div className="date-col">
        {day}
        <span>{monthYear}</span>
      </div>
      <div>
        <div className="kicker">{kicker}</div>
        <h4>{title}</h4>
        <div className="meta">{meta}</div>
        {linkText && (
          href
            ? <a className="news-more" href={href}>{linkText}</a>
            : <span className="news-more">{linkText}</span>
        )}
      </div>
    </div>
  )
}
