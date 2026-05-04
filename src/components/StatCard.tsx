import React from 'react'

interface StatCardProps {
  value: string
  suffix?: string
  label: string
}

export function StatCard({ value, suffix, label }: StatCardProps) {
  return (
    <div className="stat">
      <div className="num">
        {value}
        {suffix && <sup>{suffix}</sup>}
      </div>
      <div className="lbl">{label}</div>
    </div>
  )
}
