import React, { useState, useEffect } from 'react'

export interface AnnouncementModalProps {
  id: string
  title: string
  ctaLabel?: string | null
  ctaHref?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

const STORAGE_KEY = (id: string) => `announcement-dismissed-${id}`

export function AnnouncementModal({ id, title, ctaLabel, ctaHref, imageUrl, imageAlt }: AnnouncementModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY(id))) {
      setVisible(true)
    }
  }, [id])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY(id), '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="announcement-backdrop" onClick={dismiss}>
      <div className="announcement-card" onClick={(e) => e.stopPropagation()}>
        <button className="announcement-close" onClick={dismiss} aria-label="Cerrar anuncio">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {imageUrl && (
          <img
            className="announcement-image"
            src={imageUrl}
            alt={imageAlt ?? ''}
          />
        )}
        <p className="announcement-title">{title}</p>
        {ctaLabel && ctaHref && (
          <a className="announcement-cta btn btn-primary" href={ctaHref} onClick={dismiss}>
            {ctaLabel} →
          </a>
        )}
      </div>
    </div>
  )
}
