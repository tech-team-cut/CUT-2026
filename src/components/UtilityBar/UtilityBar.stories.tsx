import type { Meta, StoryObj } from '@storybook/react-vite'
import { UtilityBar } from './index'

const meta = {
  title: 'CUT/UtilityBar',
  component: UtilityBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UtilityBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [
      { label: 'Convocatoria 2026-1', href: '#' },
      { label: 'Aula virtual', href: '#' },
      { label: 'Servicios escolares', href: '#' },
    ],
    location: 'Estado de México',
    socialLinks: [
      { platform: 'facebook', href: '#' },
      { platform: 'instagram', href: '#' },
    ],
  },
}
