import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'
import { publicNavigation } from '../content/siteContent'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="nav">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={logo} className="logo" alt="Cazimu" />
        <div>
          <span className="brand-wordmark">Cazimu</span>
          <span className="brand-sub">music house</span>
        </div>
      </Link>

      {open && (
        <div
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={`nav-links${open ? ' open' : ''}`}>
        {publicNavigation.map(({ to, label }) => (
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
