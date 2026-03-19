type Pilar = {
  titulo: string
  descricao: string
}

const pilares: Pilar[] = [
  {
    titulo: 'Direção Artística',
    descricao:
      'Construção de posicionamento, narrativa e identidade sonora com foco em diferenciação.',
  },
  {
    titulo: 'Estrutura de Lançamento',
    descricao:
      'Planejamento de calendário, conteúdos e entregáveis para cada etapa da campanha.',
  },
  {
    titulo: 'Inteligência de Mercado',
    descricao:
      'Leitura de dados e oportunidades para crescimento consistente em plataformas digitais.',
  },
]

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
            <span className="value">2019</span>
            <span className="label">Início da operação</span>
          </div>
          <div className="bio-stat">
            <span className="value">+40</span>
            <span className="label">Artistas atendidos</span>
          </div>
          <div className="bio-stat">
            <span className="value">360</span>
            <span className="label">Visão de carreira</span>
          </div>
        </div>

        <div className="card-grid cols-3 bio-pillars">
          {pilares.map((pilar) => (
            <div key={pilar.titulo} className="card">
              <h3>{pilar.titulo}</h3>
              <p>{pilar.descricao}</p>
            </div>
          ))}
        </div>

        <div className="bio-quote">
          <p>
            "Nosso trabalho é transformar música em projeto sustentável, sem
            perder a essência do artista."
          </p>
          <span>Equipe Cazimu</span>
        </div>
      </div>
    </div>
  )
}
