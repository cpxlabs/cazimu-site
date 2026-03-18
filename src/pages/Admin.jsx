import { useState } from 'react'

export default function Admin() {
  const [titulo, setTitulo] = useState('')
  const [link, setLink] = useState('')

  const salvar = () => {
    if (!titulo.trim() || !link.trim()) {
      alert('Preencha o título e o link antes de salvar.')
      return
    }
    const atual = JSON.parse(localStorage.getItem('obras')) || []
    atual.push({ id: Date.now(), titulo: titulo.trim(), link: link.trim() })
    localStorage.setItem('obras', JSON.stringify(atual))
    alert('Obra adicionada!')
    setTitulo('')
    setLink('')
  }

  return (
    <div className="section">
      <h2>Painel Admin</h2>
      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        placeholder="Link embed YouTube"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={salvar}>Salvar</button>
    </div>
  )
}
