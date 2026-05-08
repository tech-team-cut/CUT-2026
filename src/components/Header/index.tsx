import React, { useState, useEffect } from 'react'
import { NavItem } from '../NavItem'
import { UtilityBar } from '../UtilityBar'
import { Brand } from '../Brand'

interface NavLink {
  label: string
  href?: string
  active?: boolean
  subLinks?: Array<{ label: string; href: string; active?: boolean }>
}

interface HeaderProps {
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  locationLeft?: boolean
}

export function Header({ navLinks, ctaLabel, ctaHref, locationLeft }: HeaderProps) {
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
      <UtilityBar
        links={[
          { label: 'Convocatoria 2026-1', href: '/convocatoria' },
          { label: 'Aula virtual', href: 'https://aula.cut.edu.mx' },
          {
            label: 'Servicios escolares',
            href: '/servicios-escolares',
            subLinks: [
              { label: 'Trámites control escolar', href: '/servicios-escolares/tramites' },
              { label: 'Titulación', href: '/servicios-escolares/titulacion' },
              { label: 'Servicio social', href: '/servicios-escolares/servicio-social' },
              { label: 'Biblioteca', href: '/servicios-escolares/biblioteca' },
              { label: 'Becas', href: '/servicios-escolares/becas' },
            ],
          },
        ]}
        location="Estado de México"
        socialLinks={[
          { platform: 'facebook', href: 'https://www.facebook.com/CentroUniversitarioTlacaelel' },
          { platform: 'instagram', href: 'https://www.instagram.com/cut_ixtapaluca' },
        ]}
        locationLeft={locationLeft}
      />
      <div className="header-bar">
        <Brand />
        <nav className="header-nav">
          {navLinks?.map((l) => (
            <NavItem key={l.label} href={l.href} active={l.active} subLinks={l.subLinks}>
              {l.label}
            </NavItem>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn header-search" aria-label="Buscar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
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
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav" role="dialog" aria-label="Menú de navegación">
          <button
            className="mobile-nav__close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
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
