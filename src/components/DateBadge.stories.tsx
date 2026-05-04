import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateBadge } from './DateBadge'

const meta = {
  title: 'CUT/DateBadge',
  component: DateBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '25 Junio 2025',
  },
}
