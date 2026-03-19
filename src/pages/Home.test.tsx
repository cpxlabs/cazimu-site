import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home page', () => {
  it('renders hero title and primary CTA', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /cazimu/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /conheça nossos serviços/i })).toBeInTheDocument()
  })
})
