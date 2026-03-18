import { useState } from 'react'

export default function Admin() {
  const [titulo, setTitulo] = useState('')
  const [link, setLink] = useState('')
  const [feedback, setFeedback] = useState(null)

  const salvar = () => {
    if (!titulo.trim() || !link.trim()) {
      setFeedback({ type: 'error', msg: 'Preencha o título e o link antes de salvar.' })
      return
    }
    const atual = JSON.parse(localStorage.getItem('obras')) || []
    atual.push({ id: Date.now(), titulo: titulo.trim(), link: link.trim() })
    localStorage.setItem('obras', JSON.stringify(atual))
    setFeedback({ type: 'success', msg: 'Obra adicionada com sucesso!' })
    setTitulo('')
    setLink('')
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>Painel <span className="accent">Admin</span></h2>
        <p>Adicione novas obras ao portfólio da Cazimu.</p>
      </div>

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
        <p
          style={{
            marginTop: 16,
            fontSize: '0.9rem',
            color: feedback.type === 'success' ? '#22c55e' : '#ef4444',
          }}
        >
          {feedback.msg}
        </p>
      )}
    </div>
  )
}
