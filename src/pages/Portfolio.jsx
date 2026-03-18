import { useState } from 'react'

export default function Portfolio() {
  const [obras] = useState(() => JSON.parse(localStorage.getItem('obras')) || [])

  return (
    <div className="section">
      <h2>Portfólio</h2>

      {obras.length === 0 && (
        <p style={{ color: '#888' }}>
          Nenhuma obra cadastrada. Acesse o painel Admin para adicionar.
        </p>
      )}

      {obras.map((obra) => (
        <div key={obra.id ?? obra.titulo} className="card">
          <h3>{obra.titulo}</h3>
          <iframe
            width="100%"
            height="200"
            src={obra.link}
            title={`${obra.titulo} - YouTube player`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  )
}
