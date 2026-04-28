import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import { featuredArtists } from '../content/siteContent'
import { shuffleUnique } from '../utils/shuffleUnique'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Artistas() {
  const artists = useMemo(() => shuffleUnique(featuredArtists, (a) => a.slug), [featuredArtists])
  return (
    <div className="section">
      <PageSeo
        title="Artistas - Cazimu"
        description="Conheça o roster público da Cazimu com contexto de posicionamento, foco de trabalho e próximos movimentos."
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
        {artists.map((artist) => (
          <motion.article
            key={artist.slug}
            className="card"
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <span className="project-badge">{artist.stage}</span>
            <h3>{artist.name}</h3>
            <p>{artist.summary}</p>
            <ul className="card-list">
              <li>{artist.focus}</li>
              <li>{artist.highlight}</li>
            </ul>
            <Link to={`/artistas/${artist.slug}`} className="inline-link">
              Ver projeto
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
