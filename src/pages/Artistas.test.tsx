import { render, screen } from '@testing-library/react'
import Artistas from './Artistas'

describe('Artistas page', () => {
  it('renders roster heading and seeded artists', () => {
    render(<Artistas />)

    expect(screen.getByRole('heading', { name: /nossos artistas/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /luna maré/i })).toBeInTheDocument()
  })
})
