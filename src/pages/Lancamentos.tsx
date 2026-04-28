import { motion } from 'framer-motion'
import { featuredReleases } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Lancamentos() {
  return (
    <div className="section">
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
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
