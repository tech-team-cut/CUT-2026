import React from 'react'

export function Brand() {
  return (
    <a href="/" className="brand-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
      <img src="/CUT - transparent.webp" alt="CUT" height={52} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--secondary-soft)',
          lineHeight: 1,
        }}>
          Centro Universitario
        </div>
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--secondary)',
          lineHeight: 1.2,
        }}>
          Tlacaélel
        </div>
      </div>
    </a>
  )
}
