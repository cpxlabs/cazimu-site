import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Artistas from './Artistas'
import ArtistaDetalhe from './ArtistaDetalhe'

describe('Artistas page', () => {
  it('renders roster heading and seeded artists', () => {
    render(
      <MemoryRouter>
        <Artistas />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /nossos artistas/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /luna maré/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /ver projeto/i })).toHaveLength(3)
  })

  it('renders artist detail route and updates document title', () => {
    render(
      <MemoryRouter initialEntries={['/artistas/luna-mare']}>
        <Routes>
          <Route path="/artistas/:artistSlug" element={<ArtistaDetalhe />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /luna maré/i })).toBeInTheDocument()
    expect(screen.getByText(/direções de trabalho/i)).toBeInTheDocument()
    expect(document.title).toMatch(/luna maré - artistas cazimu/i)
  })
})
