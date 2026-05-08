import React from 'react'

interface SubLink {
  label: string
  href: string
  active?: boolean
}

interface NavItemProps {
  children: React.ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
  subLinks?: SubLink[]
}

export function NavItem({ children, href, active, onClick, subLinks }: NavItemProps) {
  const cls = `nav-item${active ? ' active' : ''}`

  if (subLinks && subLinks.length > 0) {
    const triggerStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '3px' }
    const trigger = href ? (
      <a href={href} className={cls} onClick={onClick} style={triggerStyle}>
        {children}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    ) : (
      <span className={cls} role="button" tabIndex={0} onClick={onClick} style={{ ...triggerStyle, cursor: 'default' }}>
        {children}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
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

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <span className={cls} onClick={onClick} role="button" tabIndex={0}>
      {children}
    </span>
  )
}
