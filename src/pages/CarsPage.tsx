import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Zap, Star, Users } from 'lucide-react'
import { carCities } from '../data/carCities'

const CarsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container-max section-padding text-center">
          <h1 className="text-4xl md:text-6xl font-luxury font-bold text-white mb-4">
            Exotic Cars by <span className="text-gradient">City</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Our curated collection of exotic and luxury vehicles, available across the
            world's most exclusive destinations. Select a city to see what's available.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-luxury-gold" />
              <span>Performance Focused</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-luxury-gold" />
              <span>Premium Selection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-luxury-gold" />
              <span>Concierge Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* City tiles */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {carCities.map((city) => {
              const soon = city.count === 0
              return (
                <Link
                  key={city.slug}
                  to={`/cars/${city.slug}`}
                  className="group relative h-72 rounded-xl overflow-hidden luxury-card !p-0"
                >
                  {city.cover ? (
                    <img
                      loading="lazy"
                      src={city.cover}
                      alt={city.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-luxury-charcoal" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-luxury-gold text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {soon
                          ? 'Coming soon'
                          : `${city.count} ${city.count === 1 ? 'vehicle' : 'vehicles'}`}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white flex items-center justify-between">
                      {city.name}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Looking for a specific vehicle or a city not listed? We source exclusive
              vehicles worldwide.
            </p>
            <button
              onClick={() => window.open('https://wa.me/15617774360?text=Hi%2C%20I%27m%20looking%20for%20a%20specific%20vehicle%20not%20listed%20on%20your%20site.%20Can%20you%20help%20source%20it%3F', '_blank')}
              className="luxury-button-outline"
            >
              Request Custom Vehicle
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CarsPage
