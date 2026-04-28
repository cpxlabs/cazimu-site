import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Portfolio from './Portfolio'

describe('Portfolio page', () => {
  it('renders versioned catalog instead of admin-dependent empty state', () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /catálogo em destaque/i })).toBeInTheDocument()
    expect(screen.queryByText(/nenhuma obra cadastrada ainda/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/mar aberto - youtube player/i)).toBeInTheDocument()
  })
})
