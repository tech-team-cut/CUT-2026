import React from 'react'

interface EyebrowProps {
  children: React.ReactNode
  dark?: boolean
}

export function Eyebrow({ children, dark }: EyebrowProps) {
  return (
    <span className={dark ? 'eyebrow eyebrow--light' : 'eyebrow'}>
      {children}
    </span>
  )
}
