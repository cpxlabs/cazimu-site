import { motion } from 'framer-motion'
import PageSeo from '../components/PageSeo'

type Pilar = {
  titulo: string
  descricao: string
}

type Marco = {
  ano: string
  descricao: string
}

type Valor = {
  titulo: string
  texto: string
}

const pilares: Pilar[] = [
  {
    titulo: 'Direção Artística',
    descricao:
      'Construção de posicionamento, narrativa e identidade sonora com foco em diferenciação de longo prazo.',
  },
  {
    titulo: 'Estrutura de Lançamento',
    descricao:
      'Planejamento de calendário, conteúdo e distribuição para transformar cada música em campanha consistente.',
  },
  {
    titulo: 'Inteligência de Mercado',
    descricao:
      'Leitura de dados, público e timing para acelerar crescimento com decisões estratégicas.',
  },
]

const marcos: Marco[] = [
  {
    ano: '2019',
    descricao: 'Início da operação com foco em artistas independentes em fase de estruturação.',
  },
  {
    ano: '2021',
    descricao: 'Ampliação da equipe criativa e integração de gestão de lançamento em ciclo completo.',
  },
  {
    ano: '2024',
    descricao: 'Consolidação da metodologia Cazimu para acompanhamento contínuo de carreira.',
  },
]

const valores: Valor[] = [
  {
    titulo: 'Identidade antes de volume',
    texto:
      'Preferimos consistência de proposta a números vazios. Crescimento real vem de presença clara.',
  },
  {
    titulo: 'Processo sem burocracia',
    texto:
      'Fluxos simples, comunicação objetiva e responsabilidade compartilhada do briefing ao pós-lançamento.',
  },
  {
    titulo: 'Parceria com transparência',
    texto:
      'Acompanhamos métricas, aprendizados e próximos passos para decisões conjuntas e sustentáveis.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Bio() {
  return (
    <div className="section">
      <PageSeo
        title="Quem Somos - Cazimu"
        description="Conheça a estrutura da Cazimu e como a operação conecta direção artística, lançamento e inteligência de mercado."
      />
      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Quem <span className="accent">Somos</span>
        </h2>
        <p>
          Uma casa de direção musical e lançamento dedicada a construir
          carreiras autorais com método, clareza e execução consistente.
        </p>
      </motion.div>

      <div className="bio-content">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          A Cazimu conecta artistas independentes ao mercado fonográfico por
          meio de uma operação que combina sensibilidade artística e inteligência
          de lançamento. Nosso objetivo é garantir que cada obra chegue ao
          público certo, com impacto e continuidade de crescimento por meio dos
          eixos de artistas, lançamentos e conteúdo/imprensa.
        </motion.p>

        <motion.div
          className="bio-highlights"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="bio-stat" variants={reveal} transition={{ duration: 0.55 }}>
            <span className="value">+40</span>
            <span className="label">Artistas atendidos</span>
          </motion.div>
          <motion.div className="bio-stat" variants={reveal} transition={{ duration: 0.55 }}>
            <span className="value">+120</span>
            <span className="label">Lançamentos gerenciados</span>
          </motion.div>
          <motion.div className="bio-stat" variants={reveal} transition={{ duration: 0.55 }}>
            <span className="value">360º</span>
            <span className="label">Visão de carreira</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="card-grid cols-3 bio-pillars"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {pilares.map((pilar) => (
            <motion.article
              key={pilar.titulo}
              className="card"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <h3>{pilar.titulo}</h3>
              <p>{pilar.descricao}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="bio-timeline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {marcos.map((marco) => (
            <motion.article
              key={marco.ano}
              className="timeline-item"
              variants={reveal}
              transition={{ duration: 0.5 }}
            >
              <span>{marco.ano}</span>
              <p>{marco.descricao}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="card-grid cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {valores.map((valor) => (
            <motion.article
              key={valor.titulo}
              className="card"
              variants={reveal}
              transition={{ duration: 0.5 }}
            >
              <h3>{valor.titulo}</h3>
              <p>{valor.texto}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="bio-quote"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            “Nosso trabalho é transformar música em projeto sustentável, sem
            perder a essência de quem cria.”
          </p>
          <span>Equipe Cazimu</span>
        </motion.div>
      </div>
    </div>
  )
}
