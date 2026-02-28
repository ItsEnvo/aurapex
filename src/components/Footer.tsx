import React from 'react'
import { 
  MapPin, 
  Phone, 
  Facebook, 
  Instagram, 
  Car, 
  Anchor, 
  Zap,
  Award,
  Shield,
  Clock
} from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Our Fleet', href: '#fleet' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Testimonials', href: '#testimonials' }
  ]

  const services = [
    { icon: Car, label: 'Exotic Car Rentals' },
    { icon: Anchor, label: 'Luxury Yacht Charters' },
    { icon: Zap, label: 'Jet Ski Rentals' },
    { icon: Award, label: 'Concierge Services' }
  ]

  const locations = [
    {
      city: 'Fort Lauderdale',
      address: '123 Las Olas Boulevard\nFort Lauderdale, FL 33301',
      phone: '+1 (954) 555-0123'
    },
    {
      city: 'Miami',
      address: '456 Ocean Drive\nMiami Beach, FL 33139',
      phone: '+1 (305) 555-0124'
    }
  ]

  const scrollToSection = (href: string) => {
    const elementId = href.replace('#', '')
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-b from-luxury-charcoal to-luxury-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-gold-400 rounded-lg flex items-center justify-center">
                <span className="text-luxury-black font-bold text-xl font-luxury">A</span>
              </div>
              <div>
                <h3 className="text-2xl font-luxury font-bold text-white">
                  Aura<span className="text-gradient">Pex</span>
                </h3>
                <p className="text-xs text-gray-400 -mt-1">RENTALS</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              South Florida's premier luxury rental service, specializing in exotic cars, 
              luxury yachts, and high-performance watercraft since 2019.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/aurapexrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/aurapexrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <li key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                    <span className="text-gray-400">{service.label}</span>
                  </li>
                )
              })}
            </ul>
            
            {/* Trust Badges */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span>Fully Insured & Licensed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-luxury-gold" />
                <span>24/7 Concierge Support</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Locations</h4>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={index}>
                  <h5 className="font-medium text-luxury-gold mb-2">{location.city}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400 whitespace-pre-line">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-gray-400 hover:text-luxury-gold transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container-max section-padding py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get exclusive offers and the latest fleet updates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
              />
              <button className="luxury-button px-6 py-2">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>© {currentYear} AuraPex Rentals. All rights reserved.</p>
              <p className="mt-1">
                Licensed luxury vehicle rental service in Florida | 
                <span className="mx-2">•</span>
                <a href="mailto:info@aurapexrentals.com" className="hover:text-luxury-gold transition-colors">
                  info@aurapexrentals.com
                </a>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-luxury-gold transition-colors">Privacy Policy</button>
              <button className="hover:text-luxury-gold transition-colors">Terms of Service</button>
              <button className="hover:text-luxury-gold transition-colors">Insurance Info</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer