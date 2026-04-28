import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import { featuredReleases } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Lancamentos() {
  return (
    <div className="section">
      <PageSeo
        title="Lançamentos - Cazimu"
        description="Veja os lançamentos públicos da Cazimu com campanha, plataformas e conexão direta com o roster."
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
          Últimos <span className="accent">Lançamentos</span>
        </h2>
        <p>
          Estrutura inicial para exibir discografia, contexto da campanha e
          plataformas prioritárias de cada lançamento.
        </p>
      </motion.div>

      <motion.div
        className="card-grid cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {featuredReleases.map((release) => (
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
            <p>{release.artist}</p>
            <ul className="card-list">
              <li>{release.summary}</li>
              <li>{release.platforms.join(' · ')}</li>
            </ul>
            <Link to={`/lancamentos/${release.slug}`} className="inline-link">
              Abrir lançamento
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
