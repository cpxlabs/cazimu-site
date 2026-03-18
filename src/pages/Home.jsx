import { motion } from 'framer-motion'
import heroImg from '../assets/hero.png'

const MotionH1 = motion.h1
const MotionImg = motion.img

export default function Home() {
  return (
    <div className="hero">
      <MotionImg
        src={heroImg}
        alt="Cazimu"
        className="hero-img"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <MotionH1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        CAZIMU
      </MotionH1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Editora musical para artistas independentes
      </motion.p>
    </div>
  )
}
