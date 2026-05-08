import React from 'react'

interface NewsCardProps {
  date: string
  title: string
  excerpt?: string
  href?: string
  imageSrc?: string
  imageAlt?: string
  imageRatio?: string
}

export function NewsCard({ date, title, excerpt, href, imageSrc, imageAlt, imageRatio }: NewsCardProps) {
  return (
    <article className="news-item">
      {imageSrc
        ? <img src={imageSrc} alt={imageAlt ?? ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
        : (
          <div className="ph" style={{ aspectRatio: '4/3' }}>
            <span>NEWS · {imageRatio ?? '4:3'}<br />placeholder.jpg</span>
          </div>
        )
      }
      <div style={{ marginTop: '1rem' }}>
        <div className="date-badge"><span className="dot" />{date}</div>
        <h3 style={{ marginTop: '0.5rem' }}>{title}</h3>
        {excerpt && <p>{excerpt}</p>}
        {href && <a className="news-more" href={href}>Leer más →</a>}
      </div>
    </article>
  )
}
