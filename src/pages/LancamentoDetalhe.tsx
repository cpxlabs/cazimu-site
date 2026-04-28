import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import { getArtistBySlug, getReleaseBySlug } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function LancamentoDetalhe() {
  const { releaseSlug = '' } = useParams()
  const release = getReleaseBySlug(releaseSlug)
  const artist = release ? getArtistBySlug(release.artistSlug) : undefined

  if (!release) {
    return (
      <div className="section">
        <PageSeo title="Lançamento não encontrado - Cazimu" description="O lançamento solicitado não foi encontrado no catálogo público da Cazimu." />
        <div className="section-header">
          <h2>Lançamento não encontrado</h2>
          <p>Volte para a listagem pública de lançamentos para continuar navegando.</p>
        </div>
        <Link to="/lancamentos" className="hero-cta">
          Voltar para lançamentos
        </Link>
      </div>
    )
  }

  return (
    <div className="section">
      <PageSeo
        title={`${release.title} - Lançamentos Cazimu`}
        description={`${release.title}, de ${release.artist}, faz parte do catálogo público da Cazimu e destaca ${release.campaign.toLowerCase()}`}
      />

      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
        transition={{ duration: 0.6 }}
      >
        <span className="project-badge">
          {release.format} · {release.year}
        </span>
        <h2>{release.title}</h2>
        <p>{release.summary}</p>
      </motion.div>

      <motion.div
        className="detail-hero-media detail-hero-media-release"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <img src={release.coverUrl} alt={release.coverAlt} />
      </motion.div>

      <motion.div
        className="detail-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <h3>Contexto de campanha</h3>
          <p>{release.campaign}</p>
          {artist && (
            <Link to={`/artistas/${artist.slug}`} className="inline-link">
              Ver artista: {artist.name}
            </Link>
          )}
        </motion.article>

        <motion.article className="card" variants={reveal} transition={{ duration: 0.55 }}>
          <h3>Plataformas prioritárias</h3>
          <ul className="card-list">
            {release.platforms.map((platform) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

      <motion.article
        className="card card-portfolio"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <span className="project-badge">Escuta</span>
        <h3>{release.artist}</h3>
        <p>
          Este bloco substitui a dependência pública de admin/localStorage por um item de catálogo versionado no código.
        </p>
        <iframe
          width="100%"
          height="320"
          src={release.embedUrl}
          title={`${release.title} - player`}
          allowFullScreen
        />
      </motion.article>
    </div>
  )
}
