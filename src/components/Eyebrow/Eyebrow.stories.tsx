import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eyebrow } from './index'

const meta = {
  title: 'CUT/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Eyebrow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Ciclo Escolar 2026 · Inscripciones Abiertas',
  },
}

export const OnDark: Story = {
  args: {
    children: 'Ciclo Escolar 2026 · Inscripciones Abiertas',
    dark: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0f172a', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}
