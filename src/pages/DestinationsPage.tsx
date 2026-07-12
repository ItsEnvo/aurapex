import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { fleetCities } from '../data/fleet'

const DestinationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding text-center">
          <h1 className="text-4xl md:text-6xl font-luxury font-bold text-white mb-4">
            Charter by <span className="text-gradient">Destination</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our global fleet across South Florida, the Caribbean and beyond.
            Select a destination to see the yachts available there.
          </p>
        </div>
      </section>

      {/* City tiles */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetCities.map((city) => (
              <Link
                key={city.slug}
                to={`/yachts/${city.slug}`}
                className="group relative h-72 rounded-xl overflow-hidden luxury-card !p-0"
              >
                {city.cover && (
                  <img
                    loading="lazy"
                    src={city.cover}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-luxury-gold text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{city.count} {city.count === 1 ? 'yacht' : 'yachts'}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white flex items-center justify-between">
                    {city.name}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DestinationsPage
