import React, { useState, useEffect } from 'react'
import { Brand } from '../Brand'

// ── Types ────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href?: string
  active?: boolean
  subLinks?: Array<{ label: string; href: string; active?: boolean }>
}

export interface HeaderProps {
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
}

// ── Icons ────────────────────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

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

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

// ── Internal: desktop nav item with optional dropdown ─────────────────────────

function NavItem({ label, href, active, subLinks }: NavLink) {
  const cls = `nav-item${active ? ' active' : ''}`
  const triggerStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '3px' }

  if (subLinks && subLinks.length > 0) {
    const trigger = href ? (
      <a href={href} className={cls} style={triggerStyle}>
        {label}<ChevronDownIcon />
      </a>
    ) : (
      <span className={cls} role="button" tabIndex={0} style={{ ...triggerStyle, cursor: 'default' }}>
        {label}<ChevronDownIcon />
      </span>
    )
    return (
      <div className={`nav-item-dropdown${active ? ' active' : ''}`}>
        {trigger}
        <div className="nav-item-dropdown__panel">
          {subLinks.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              className={`nav-item-dropdown__item${sub.active ? ' nav-item-dropdown__item--active' : ''}`}
            >
              {sub.label}
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (href) return <a href={href} className={cls}>{label}</a>
  return <span className={cls} role="button" tabIndex={0}>{label}</span>
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Header({ navLinks, ctaLabel, ctaHref }: HeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="site-header">
      {/* Utility strip */}
      <div className="util-bar">
        <div className="util-bar__links">
          <a href="https://maps.app.goo.gl/8m1S2xpRFPzJgX6EA" target="_blank" rel="noopener noreferrer">
            📍 Estado de México
          </a>
        </div>
        <div className="util-bar__social">
          <a href="https://www.facebook.com/CentroUniversitarioTlacaelel" aria-label="facebook">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/cut_ixtapaluca" aria-label="instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="header-bar">
        <Brand />
        <nav className="header-nav">
          {navLinks?.map((l) => (
            <NavItem key={l.label} {...l} />
          ))}
        </nav>
        <div className="header-actions">
{ctaLabel && (
            <a className="btn btn-primary header-cta" href={ctaHref ?? '#'}>
              {ctaLabel}
            </a>
          )}
          <button
            className="hamburger-btn"
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="mobile-nav" role="dialog" aria-label="Menú de navegación">
          <button className="mobile-nav__close" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <CloseIcon />
          </button>
          {navLinks?.map((link) => (
            <div key={link.label} className="mobile-nav__item">
              {link.href ? (
                <a
                  href={link.href}
                  className={`mobile-nav__link${link.active ? ' active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <span className="mobile-nav__link mobile-nav__link--group">{link.label}</span>
              )}
              {link.subLinks && link.subLinks.length > 0 && (
                <div className="mobile-nav__sub">
                  {link.subLinks.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className={`mobile-nav__sub-link${sub.active ? ' active' : ''}`}
                      onClick={() => setOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-nav__footer">
            {ctaLabel && (
              <a className="btn btn-primary" href={ctaHref ?? '#'} style={{ justifyContent: 'center' }}>
                {ctaLabel}
              </a>
            )}
            <a className="btn btn-dark-border" href="https://aula.cut.edu.mx" style={{ justifyContent: 'center' }}>
              Aula virtual →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
