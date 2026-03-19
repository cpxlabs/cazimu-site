import { useState } from 'react'

type Feedback = {
  type: 'success' | 'error'
  msg: string
}

type Obra = {
  id: number
  titulo: string
  link: string
}

function parseObras(value: string | null): Obra[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is Obra =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Obra).id === 'number' &&
        typeof (item as Obra).titulo === 'string' &&
        typeof (item as Obra).link === 'string'
    )
  } catch {
    return []
  }
}

export default function Admin() {
  const [titulo, setTitulo] = useState('')
  const [link, setLink] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [obras, setObras] = useState<Obra[]>(() => parseObras(localStorage.getItem('obras')))

  const salvar = () => {
    if (!titulo.trim() || !link.trim()) {
      setFeedback({ type: 'error', msg: 'Preencha o título e o link antes de salvar.' })
      return
    }

    const atual = [...obras]
    atual.push({ id: Date.now(), titulo: titulo.trim(), link: link.trim() })
    localStorage.setItem('obras', JSON.stringify(atual))
    setObras(atual)
    setFeedback({ type: 'success', msg: 'Obra adicionada com sucesso!' })
    setTitulo('')
    setLink('')
  }

  const remover = (id: number) => {
    const atualizado = obras.filter((obra) => obra.id !== id)
    localStorage.setItem('obras', JSON.stringify(atualizado))
    setObras(atualizado)
    setFeedback({ type: 'success', msg: 'Obra removida.' })
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>
          Painel <span className="accent">Admin</span>
        </h2>
        <p>
          Cadastre e organize as obras do portfólio. Os dados são salvos no
          navegador atual via localStorage.
        </p>
      </div>

      <div className="admin-guide">
        <article>
          <strong>Passo 1</strong>
          <p>Preencha o título da obra exatamente como deseja exibir no site.</p>
        </article>
        <article>
          <strong>Passo 2</strong>
          <p>Use link no formato YouTube embed ou URL de watch para conversão automática.</p>
        </article>
        <article>
          <strong>Passo 3</strong>
          <p>Revise e remova itens quando necessário para manter o portfólio sempre atualizado.</p>
        </article>
      </div>

      <div className="admin-grid">
        <div className="admin-panel">
          <div className="form-group">
            <label htmlFor="titulo">Título da obra</label>
            <input
              id="titulo"
              placeholder="Ex: Nome da Música"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Link embed do YouTube</label>
            <input
              id="link"
              placeholder="Ex: https://www.youtube.com/embed/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <button onClick={salvar}>Salvar obra</button>

          {feedback && (
            <p className={`form-feedback ${feedback.type === 'success' ? 'success' : 'error'}`}>
              {feedback.msg}
            </p>
          )}
        </div>

        <div className="admin-panel">
          <h3>Obras cadastradas</h3>
          {obras.length === 0 && <p className="admin-empty">Nenhuma obra cadastrada.</p>}
          {obras.length > 0 && (
            <div className="admin-list">
              {obras.map((obra) => (
                <div className="admin-item" key={obra.id ?? obra.titulo}>
                  <div>
                    <strong>{obra.titulo}</strong>
                    <p>{obra.link}</p>
                  </div>
                  <button className="danger" onClick={() => remover(obra.id)}>
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
