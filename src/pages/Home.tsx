import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import { WHATSAPP_LINK } from '../constants/contacts'
import PageSeo from '../components/PageSeo'
import {
  editorialHighlights,
  featuredArtists,
  featuredReleases,
} from '../content/siteContent'

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
type ArchitecturePillar = {
  titulo: string
  descricao: string
  cta: string
  to: string
}

const destaque: DestaqueItem[] = [
  { valor: '3', label: 'Frentes públicas iniciais' },
  { valor: '1', label: 'Arquitetura editorial central' },
  { valor: '100%', label: 'Rotas pensadas para escala' },
  { valor: '360º', label: 'Visão de artista, lançamento e marca' },
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

const pillars: ArchitecturePillar[] = [
  {
    titulo: 'Artistas',
    descricao: 'Uma camada para apresentar roster, posicionamento e momento de cada projeto.',
    cta: 'Explorar artistas',
    to: '/artistas',
  },
  {
    titulo: 'Lançamentos',
    descricao: 'Estrutura para expor discografia, campanhas e links oficiais de escuta.',
    cta: 'Ver lançamentos',
    to: '/lancamentos',
  },
  {
    titulo: 'Conteúdo e imprensa',
    descricao: 'Base editorial para notícias, bastidores, prova social e relacionamento com mídia.',
    cta: 'Acessar conteúdo',
    to: '/conteudo',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
const HERO_IMAGE_INITIAL_ROTATION_DEG = -4

export default function Home() {
  return (
    <>
      <PageSeo
        title="Cazimu - Music House para artistas independentes"
        description="Conheça a nova arquitetura pública da Cazimu com roster, catálogo de lançamentos, conteúdo editorial e frente de imprensa."
      />
      <section className="hero">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />

        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Music house para artistas independentes
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75 }}
        >
          CAZ<span className="accent">I</span>MU
        </motion.h1>

        <motion.img
          src={heroImg}
          alt="Cazimu"
          className="hero-img"
          initial={{ opacity: 0, scale: 0.9, rotate: HERO_IMAGE_INITIAL_ROTATION_DEG }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Uma casa criativa para artistas independentes que querem transformar
          música em catálogo, presença e crescimento sustentável, com
          arquitetura pensada para artistas, lançamentos e conteúdo recorrente.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
            <Link to="/servicos" className="hero-cta">
             Conheça a operação
            </Link>
           <Link to="/lancamentos" className="hero-cta hero-cta-secondary">
             Ver lançamentos
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
            de marca autoral. A nova arquitetura organiza a operação por
            artistas, lançamentos e conteúdo contínuo.
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

      <section className="section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Nova <span className="accent">arquitetura</span> do site
          </h2>
          <p>
            A base pública agora começa a refletir o formato de uma music house
            com descoberta por roster, catálogo e relacionamento editorial.
          </p>
        </motion.div>

        <motion.div
          className="card-grid cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.titulo}
              className="card"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <h3>{pillar.titulo}</h3>
              <p>{pillar.descricao}</p>
              <Link to={pillar.to} className="inline-link">
                {pillar.cta}
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Artistas em <span className="accent">destaque</span>
          </h2>
          <p>
            Uma amostra da camada de roster que passa a organizar a leitura do
            negócio por perfil artístico e momento de carreira.
          </p>
        </motion.div>

        <motion.div
          className="card-grid cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {featuredArtists.map((artist) => (
            <motion.article
              key={artist.name}
              className="card"
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <span className="project-badge">{artist.stage}</span>
              <h3>{artist.name}</h3>
              <p>{artist.highlight}</p>
              <ul className="card-list">
                <li>{artist.focus}</li>
              </ul>
              <Link to={`/artistas/${artist.slug}`} className="inline-link">
                Ver artista
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Lançamentos e <span className="accent">conteúdo</span>
          </h2>
          <p>
            A navegação passa a acomodar catálogo e frente editorial desde a
            home, aproximando o site de uma operação viva e atualizável.
          </p>
        </motion.div>

        <div className="showcase-grid">
          <motion.div
            className="card-grid cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {featuredReleases.map((release) => (
              <motion.article
                key={release.title}
                className="card"
                variants={reveal}
                transition={{ duration: 0.55 }}
              >
                <span className="project-badge">{release.format}</span>
                <h3>{release.title}</h3>
                <p>{release.artist}</p>
                <ul className="card-list">
                  <li>{release.summary}</li>
                  <li>{release.platforms.join(' · ')}</li>
                </ul>
                <Link to={`/lancamentos/${release.slug}`} className="inline-link">
                  Ver lançamento
                </Link>
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
            {editorialHighlights.map((item) => (
              <motion.article
                key={item.title}
                className="card"
                variants={reveal}
                transition={{ duration: 0.55 }}
              >
                <span className="card-icon">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
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
