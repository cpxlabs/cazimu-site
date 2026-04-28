import { motion } from 'framer-motion'
import { featuredArtists } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Artistas() {
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
          Nossos <span className="accent">Artistas</span>
        </h2>
        <p>
          Uma camada pública de roster para apresentar estágio, foco de trabalho
          e contexto de cada projeto acompanhado pela Cazimu.
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
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
