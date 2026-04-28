import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PageSeo from '../components/PageSeo'
import { editorialHighlights } from '../content/siteContent'
import { shuffleUnique } from '../utils/shuffleUnique'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Conteudo() {
  const highlights = useMemo(() => shuffleUnique(editorialHighlights, (e) => e.title), [editorialHighlights])
  return (
    <div className="section">
      <PageSeo
        title="Conteúdo - Cazimu"
        description="Acompanhe a frente editorial da Cazimu com análises, bastidores e notícias para artistas e parceiros."
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
          Frente <span className="accent">Editorial</span>
        </h2>
        <p>
          Espaço para notícias, bastidores, aprendizados e cobertura de projetos
          que mantêm o site vivo além da função institucional.
        </p>
      </motion.div>

      <motion.div
        className="card-grid cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {highlights.map((item) => (
          <motion.article
            key={item.title}
            className="card"
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <span className="card-icon">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <ul className="card-list">
              <li>{item.format}</li>
              <li>{item.audience}</li>
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
