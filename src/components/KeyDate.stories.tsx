import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { KeyDate } from './KeyDate'

const meta = {
  title: 'CUT/KeyDate',
  component: KeyDate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof KeyDate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    day: '25',
    month: 'Junio',
    label: 'Examen de Admisión',
    description: 'Primera vuelta de selección',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0f172a', padding: '2rem', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const KeyDateList: Story = {
  render: () => (
    <div style={{ background: '#0f172a', padding: '2rem', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <KeyDate
        day="25"
        month="Junio"
        label="Examen de Admisión"
        description="Primera vuelta de selección"
      />
      <KeyDate
        day="10"
        month="Julio"
        label="Resultados"
        description="Publicación de lista de aceptados"
      />
      <KeyDate
        day="01"
        month="Agosto"
        label="Inicio de Clases"
        description="Ciclo escolar 2025–2026"
      />
    </div>
  ),
}
