import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Home, MapPin, Bed } from 'lucide-react'
import { villas } from '../data/inventory'

const VillasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              Premium <span className="text-gradient">Villa Collection</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Discover unparalleled luxury in our exclusive collection of Miami's finest villas, 
              each offering privacy, comfort, and world-class amenities
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-luxury-gold" />
                <span>Private Luxury</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-luxury-gold" />
                <span>Premium Amenities</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span>Prime Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <div key={villa.id} className="luxury-card group relative overflow-hidden">
                {/* Premium Badge */}
                {villa.nightlyPrice >= 4000 && (
                  <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </div>
                )}

                {/* Villa Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={villa.image}
                    alt={villa.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Villa Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{villa.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{villa.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Bed className="w-3 h-3" />
                          <span>{villa.bedrooms}BR</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Home className="w-3 h-3" />
                          <span>{villa.bathrooms}BA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>Sleeps {villa.sleeps}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-luxury-gold">
                        ${villa.nightlyPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">per night</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Home className="w-3 h-3 text-luxury-gold" />
                      <span>Private Pool</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Star className="w-3 h-3 text-luxury-gold" />
                      <span>Ocean Views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Users className="w-3 h-3 text-luxury-gold" />
                      <span>Concierge</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <MapPin className="w-3 h-3 text-luxury-gold" />
                      <span>Prime Location</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/villas/${villa.slug}`}
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
              Need a larger villa or specific amenities? We can arrange custom luxury accommodations.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="luxury-button-outline"
            >
              Request Custom Villa
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VillasPage