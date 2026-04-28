import { Link } from 'react-router-dom'
import { publicNavigation } from '../content/siteContent'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            Caz<span className="accent">i</span>mu
          </div>
          <p className="footer-tagline">
            Music house com roster, catálogo e frente editorial para artistas independentes.
          </p>
        </div>

        <div className="footer-links" aria-label="Links rápidos">
          {publicNavigation.slice(1).map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} Cazimu.</p>
          <p>Criatividade, estratégia e execução.</p>
        </div>
      </div>
    </footer>
  )
}
