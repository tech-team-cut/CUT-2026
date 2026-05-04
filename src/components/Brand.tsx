import React from 'react'

interface BrandProps {
  className?: string
}

export function Brand({ className }: BrandProps) {
  return (
    <div className={`brand-row${className ? ` ${className}` : ''}`}>
      <div className="crest">CUT</div>
      <div className="brand-text">
        <div className="top">Centro Universitario</div>
        <div className="main">Tlacaélel</div>
      </div>
    </div>
  )
}
