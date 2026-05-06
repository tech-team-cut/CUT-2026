import React from 'react'
import { NavItem } from '../NavItem'
import { UtilityBar } from '../UtilityBar'

interface NavLink {
  label: string
  href?: string
  active?: boolean
  subLinks?: Array<{ label: string; href: string }>
}

interface HeaderProps {
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  children?: React.ReactNode
}

export function Header({ navLinks, ctaLabel, ctaHref, children }: HeaderProps) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
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
          { platform: 'facebook', href: 'https://facebook.com/cutecatepec' },
          { platform: 'instagram', href: 'https://instagram.com/cutecatepec' },
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
        {children}
        <nav style={{ display: 'flex', gap: '1.75rem', justifyContent: 'center' }}>
          {navLinks?.map((l) => (
            <NavItem key={l.label} href={l.href} active={l.active} subLinks={l.subLinks}>
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
