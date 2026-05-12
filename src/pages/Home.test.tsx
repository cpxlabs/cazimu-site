import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home page', () => {
  it('renders hero title and the new architecture sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /cazimu/i })).toBeInTheDocument()
    expect(screen.getByText(/music house para artistas independentes/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /nova arquitetura do site/i })).toBeInTheDocument()
  })
})
