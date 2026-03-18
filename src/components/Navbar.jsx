import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="nav">
      <img src={logo} className="logo" alt="Cazimu" />
      <nav>
        <Link to="/">Início</Link>
        <Link to="/bio">Bio</Link>
        <Link to="/servicos">Serviços</Link>
        <Link to="/portfolio">Portfólio</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  )
}
