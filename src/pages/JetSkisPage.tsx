import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Zap, MapPin } from 'lucide-react'
import { jetSkis } from '../data/inventory'

const JetSkisPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              High-Performance <span className="text-gradient">Jet Skis</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Experience the thrill of the water with our fleet of high-performance jet skis, 
              available at multiple locations across South Florida
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-luxury-gold" />
                <span>High Performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-luxury-gold" />
                <span>Easy Handling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jet Skis Grid */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jetSkis.map((jetski) => (
              <div key={jetski.id} className="luxury-card group relative overflow-hidden">
                {/* Premium Badge */}
                {jetski.hourlyPrice >= 150 && (
                  <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </div>
                )}

                {/* Jet Ski Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={jetski.image}
                    alt={jetski.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Jet Ski Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{jetski.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{jetski.locations.join(', ')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-luxury-gold">
                        ${jetski.hourlyPrice}
                      </div>
                      <div className="text-sm text-gray-400">per hour</div>
                      {jetski.dailyPrice && (
                        <div className="text-sm text-luxury-gold mt-1">
                          ${jetski.dailyPrice}/day
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Zap className="w-3 h-3 text-luxury-gold" />
                      <span>High Performance</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Users className="w-3 h-3 text-luxury-gold" />
                      <span>Easy Handling</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Star className="w-3 h-3 text-luxury-gold" />
                      <span>Water Sports</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Zap className="w-3 h-3 text-luxury-gold" />
                      <span>Adventure Ready</span>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="bg-luxury-charcoal/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-luxury-gold mb-2">Available Locations:</h4>
                    <div className="space-y-1">
                      {jetski.locations.map((location, index) => (
                        <div key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-luxury-gold" />
                          <span>{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/jet-skis/${jetski.slug}`}
                    className="w-full luxury-button flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Need multiple jet skis or specific locations? We can arrange group rentals and custom packages.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="luxury-button-outline"
            >
              Request Group Package
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JetSkisPage