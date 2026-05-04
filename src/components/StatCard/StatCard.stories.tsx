import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './index'

const meta = {
  title: 'CUT/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '7',
    suffix: '+',
    label: 'Licenciaturas',
  },
}

export const WithYears: Story = {
  args: {
    value: '15',
    suffix: 'yr',
    label: 'De Trayectoria',
  },
}

export const NoSuffix: Story = {
  args: {
    value: '3',
    label: 'Maestrías',
  },
}
