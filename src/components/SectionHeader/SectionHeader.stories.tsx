import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { SectionHeader } from './index'

const meta = {
  title: 'CUT/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    num: '— 02',
    title: 'Oferta educativa.',
    description:
      'Siete licenciaturas y posgrados, diseñados para dar respuesta a las demandas del entorno profesional contemporáneo.',
  },
}

export const NoDescription: Story = {
  args: {
    num: '— 03',
    title: 'Noticias.',
  },
}

export const MultilineTitle: Story = {
  render: (args) => <SectionHeader {...args} />,
  args: {
    num: '— 04',
    title: (
      <>
        Vida
        <br />
        universitaria.
      </>
    ),
  },
}
