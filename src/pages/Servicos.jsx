const servicos = [
  {
    icon: '🌍',
    titulo: 'Distribuição Digital',
    descricao:
      'Coloque sua música em todas as plataformas digitais como Spotify, Apple Music, Deezer e mais.',
  },
  {
    icon: '🎙️',
    titulo: 'Produção Musical',
    descricao:
      'Estúdio completo para gravar, mixar e masterizar suas faixas com qualidade profissional.',
  },
  {
    icon: '📊',
    titulo: 'Gestão de Carreira',
    descricao:
      'Assessoria completa para artistas independentes, do planejamento à execução.',
  },
]

export default function Servicos() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Nossos <span className="accent">Serviços</span></h2>
        <p>Soluções completas para impulsionar a sua carreira musical.</p>
      </div>

      <div className="card-grid cols-3">
        {servicos.map((s) => (
          <div key={s.titulo} className="card">
            <div className="card-icon">{s.icon}</div>
            <h3>{s.titulo}</h3>
            <p>{s.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
