import React, { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-luxury-black/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-luxury-black font-bold text-xl font-luxury">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-luxury font-bold text-white">
                Aura<span className="text-gradient">Pex</span>
              </h1>
              <p className="text-xs text-gray-400 -mt-1">RENTALS</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('fleet')}
              className="text-white hover:text-luxury-gold transition-colors duration-300"
            >
              Fleet
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-white hover:text-luxury-gold transition-colors duration-300"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-luxury-gold transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-luxury-gold transition-colors duration-300"
            >
              Contact
            </button>
            <a href="tel:+1-954-555-0123" className="flex items-center space-x-2 luxury-button">
              <Phone size={16} />
              <span>(954) 555-0123</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-luxury-gold transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-4 border-t border-white/10">
            <button 
              onClick={() => scrollToSection('fleet')}
              className="block w-full text-left text-white hover:text-luxury-gold transition-colors duration-300"
            >
              Fleet
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-white hover:text-luxury-gold transition-colors duration-300"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-white hover:text-luxury-gold transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-white hover:text-luxury-gold transition-colors duration-300"
            >
              Contact
            </button>
            <a href="tel:+1-954-555-0123" className="flex items-center space-x-2 luxury-button w-fit">
              <Phone size={16} />
              <span>(954) 555-0123</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header