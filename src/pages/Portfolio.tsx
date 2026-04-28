import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import { featuredReleases } from '../content/siteContent'
import { shuffleUnique } from '../utils/shuffleUnique'

export default function Portfolio() {
  const releases = useMemo(() => shuffleUnique(featuredReleases, (r) => r.slug), [featuredReleases])

  const metricas = [
    { label: 'Lançamentos em destaque', valor: String(releases.length) },
    { label: 'Formatos suportados', valor: 'Singles / EP / Ao vivo' },
    { label: 'Fonte pública', valor: 'Conteúdo versionado' },
  ]

  return (
    <div className="section">
      <PageSeo
        title="Catálogo - Cazimu"
        description="Veja o catálogo público da Cazimu a partir de conteúdo versionado, sem depender do painel admin para exibição."
      />
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          <span className="accent">Catálogo</span> em destaque
        </h2>
        <p>
          Conheça lançamentos organizados diretamente na camada de conteúdo do
          site, sem depender de admin ou localStorage para a experiência pública.
        </p>
      </motion.div>

      <motion.div
        className="portfolio-metrics"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {metricas.map((item) => (
          <article key={item.label} className="metric-card">
            <span>{item.valor}</span>
            <p>{item.label}</p>
          </article>
        ))}
      </motion.div>

      <motion.div
        className="card-grid cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        {releases.map((release) => (
          <article key={release.slug} className="card card-portfolio">
            <span className="project-badge">
              {release.format} · {release.year}
            </span>
            <h3>{release.title}</h3>
            <p>
              {release.artist} · {release.summary}
            </p>
            <iframe
              width="100%"
              height="220"
              src={release.embedUrl}
              title={`${release.title} - YouTube player`}
              allowFullScreen
            />
            <Link to={`/lancamentos/${release.slug}`} className="inline-link">
              Abrir lançamento
            </Link>
          </article>
        ))}
      </motion.div>
    </div>
  )
}
