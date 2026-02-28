import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-luxury-black">
      <Header />
      <main>
        <Hero />
        <Fleet />
        <HowItWorks />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App