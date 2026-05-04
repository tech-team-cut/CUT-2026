import React from 'react'

interface ImagePlaceholderProps {
  context: string
  ratio: string
  filename: string
  dark?: boolean
  style?: React.CSSProperties
  className?: string
}

export function ImagePlaceholder({ context, ratio, filename, dark, style, className }: ImagePlaceholderProps) {
  const cls = `ph${dark ? ' ph--dark' : ''}${className ? ` ${className}` : ''}`
  return (
    <div className={cls} style={style}>
      <span>
        {context} · {ratio}<br />{filename}
      </span>
    </div>
  )
}
