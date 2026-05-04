import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeaturedAvisoCard } from './FeaturedAvisoCard'

const meta = {
  title: 'CUT/FeaturedAvisoCard',
  component: FeaturedAvisoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FeaturedAvisoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    day: '29',
    monthYear: 'Junio 25',
    kicker: 'Aviso Académico',
    title: 'Examen de admisión — Primera vuelta',
    meta: 'Resultados disponibles en línea. Consulta el listado oficial.',
    linkText: 'Ver resultados →',
  },
}
