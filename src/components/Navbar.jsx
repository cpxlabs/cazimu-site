import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.png'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Início' },
    { to: '/bio', label: 'Bio' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/portfolio', label: 'Portfólio' },
    { to: '/contato', label: 'Contato' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <header className="nav">
      <Link to="/">
        <img src={logo} className="logo" alt="Cazimu" />
      </Link>

      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={pathname === to ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
