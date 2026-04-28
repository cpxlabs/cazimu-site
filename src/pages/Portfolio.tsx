import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type Obra = {
  id?: number
  titulo: string
  link: string
}

export function parseObras(value: string | null): Obra[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is Obra =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Obra).titulo === 'string' &&
        typeof (item as Obra).link === 'string'
    )
  } catch {
    return []
  }
}

export default function Portfolio() {
  const [obras] = useState<Obra[]>(() => parseObras(localStorage.getItem('obras')))

  const obrasExibidas = useMemo(() => {
    const seen = new Set<string>()
    const unique = obras.filter((obra) => {
      const key = obra.link.trim()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    for (let i = unique.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[unique[i], unique[j]] = [unique[j], unique[i]]
    }
    return unique
  }, [obras])

  const metricas = useMemo(
    () => [
      { label: 'Obras em destaque', valor: String(obrasExibidas.length) },
      { label: 'Formatos suportados', valor: 'Singles / EP / Ao vivo' },
      { label: 'Integração', valor: 'YouTube embed' },
    ],
    [obrasExibidas.length]
  )

  return (
    <div className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          <span className="accent">Portfólio</span>
        </h2>
        <p>
          Conheça trabalhos produzidos e distribuídos pela Cazimu, com foco em
          estética, consistência e resultado de audiência.
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

      {obrasExibidas.length === 0 && (
        <motion.div
          className="portfolio-empty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="empty-icon">Em breve</div>
          <p>
            Nenhuma obra cadastrada ainda. <Link to="/admin">Adicione pelo painel Admin</Link>.
          </p>
        </motion.div>
      )}

      {obrasExibidas.length > 0 && (
        <motion.div
          className="card-grid cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {obrasExibidas.map((obra) => (
            <article key={obra.id ?? obra.titulo} className="card card-portfolio">
              <span className="project-badge">Projeto</span>
              <h3>{obra.titulo}</h3>
              <p>
                Lançamento acompanhado pela equipe Cazimu com direção de
                distribuição e posicionamento digital.
              </p>
              <iframe
                width="100%"
                height="220"
                src={toEmbedUrl(obra.link)}
                title={`${obra.titulo} - YouTube player`}
                allowFullScreen
              />
            </article>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function toEmbedUrl(url: string): string {
  const value = String(url || '').trim()
  if (!value) return ''
  if (value.includes('youtube.com/embed/')) return value
  if (value.includes('watch?v=')) return value.replace('watch?v=', 'embed/')
  return value
}
