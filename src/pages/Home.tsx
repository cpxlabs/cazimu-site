import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'

const MotionImg = motion.img
type DestaqueItem = {
  valor: string
  label: string
}

const destaque: DestaqueItem[] = [
  { valor: '120+', label: 'Lançamentos apoiados' },
  { valor: '18', label: 'Plataformas ativas' },
  { valor: '24/7', label: 'Acompanhamento artístico' },
]

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />

      <motion.span
        className="hero-eyebrow"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Editora musical criativa
      </motion.span>

      <MotionImg
        src={heroImg}
        alt="Cazimu"
        className="hero-img"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        CAZ<span className="accent">I</span>MU
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        Da composição ao lançamento: estratégia, produção e distribuição para
        artistas independentes que querem viver da própria música.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <Link to="/servicos" className="hero-cta">
          Conheça nossos serviços
        </Link>
        <Link to="/portfolio" className="hero-cta hero-cta-secondary">
          Ver portfólio
        </Link>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        {destaque.map((item) => (
          <div key={item.label} className="hero-stat-card">
            <span className="value">{item.valor}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
