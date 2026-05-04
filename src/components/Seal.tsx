import React from 'react'

interface SealProps {
  children: React.ReactNode
}

export function Seal({ children }: SealProps) {
  return (
    <span className="seal">{children}</span>
  )
}
