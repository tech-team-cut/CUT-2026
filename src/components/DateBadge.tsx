import React from 'react'

interface DateBadgeProps {
  date: string
}

export function DateBadge({ date }: DateBadgeProps) {
  return (
    <div className="date-badge">
      <span className="dot" />
      {date}
    </div>
  )
}
