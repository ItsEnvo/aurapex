import React from 'react'
import { ChevronDown, Star, MapPin } from 'lucide-react'

const Hero: React.FC = () => {
  const scrollToFleet = () => {
    const fleetElement = document.getElementById('fleet')
    if (fleetElement) {
      fleetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-luxury-gold/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container-max section-padding text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <Star className="text-luxury-gold" size={16} />
            <span className="text-sm font-medium text-white">South Florida's #1 Luxury Rental</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold mb-6 leading-tight">
            <span className="text-white">Experience</span>
            <br />
            <span className="text-gradient">Ultimate Luxury</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premier exotic car, yacht, and jet ski rentals in Fort Lauderdale and Miami. 
            Drive your dreams, sail in style.
          </p>
          
          {/* Location Badge */}
          <div className="flex items-center justify-center space-x-6 mb-10">
            <div className="flex items-center space-x-2 text-luxury-gold">
              <MapPin size={16} />
              <span className="text-sm font-medium">Fort Lauderdale</span>
            </div>
            <div className="w-1 h-1 bg-luxury-gold rounded-full"></div>
            <div className="flex items-center space-x-2 text-luxury-gold">
              <MapPin size={16} />
              <span className="text-sm font-medium">Miami</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={scrollToFleet}
              className="luxury-button text-lg px-10 py-4 w-full sm:w-auto"
            >
              Browse Our Fleet
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="luxury-button-outline text-lg px-10 py-4 w-full sm:w-auto"
            >
              Get Quote Now
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">50+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Luxury Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Concierge</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToFleet}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-luxury-gold transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </section>
  )
}

export default Hero