import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImagePlaceholder } from './ImagePlaceholder'

const meta = {
  title: 'CUT/ImagePlaceholder',
  component: ImagePlaceholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImagePlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    context: 'CAMPUS',
    ratio: '4:3',
    filename: 'fachada-principal.jpg',
    style: { width: 300, height: 225 },
  },
}

export const Dark: Story = {
  args: {
    context: 'EVENT',
    ratio: '16:9',
    filename: 'espartaqueada.jpg',
    dark: true,
    style: { width: 300, height: 169 },
  },
}
