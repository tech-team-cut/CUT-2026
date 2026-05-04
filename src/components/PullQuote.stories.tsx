import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { PullQuote } from './PullQuote'

const meta = {
  title: 'CUT/PullQuote',
  component: PullQuote,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PullQuote>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      'Proporcionar una educación de calidad que promueva la justicia social, el pensamiento crítico y la inclusión.',
  },
}
