import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'

type NavLinkItem = {
  to: string
  label: string
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links: NavLinkItem[] = [
    { to: '/', label: 'Início' },
    { to: '/bio', label: 'Bio' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/portfolio', label: 'Portfólio' },
    { to: '/contato', label: 'Contato' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <header className="nav">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={logo} className="logo" alt="Cazimu" />
        <span className="brand-wordmark">Cazimu</span>
      </Link>

      <nav className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        <Link to="/contato" className="nav-cta" onClick={() => setOpen(false)}>
          Vamos conversar
        </Link>
      </nav>

      <ThemeToggle />

      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
