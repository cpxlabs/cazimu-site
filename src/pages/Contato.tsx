import { motion } from 'framer-motion'
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants/contacts'

type Canal = {
  titulo: string
  valor: string
  link: string
  icone: string
}

type Pergunta = {
  pergunta: string
  resposta: string
}

const perguntas: Pergunta[] = [
  {
    pergunta: 'Vocês atendem artistas iniciantes?',
    resposta:
      'Sim. Montamos planos proporcionais ao estágio da carreira, com priorização clara do que gera maior impacto agora.',
  },
  {
    pergunta: 'Preciso ter músicas prontas?',
    resposta:
      'Não necessariamente. Também apoiamos desde a fase de direção criativa e planejamento de repertório.',
  },
  {
    pergunta: 'O atendimento é remoto?',
    resposta:
      'Sim. Operamos com atendimento digital para artistas de diferentes regiões com acompanhamento recorrente.',
  },
]

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
      valor: WHATSAPP_NUMBER,
      link: WHATSAPP_LINK,
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
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Fale <span className="accent">Conosco</span>
        </h2>
        <p>
          Entre em contato para iniciar sua jornada musical com estratégia,
          clareza e direção criativa.
        </p>
      </motion.div>

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>

      <motion.div
        className="contact-faq"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {perguntas.map((item) => (
          <article key={item.pergunta} className="card">
            <h3>{item.pergunta}</h3>
            <p>{item.resposta}</p>
          </article>
        ))}
      </motion.div>

      <motion.div
        className="contact-highlight"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Quer lançar nos próximos 30 dias?</h3>
        <p>
          Fale com a equipe e receba um plano inicial com próximos passos para
          produção, distribuição e posicionamento.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          Iniciar conversa no WhatsApp
        </a>
      </motion.div>
    </div>
  )
}
