import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewsCard } from './index'

const meta = {
  title: 'CUT/NewsCard',
  component: NewsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof NewsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '15 Mayo 2026',
    title: 'Examen de admisión — Segunda vuelta',
    excerpt: 'Los resultados del segundo proceso de selección están disponibles en el portal institucional.',
    href: '#',
  },
}

export const WithImage: Story = {
  args: {
    date: '15 Mayo 2026',
    title: 'Examen de admisión — Segunda vuelta',
    excerpt: 'Los resultados del segundo proceso de selección están disponibles en el portal institucional.',
    href: '#',
    imageSrc: 'https://placehold.co/400x300/eceef0/565e74?text=CAMPUS',
    imageAlt: 'Campus',
  },
}
