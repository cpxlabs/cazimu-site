import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants/contacts'
import PageSeo from '../components/PageSeo'
import { pressResources } from '../content/siteContent'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Imprensa() {
  return (
    <div className="section">
      <PageSeo
        title="Imprensa - Cazimu"
        description="Acesse os recursos de imprensa da Cazimu com kits, assets e materiais para parceiros e mídia."
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
          Sala de <span className="accent">Imprensa</span>
        </h2>
        <p>
          Estrutura inicial para concentrar materiais institucionais, ativos de
          marca e informações prioritárias para mídia e parceiros.
        </p>
      </motion.div>

      <motion.div
        className="card-grid cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {pressResources.map((item) => (
          <motion.article
            key={item.title}
            className="card"
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="inline-link">{item.action}</span>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="contact-highlight"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Precisa de material ou briefing rápido?</h3>
        <p>
          Centralize solicitações editoriais, convites e pedidos de assets em um
          único fluxo com a equipe da Cazimu.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          Falar com imprensa
        </a>
      </motion.div>
    </div>
  )
}
