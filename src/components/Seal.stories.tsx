import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Seal } from './Seal'

const meta = {
  title: 'CUT/Seal',
  component: Seal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Seal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'RVOE · SEP · Acreditación Vigente',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0a1124', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}
