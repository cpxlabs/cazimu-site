import { useState } from 'react'

export default function Admin() {
  const [titulo, setTitulo] = useState('')
  const [link, setLink] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [obras, setObras] = useState(() => JSON.parse(localStorage.getItem('obras')) || [])

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

  const remover = (id) => {
    const atualizado = obras.filter((obra) => obra.id !== id)
    localStorage.setItem('obras', JSON.stringify(atualizado))
    setObras(atualizado)
    setFeedback({ type: 'success', msg: 'Obra removida.' })
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>Painel <span className="accent">Admin</span></h2>
        <p>Adicione novas obras ao portfólio da Cazimu.</p>
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
