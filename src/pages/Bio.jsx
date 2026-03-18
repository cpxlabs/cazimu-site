export default function Bio() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Sobre a <span className="accent">Cazimu</span></h2>
        <p>Impulsionando talentos independentes no mercado fonográfico.</p>
      </div>

      <div className="bio-content">
        <p>
          A Cazimu é uma editora musical dedicada a conectar artistas
          independentes ao mercado fonográfico com profissionalismo e
          criatividade. Acreditamos no poder da música como forma de expressão
          e trabalhamos para que cada artista alcance o seu público.
        </p>

        <div className="bio-highlights">
          <div className="bio-stat">
            <span className="value">🎵</span>
            <span className="label">Distribuição digital</span>
          </div>
          <div className="bio-stat">
            <span className="value">🎧</span>
            <span className="label">Produção musical</span>
          </div>
          <div className="bio-stat">
            <span className="value">📈</span>
            <span className="label">Gestão de carreira</span>
          </div>
          <div className="bio-stat">
            <span className="value">🤝</span>
            <span className="label">Parceria criativa</span>
          </div>
        </div>
      </div>
    </div>
  )
}
