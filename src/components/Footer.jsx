export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          Caz<span className="accent">i</span>mu — Editora Musical
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Cazimu. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
