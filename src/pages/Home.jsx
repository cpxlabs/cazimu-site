import { motion } from 'framer-motion'

const MotionH1 = motion.h1

export default function Home() {
  return (
    <div className="hero">
      <MotionH1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        CAZIMU
      </MotionH1>
      <p>Editora musical para artistas independentes</p>
    </div>
  )
}
