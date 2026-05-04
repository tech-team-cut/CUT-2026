import React from 'react'
import { Brand } from '../Brand'
import { NavItem } from '../NavItem'
import { UtilityBar } from '../UtilityBar'

interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface HeaderProps {
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
}

const defaultNavLinks: NavLink[] = [
  { label: 'Inicio', href: '#', active: true },
  { label: 'Estudio', href: '#' },
  { label: 'Noticias', href: '#' },
  { label: 'Sobre nosotros', href: '#' },
  { label: 'Bolsa de trabajo', href: '#' },
]

export function Header({ navLinks = defaultNavLinks, ctaLabel, ctaHref }: HeaderProps) {
  return (
    <header>
      <UtilityBar
        links={[
          { label: 'Convocatoria 2026-1', href: '#' },
          { label: 'Aula virtual', href: '#' },
          { label: 'Servicios escolares', href: '#' },
        ]}
        location="Estado de México"
        socialLinks={[
          { platform: 'facebook', href: '#' },
          { platform: 'instagram', href: '#' },
        ]}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '2rem',
          height: '84px',
          padding: '0 2rem',
          borderBottom: '1px solid var(--outline-soft)',
          background: 'var(--surface-bright)',
        }}
      >
        <Brand />
        <nav style={{ display: 'flex', gap: '1.75rem', justifyContent: 'center' }}>
          {navLinks.map((l) => (
            <NavItem key={l.label} href={l.href} active={l.active}>
              {l.label}
            </NavItem>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <button className="icon-btn" aria-label="Buscar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          {ctaLabel && (
            <a className="btn btn-primary" href={ctaHref ?? '#'}>
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
