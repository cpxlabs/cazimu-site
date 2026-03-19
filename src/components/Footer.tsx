import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            Caz<span className="accent">i</span>mu
          </div>
          <p className="footer-tagline">
            Editora musical para artistas independentes em crescimento.
          </p>
        </div>

        <div className="footer-links" aria-label="Links rápidos">
          <Link to="/bio">Bio</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/portfolio">Portfólio</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} Cazimu.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
