import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Pillar } from './Pillar'

const meta = {
  title: 'CUT/Pillar',
  component: Pillar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Pillar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '— Visión',
    heading: 'Excelencia con compromiso social.',
    body: 'Ser reconocidos como institución de excelencia en la formación de profesionales comprometidos con la justicia social.',
  },
}

export const Mision: Story = {
  args: {
    label: '— Misión',
    heading: 'Liberar educando.',
    body: 'Proporcionar una educación de calidad que promueva la justicia social, el pensamiento crítico y la inclusión.',
  },
}

export const PillarList: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Pillar
        label="— Visión"
        heading="Excelencia con compromiso social."
        body="Ser reconocidos como institución de excelencia en la formación de profesionales comprometidos con la justicia social."
      />
      <Pillar
        label="— Misión"
        heading="Liberar educando."
        body="Proporcionar una educación de calidad que promueva la justicia social, el pensamiento crítico y la inclusión."
      />
      <Pillar
        label="— Valores"
        heading="Integridad y vocación de servicio."
        body="Actuamos con ética, respeto y transparencia en cada decisión, guiados por un compromiso profundo con la comunidad."
      />
    </div>
  ),
}
