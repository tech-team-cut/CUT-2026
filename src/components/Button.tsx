import React from 'react'

interface ButtonProps {
  variant: 'primary' | 'outline' | 'ghost' | 'dark-border' | 'icon'
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  'aria-label'?: string
  className?: string
}

export function Button({ variant, children, href, onClick, 'aria-label': ariaLabel, className }: ButtonProps) {
  if (variant === 'icon') {
    return (
      <button
        className="icon-btn"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }

  const cls = `btn btn-${variant}${className ? ` ${className}` : ''}`

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
