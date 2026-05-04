import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './index'

const meta = {
  title: 'CUT/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ctaLabel: 'Convocatoria 2026',
  },
}

export const NoNav: Story = {
  args: {
    navLinks: [],
    ctaLabel: 'Convocatoria 2026',
  },
}
