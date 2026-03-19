type Servico = {
  icon: string
  titulo: string
  descricao: string
}

const servicos: Servico[] = [
  {
    icon: 'Distribuição',
    titulo: 'Distribuição Digital',
    descricao:
      'Coloque sua música em todas as plataformas digitais como Spotify, Apple Music, Deezer e mais.',
  },
  {
    icon: 'Produção',
    titulo: 'Produção Musical',
    descricao:
      'Estúdio completo para gravar, mixar e masterizar suas faixas com qualidade profissional.',
  },
  {
    icon: 'Carreira',
    titulo: 'Gestão de Carreira',
    descricao:
      'Assessoria completa para artistas independentes, do planejamento à execução.',
  },
  {
    icon: 'Branding',
    titulo: 'Posicionamento de Marca',
    descricao:
      'Definição de imagem, linguagem visual e direção de conteúdo para fortalecer presença digital.',
  },
  {
    icon: 'Ads',
    titulo: 'Campanhas de Lançamento',
    descricao:
      'Estratégias de divulgação com foco em alcance qualificado, retenção de audiência e resultados.',
  },
  {
    icon: 'Consultoria',
    titulo: 'Mentoria Estratégica',
    descricao:
      'Encontros de acompanhamento para decisões de repertório, posicionamento e próximos passos.',
  },
]

export default function Servicos() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Nossos <span className="accent">Serviços</span></h2>
        <p>
          Soluções modulares para impulsionar sua carreira com consistência,
          identidade e visão de mercado.
        </p>
      </div>

      <div className="card-grid cols-3">
        {servicos.map((s) => (
          <div key={s.titulo} className="card">
            <div className="card-icon card-pill">{s.icon}</div>
            <h3>{s.titulo}</h3>
            <p>{s.descricao}</p>
          </div>
        ))}
      </div>

      <div className="contact-highlight">
        <h3>Precisa de um plano sob medida?</h3>
        <p>
          Chame no WhatsApp para alinhar objetivos, cronograma e o melhor pacote
          para seu momento artístico.
        </p>
        <a
          href="https://wa.me/5521975542783"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  )
}
