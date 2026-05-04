import React from 'react'

interface KeyDateProps {
  day: string
  month: string
  label: string
  description?: string
}

export function KeyDate({ day, month, label, description }: KeyDateProps) {
  return (
    <div className="key-date">
      <div className="d">
        {day}
        <span>{month}</span>
      </div>
      <div>
        <div className="kl">{label}</div>
        {description && <div className="kd">{description}</div>}
      </div>
    </div>
  )
}
