import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CarsPage from './pages/CarsPage'
import YachtsPage from './pages/YachtsPage'
import VillasPage from './pages/VillasPage'
import JetSkisPage from './pages/JetSkisPage'
import CarDetail from './pages/CarDetail'
import YachtDetail from './pages/YachtDetail'
import VillaDetail from './pages/VillaDetail'
import JetSkiDetail from './pages/JetSkiDetail'

// Homepage component
const HomePage = () => (
  <>
    <Hero />
    <Fleet />
    <HowItWorks />
    <About />
    <Testimonials />
    <Contact />
  </>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-luxury-black">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:slug" element={<CarDetail />} />
            <Route path="/yachts" element={<YachtsPage />} />
            <Route path="/yachts/:slug" element={<YachtDetail />} />
            <Route path="/villas" element={<VillasPage />} />
            <Route path="/villas/:slug" element={<VillaDetail />} />
            <Route path="/jet-skis" element={<JetSkisPage />} />
            <Route path="/jet-skis/:slug" element={<JetSkiDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App