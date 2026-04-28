import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Lancamentos from './Lancamentos'
import LancamentoDetalhe from './LancamentoDetalhe'

describe('Lancamentos pages', () => {
  it('renders public releases with detail links', () => {
    render(
      <MemoryRouter>
        <Lancamentos />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /últimos lançamentos/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /capa mock de mar aberto/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /abrir lançamento/i })).toHaveLength(3)
  })

  it('renders release detail content with embedded player', () => {
    render(
      <MemoryRouter initialEntries={['/lancamentos/mar-aberto']}>
        <Routes>
          <Route path="/lancamentos/:releaseSlug" element={<LancamentoDetalhe />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /mar aberto/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /capa mock de mar aberto/i })).toBeInTheDocument()
    expect(screen.getByTitle(/mar aberto - player/i)).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc123'
    )
  })
})
