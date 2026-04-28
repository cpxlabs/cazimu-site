import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Bio from './pages/Bio'
import Servicos from './pages/Servicos'
import Portfolio from './pages/Portfolio'
import Contato from './pages/Contato'
import Admin from './pages/Admin'
import Artistas from './pages/Artistas'
import Lancamentos from './pages/Lancamentos'
import Conteudo from './pages/Conteudo'
import Imprensa from './pages/Imprensa'
import ArtistaDetalhe from './pages/ArtistaDetalhe'
import LancamentoDetalhe from './pages/LancamentoDetalhe'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/quem-somos" element={<Bio />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/artistas" element={<Artistas />} />
            <Route path="/artistas/:artistSlug" element={<ArtistaDetalhe />} />
            <Route path="/lancamentos" element={<Lancamentos />} />
            <Route path="/lancamentos/:releaseSlug" element={<LancamentoDetalhe />} />
            <Route path="/conteudo" element={<Conteudo />} />
            <Route path="/imprensa" element={<Imprensa />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/catalogo" element={<Portfolio />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
