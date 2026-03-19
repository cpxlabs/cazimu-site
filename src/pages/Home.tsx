import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import { WHATSAPP_LINK } from '../constants/contacts'

type DestaqueItem = {
  valor: string
  label: string
}

type Etapa = {
  titulo: string
  resumo: string
}

type Diferencial = {
  titulo: string
  descricao: string
}

const destaque: DestaqueItem[] = [
  { valor: '120+', label: 'Lançamentos apoiados' },
  { valor: '18', label: 'Plataformas e frentes ativas' },
  { valor: '4.8/5', label: 'Satisfação média de projetos' },
  { valor: '24/7', label: 'Acompanhamento estratégico' },
]

const etapas: Etapa[] = [
  {
    titulo: 'Diagnóstico artístico',
    resumo:
      'Mapeamos repertório, público e posicionamento para criar um plano de crescimento coerente com sua identidade.',
  },
  {
    titulo: 'Produção e lançamento',
    resumo:
      'Coordenamos criação, calendário e distribuição com foco em alcance, retenção e conversão de ouvintes em comunidade.',
  },
  {
    titulo: 'Escala sustentável',
    resumo:
      'Acompanhamos dados e próximos passos para transformar cada lançamento em avanço real de carreira.',
  },
]

const diferenciais: Diferencial[] = [
  {
    titulo: 'Visão de negócio para arte',
    descricao:
      'Unimos sensibilidade criativa com decisões baseadas em dados para fortalecer presença e receita.',
  },
  {
    titulo: 'Execução integrada',
    descricao:
      'Do briefing à entrega final, centralizamos produção, comunicação e distribuição para ganhar velocidade.',
  },
  {
    titulo: 'Narrativa que gera conexão',
    descricao:
      'Construímos histórias de artista que fazem o público entender, lembrar e compartilhar o seu trabalho.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
const HERO_IMAGE_INITIAL_ROTATION = -4

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />

        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Editora musical criativa
        </motion.span>

        <motion.img
          src={heroImg}
          alt="Cazimu"
          className="hero-img"
          initial={{ opacity: 0, scale: 0.9, rotate: HERO_IMAGE_INITIAL_ROTATION }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75 }}
        >
          CAZ<span className="accent">I</span>MU
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Uma casa criativa para artistas independentes que querem transformar
          música em carreira sólida, com planejamento, estética e presença de
          mercado.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <Link to="/servicos" className="hero-cta">
            Conheça nossos serviços
          </Link>
          <Link to="/portfolio" className="hero-cta hero-cta-secondary">
            Ver portfólio
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-whatsapp"
          >
            Falar no WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {destaque.map((item) => (
            <motion.article
              key={item.label}
              className="hero-stat-card"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <span className="value">{item.valor}</span>
              <span className="label">{item.label}</span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section-home-story">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          <h2>
            De ideia a impacto, com <span className="accent">método</span>
          </h2>
          <p>
            Na Cazimu, cada lançamento é tratado como capítulo de uma construção
            de marca autoral. Você não recebe apenas execução, recebe direção.
          </p>
        </motion.div>

        <motion.div
          className="card-grid cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {etapas.map((etapa, index) => (
            <motion.article
              key={etapa.titulo}
              className="card card-etapa"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <span className="card-icon">Etapa {index + 1}</span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.resumo}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section-home-diferenciais">
        <motion.div
          className="home-manifesto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <p className="manifesto-kicker">Manifesto Cazimu</p>
          <h2>
            Seu som merece estratégia tão forte quanto sua <span className="accent">assinatura</span>
          </h2>
          <p>
            A cena muda rápido. O que diferencia quem cresce é clareza de
            posicionamento, constância de entrega e gestão inteligente de cada
            oportunidade. É isso que construímos com você.
          </p>
        </motion.div>

        <motion.div
          className="card-grid cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {diferenciais.map((item) => (
            <motion.article
              key={item.titulo}
              className="card"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </>
  )
}
