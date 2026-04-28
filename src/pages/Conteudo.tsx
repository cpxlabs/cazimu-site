import { motion } from 'framer-motion'
import { editorialHighlights } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Conteudo() {
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
  )
}
