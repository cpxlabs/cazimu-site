import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants/contacts'
import PageSeo from '../components/PageSeo'

type Servico = {
  icon: string
  titulo: string
  descricao: string
  entregas: string[]
}

type Pacote = {
  nome: string
  perfil: string
  itens: string[]
}

const servicos: Servico[] = [
  {
    icon: 'Distribuição',
    titulo: 'Distribuição Digital',
    descricao:
      'Publicação nas principais plataformas com estrutura de metadados e estratégia de presença contínua.',
    entregas: ['ISRC e organização técnica', 'Checklist de plataformas', 'Suporte pós-lançamento'],
  },
  {
    icon: 'Produção',
    titulo: 'Produção Musical',
    descricao:
      'Produção, gravação, mix e master com direção estética para elevar identidade e qualidade sonora.',
    entregas: ['Direção de arranjo', 'Captação e edição', 'Mixagem e masterização'],
  },
  {
    icon: 'Carreira',
    titulo: 'Gestão de Carreira',
    descricao:
      'Planejamento de ciclos de lançamento, metas e tomada de decisão baseada em indicadores reais.',
    entregas: ['Plano trimestral', 'Acompanhamento semanal', 'Leitura de dados e ajustes'],
  },
  {
    icon: 'Branding',
    titulo: 'Posicionamento de Marca',
    descricao:
      'Definição de narrativa, linguagem visual e consistência de comunicação em todos os pontos de contato.',
    entregas: ['Direção de imagem', 'Narrativa de artista', 'Guia de comunicação'],
  },
  {
    icon: 'Ads',
    titulo: 'Campanhas de Lançamento',
    descricao:
      'Estratégias de mídia e conteúdo orientadas para descoberta, retenção e crescimento de audiência.',
    entregas: ['Plano de tráfego', 'Peças e roteiros', 'Relatório de performance'],
  },
  {
    icon: 'Mentoria',
    titulo: 'Mentoria Estratégica',
    descricao:
      'Sessões consultivas para repertório, tomada de decisão e próximos passos com clareza e foco.',
    entregas: ['Diagnóstico do momento atual', 'Mapa de prioridades', 'Roadmap de execução'],
  },
]

const pacotes: Pacote[] = [
  {
    nome: 'Essencial',
    perfil: 'Para artistas em início de estruturação',
    itens: ['Direção de lançamento', 'Distribuição', 'Mentoria mensal'],
  },
  {
    nome: 'Expansão',
    perfil: 'Para artistas em fase de crescimento ativo',
    itens: ['Produção + branding', 'Campanha orientada por dados', 'Acompanhamento quinzenal'],
  },
  {
    nome: 'Assinatura',
    perfil: 'Para projetos com foco em escala e consistência',
    itens: ['Gestão contínua 360º', 'Squad criativo dedicado', 'Revisões estratégicas recorrentes'],
  },
]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Servicos() {
  return (
    <div className="section">
      <PageSeo
        title="Serviços - Cazimu"
        description="Entenda como a Cazimu opera os eixos de artistas, lançamentos e conteúdo/imprensa com serviços modulares."
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
          Nossos <span className="accent">Serviços</span>
        </h2>
        <p>
          Soluções modulares para impulsionar sua carreira com consistência,
          identidade e visão de mercado, organizadas para sustentar artistas,
          lançamentos e presença editorial.
        </p>
      </motion.div>

      <motion.div
        className="card-grid cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        {servicos.map((s) => (
          <motion.article
            key={s.titulo}
            className="card"
            variants={reveal}
            transition={{ duration: 0.52 }}
          >
            <div className="card-icon card-pill">{s.icon}</div>
            <h3>{s.titulo}</h3>
            <p>{s.descricao}</p>
            <ul className="card-list">
              {s.entregas.map((entrega) => (
                <li key={entrega}>{entrega}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="service-packages"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {pacotes.map((pacote) => (
          <motion.article
            key={pacote.nome}
            className="card"
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <span className="project-badge">Pacote</span>
            <h3>{pacote.nome}</h3>
            <p>{pacote.perfil}</p>
            <ul className="card-list">
              {pacote.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="card-grid cols-3 service-packages"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <span className="card-icon">Artistas</span>
          <h3>Camada de roster</h3>
          <p>Direção, narrativa e leitura de momento para transformar projetos em propostas claras de mercado.</p>
        </motion.article>
        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <span className="card-icon">Lançamentos</span>
          <h3>Camada de catálogo</h3>
          <p>Operação de campanha, distribuição e continuidade para que cada obra reforce o catálogo público.</p>
        </motion.article>
        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <span className="card-icon">Conteúdo</span>
          <h3>Camada editorial</h3>
          <p>Notícias, bastidores e imprensa para sustentar relacionamento, prova social e recorrência de atenção.</p>
        </motion.article>
      </motion.div>

      <motion.div
        className="contact-highlight"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Precisa de um plano sob medida?</h3>
        <p>
          Chame no WhatsApp para alinhar objetivos, orçamento, cronograma e a
          combinação de serviços ideal para o seu momento artístico.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </a>
      </motion.div>
    </div>
  )
}
