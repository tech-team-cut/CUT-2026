import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'CUT/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Solicitar Informes',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Ver Programas',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Conoce más →',
  },
}

export const DarkBorder: Story = {
  args: {
    variant: 'dark-border',
    children: 'Descargar Ficha',
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0f172a', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const Icon: Story = {
  args: {
    variant: 'icon',
    'aria-label': 'Buscar',
    children: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
}
