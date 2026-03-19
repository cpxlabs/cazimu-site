import { useState } from 'react'
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

  return (
    <div className="section">
      <div className="section-header">
        <h2><span className="accent">Portfólio</span></h2>
        <p>Conheça os trabalhos produzidos e distribuídos pela Cazimu.</p>
      </div>

      {obras.length === 0 && (
        <div className="portfolio-empty">
          <div className="empty-icon">Em breve</div>
          <p>
            Nenhuma obra cadastrada ainda.{' '}
            <Link to="/admin">Adicione pelo painel Admin</Link>.
          </p>
        </div>
      )}

      {obras.length > 0 && (
        <div className="card-grid cols-2">
          {obras.map((obra) => (
            <div key={obra.id ?? obra.titulo} className="card">
              <span className="project-badge">Projeto</span>
              <h3>{obra.titulo}</h3>
              <iframe
                width="100%"
                height="220"
                src={toEmbedUrl(obra.link)}
                title={`${obra.titulo} - YouTube player`}
                allowFullScreen
              />
            </div>
          ))}
        </div>
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
