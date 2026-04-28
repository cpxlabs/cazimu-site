import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { featuredReleases } from '../content/siteContent'
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
  })

  it('renders all releases from the static catalog regardless of shuffle order', () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )

    for (const release of featuredReleases) {
      expect(screen.getByRole('heading', { name: release.title })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('link', { name: /abrir lançamento/i })).toHaveLength(
      featuredReleases.length
    )
  })
})
