import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Portfolio, { parseObras, toEmbedUrl } from './Portfolio'

describe('Portfolio helpers', () => {
  it('converts regular YouTube watch URLs to embed URLs', () => {
    expect(toEmbedUrl('https://www.youtube.com/watch?v=abc123')).toBe(
      'https://www.youtube.com/embed/abc123'
    )
  })

  it('returns empty list for invalid JSON when parsing obras', () => {
    expect(parseObras('{invalid json')).toEqual([])
  })

  it('filters invalid obra entries while parsing', () => {
    const value = JSON.stringify([
      { titulo: 'Obra válida', link: 'https://www.youtube.com/embed/ok' },
      { titulo: 'Sem link' },
      'item inválido',
    ])

    expect(parseObras(value)).toEqual([
      { titulo: 'Obra válida', link: 'https://www.youtube.com/embed/ok' },
    ])
  })
})

describe('Portfolio page', () => {
  it('renders empty state when there are no saved obras', () => {
    localStorage.removeItem('obras')

    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )

    expect(screen.getByText(/nenhuma obra cadastrada ainda/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /adicione pelo painel admin/i })).toBeInTheDocument()
  })

  it('renders saved obra and iframe player when obras exist', () => {
    localStorage.setItem(
      'obras',
      JSON.stringify([{ id: 1, titulo: 'Minha Música', link: 'https://www.youtube.com/watch?v=abc123' }])
    )

    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /minha música/i })).toBeInTheDocument()
    expect(screen.getByTitle(/minha música - youtube player/i)).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc123'
    )
  })
})
