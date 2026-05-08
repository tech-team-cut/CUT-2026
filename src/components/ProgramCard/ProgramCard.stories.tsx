import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgramCard } from './index'

const meta = {
  title: 'CUT/ProgramCard',
  component: ProgramCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgramCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    index: '— 01',
    title: 'Licenciatura en Derecho',
    meta: 'Licenciatura · 8 Sem.',
    variant: 'default',
  },
}

export const Featured: Story = {
  args: {
    index: '— 01',
    title: 'Licenciatura en Mercadotecnia',
    meta: 'Escolarizada · 8 sem.',
    variant: 'featured',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f2f4f6', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const Master: Story = {
  args: {
    index: 'M.02',
    title: 'Maestría en Ciencias de la Educación',
    meta: 'Maestría · 4 Sem.',
    variant: 'master',
  },
}
