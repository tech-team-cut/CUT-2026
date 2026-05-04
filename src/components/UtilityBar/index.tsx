import React from 'react'

interface SocialLink {
  platform: 'facebook' | 'instagram'
  href: string
}

interface UtilityBarProps {
  links: Array<{ label: string; href: string }>
  location?: string
  socialLinks?: SocialLink[]
}

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
)

export function UtilityBar({ links, location, socialLinks }: UtilityBarProps) {
  return (
    <div className="util-bar">
      <div className="util-bar__links">
        {links.map((l, i) => (
          <React.Fragment key={l.label}>
            {i > 0 && <span className="sep">/</span>}
            <a href={l.href}>{l.label}</a>
          </React.Fragment>
        ))}
      </div>
      <div className="util-bar__social">
        {location && <span>📍 {location}</span>}
        {socialLinks?.map((s) => (
          <a key={s.platform} href={s.href} aria-label={s.platform}>
            {s.platform === 'facebook' ? <FacebookIcon /> : <InstagramIcon />}
          </a>
        ))}
      </div>
    </div>
  )
}
