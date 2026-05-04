import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavItem } from './NavItem'

const meta = {
  title: 'CUT/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Inicio',
    active: false,
  },
}

export const Active: Story = {
  args: {
    children: 'Inicio',
    active: true,
  },
}

export const NavBar: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', padding: '1rem 2rem', borderBottom: '1px solid #d8dadc' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <nav style={{ display: 'flex', gap: '1.75rem' }}>
      <NavItem href="#" active>Inicio</NavItem>
      <NavItem href="#">Estudio</NavItem>
      <NavItem href="#">Noticias</NavItem>
      <NavItem href="#">Sobre nosotros</NavItem>
      <NavItem href="#">Bolsa de trabajo</NavItem>
    </nav>
  ),
}
