import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import { getArtistBySlug, getReleasesByArtistSlug } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ArtistaDetalhe() {
  const { artistSlug = '' } = useParams()
  const artist = getArtistBySlug(artistSlug)
  const releases = getReleasesByArtistSlug(artistSlug)

  if (!artist) {
    return (
      <div className="section">
        <PageSeo title="Artista não encontrado - Cazimu" description="O artista solicitado não foi encontrado no roster público da Cazimu." />
        <div className="section-header">
          <h2>Artista não encontrado</h2>
          <p>Confira o roster público para continuar navegando pela arquitetura da Cazimu.</p>
        </div>
        <Link to="/artistas" className="hero-cta">
          Voltar para artistas
        </Link>
      </div>
    )
  }

  return (
    <div className="section">
      <PageSeo
        title={`${artist.name} - Artistas Cazimu`}
        description={`${artist.name} é um projeto da Cazimu com foco em ${artist.focus.toLowerCase()}.`}
      />

      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
        transition={{ duration: 0.6 }}
      >
        <span className="project-badge">{artist.stage}</span>
        <h2>{artist.name}</h2>
        <p>{artist.summary}</p>
      </motion.div>

      <motion.div
        className="detail-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <h3>Foco atual</h3>
          <p>{artist.focus}</p>
          <p className="detail-copy">{artist.highlight}</p>
        </motion.article>

        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <h3>Direções de trabalho</h3>
          <ul className="card-list">
            {artist.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

      <motion.div
        className="section-header section-header-tight"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Lançamentos do <span className="accent">projeto</span>
        </h2>
        <p>O catálogo público passa a conectar roster e discografia desde a mesma camada de conteúdo.</p>
      </motion.div>

      <motion.div
        className="card-grid cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {releases.map((release) => (
          <motion.article
            key={release.slug}
            className="card"
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <span className="project-badge">
              {release.format} · {release.year}
            </span>
            <h3>{release.title}</h3>
            <p>{release.summary}</p>
            <Link to={`/lancamentos/${release.slug}`} className="inline-link">
              Ver lançamento
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
