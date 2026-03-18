export default function Contato() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Fale <span className="accent">Conosco</span></h2>
        <p>Entre em contato para iniciar a sua jornada musical.</p>
      </div>

      <div className="contact-grid">
        <a
          href="https://instagram.com/cazimu.editora"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <div className="contact-icon">📸</div>
          <div className="contact-info">
            <div className="contact-label">Instagram</div>
            <div className="contact-value">@cazimu.editora</div>
          </div>
        </a>

        <a
          href="https://wa.me/5521975542783"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <div className="contact-icon">💬</div>
          <div className="contact-info">
            <div className="contact-label">WhatsApp</div>
            <div className="contact-value">+55 (21) 97554-2783</div>
          </div>
        </a>
      </div>
    </div>
  )
}
