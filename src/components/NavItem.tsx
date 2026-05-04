import React from 'react'

interface NavItemProps {
  children: React.ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
}

export function NavItem({ children, href, active, onClick }: NavItemProps) {
  const cls = `nav-item${active ? ' active' : ''}`

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
