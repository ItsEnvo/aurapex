import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'
import { cars } from '../data/inventory'

const CarsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              Exotic <span className="text-gradient">Car Collection</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Experience the pinnacle of automotive excellence with our curated collection 
              of exotic and luxury vehicles in South Florida
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
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="luxury-card group relative overflow-hidden">
                {/* Premium Badge */}
                {car.dailyPrice >= 1000 && (
                  <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </div>
                )}

                {/* Car Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img loading="lazy"
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Car Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{car.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="capitalize">{car.subcategory.replace(/_/g, ' ')}</span>
                        <span>•</span>
                        <span>{car.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-luxury-gold">
                        ${car.dailyPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">per day</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Zap className="w-3 h-3 text-luxury-gold" />
                      <span>High Performance</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Star className="w-3 h-3 text-luxury-gold" />
                      <span>Premium Interior</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Users className="w-3 h-3 text-luxury-gold" />
                      <span>Luxury Experience</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Zap className="w-3 h-3 text-luxury-gold" />
                      <span>Advanced Tech</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/cars/${car.slug}`}
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
              Can't find the perfect exotic car? We have access to exclusive vehicles not shown here.
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