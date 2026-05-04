import React from 'react'

interface PillarProps {
  label: string
  heading: string
  body: string
}

export function Pillar({ label, heading, body }: PillarProps) {
  return (
    <div className="pillar">
      <div className="label">{label}</div>
      <div>
        <h3>{heading}</h3>
        <p>{body}</p>
      </div>
    </div>
  )
}
