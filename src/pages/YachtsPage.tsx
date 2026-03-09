import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Anchor } from 'lucide-react'
import { yachts } from '../data/inventory'

const YachtsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              Luxury <span className="text-gradient">Yacht Fleet</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Sail the pristine waters of South Florida aboard our exclusive collection 
              of luxury yachts with professional crews and premium amenities
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-luxury-gold" />
                <span>Professional Crew</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-luxury-gold" />
                <span>Luxury Amenities</span>
              </div>
              <div className="flex items-center space-x-2">
                <Anchor className="w-5 h-5 text-luxury-gold" />
                <span>Premium Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yachts Grid */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yachts.map((yacht) => (
              <div key={yacht.id} className="luxury-card group relative overflow-hidden">
                {/* Premium Badge */}
                {yacht.startingPrice >= 2000 && (
                  <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </div>
                )}

                {/* Yacht Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={yacht.image}
                    alt={yacht.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Yacht Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{yacht.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Up to {yacht.maxGuests} guests</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        <Anchor className="w-3 h-3 inline mr-1" />
                        {yacht.departure.includes('Miami') ? 'Miami' : 'Fort Lauderdale'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-luxury-gold">
                        {yacht.priceDisplay}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Users className="w-3 h-3 text-luxury-gold" />
                      <span>Professional Crew</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Star className="w-3 h-3 text-luxury-gold" />
                      <span>Premium Amenities</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Anchor className="w-3 h-3 text-luxury-gold" />
                      <span>Water Sports</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Star className="w-3 h-3 text-luxury-gold" />
                      <span>Full Service</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/yachts/${yacht.slug}`}
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
              Looking for a specific yacht or charter experience? We can arrange custom charters.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="luxury-button-outline"
            >
              Request Custom Charter
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default YachtsPage