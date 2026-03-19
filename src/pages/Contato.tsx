type Canal = {
  titulo: string
  valor: string
  link: string
  icone: string
}

export default function Contato() {
  const canais: Canal[] = [
    {
      titulo: 'Instagram',
      valor: '@cazimu.editora',
      link: 'https://instagram.com/cazimu.editora',
      icone: 'Social',
    },
    {
      titulo: 'WhatsApp',
      valor: '+55 (21) 97554-2783',
      link: 'https://wa.me/5521975542783',
      icone: 'Chat',
    },
    {
      titulo: 'Email',
      valor: 'contato@cazimu.com.br',
      link: 'mailto:contato@cazimu.com.br',
      icone: 'Email',
    },
    {
      titulo: 'Atendimento',
      valor: 'Seg a Sex, 10h às 18h',
      link: '#',
      icone: 'Horários',
    },
  ]

  return (
    <div className="section">
      <div className="section-header">
        <h2>Fale <span className="accent">Conosco</span></h2>
        <p>
          Entre em contato para iniciar sua jornada musical com estratégia,
          clareza e direção criativa.
        </p>
      </div>

      <div className="contact-grid">
        {canais.map((canal) => {
          const temLink = canal.link !== '#'
          const externo = canal.link.startsWith('http')
          const conteudo = (
            <>
              <div className="contact-icon">{canal.icone}</div>
              <div className="contact-info">
                <div className="contact-label">{canal.titulo}</div>
                <div className="contact-value">{canal.valor}</div>
              </div>
            </>
          )

          if (!temLink) {
            return (
              <div key={canal.titulo} className="contact-card">
                {conteudo}
              </div>
            )
          }

          return (
            <a
              key={canal.titulo}
              href={canal.link}
              target={externo ? '_blank' : undefined}
              rel={externo ? 'noopener noreferrer' : undefined}
              className="contact-card"
            >
              {conteudo}
            </a>
          )
        })}
      </div>

      <div className="contact-highlight">
        <h3>Quer lançar nos próximos 30 dias?</h3>
        <p>
          Fale com a equipe e receba um plano inicial com próximos passos para
          produção, distribuição e posicionamento.
        </p>
        <a href="https://wa.me/5521975542783" target="_blank" rel="noopener noreferrer">
          Iniciar conversa no WhatsApp
        </a>
      </div>
    </div>
  )
}
