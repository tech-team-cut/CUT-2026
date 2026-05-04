import React from 'react'

interface PullQuoteProps {
  children: React.ReactNode
}

export function PullQuote({ children }: PullQuoteProps) {
  return <blockquote className="pull-q">{children}</blockquote>
}
