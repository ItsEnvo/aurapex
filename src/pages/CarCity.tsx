import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Star, Users, Zap, MapPin } from 'lucide-react'
import { carCityBySlug, carsByCitySlug, carBySlug } from '../data/carCities'

const CarCity: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>()

  if (!citySlug) {
    return <Navigate to="/cars" replace />
  }

  const city = carCityBySlug(citySlug)

  // Preserve old single-segment links like /cars/audi-r8-gray -> redirect to the
  // new nested URL under its city.
  if (!city) {
    const car = carBySlug(citySlug)
    if (car) {
      return <Navigate to={`/cars/${car.citySlug}/${car.slug}`} replace />
    }
    return <Navigate to="/cars" replace />
  }

  const cars = carsByCitySlug(citySlug)

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <section className="pt-32 pb-12 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-luxury-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Cities</span>
          </Link>
          <div className="flex items-center gap-2 text-luxury-gold text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{city.count} {city.count === 1 ? 'vehicle' : 'vehicles'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-luxury font-bold text-white">
            {city.name} <span className="text-gradient">Exotics</span>
          </h1>
        </div>
      </section>

      {/* Grid or empty state */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          {cars.length === 0 ? (
            <div className="text-center max-w-2xl mx-auto py-16">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Fleet arriving in {city.name}
              </h2>
              <p className="text-gray-400 mb-8">
                We're adding exotic and luxury vehicles in {city.name}. Tell us what you're
                after and our concierge will source it for your dates.
              </p>
              <button
                onClick={() => window.open(`https://wa.me/15617774360?text=Hi%2C%20I%27m%20interested%20in%20renting%20an%20exotic%20car%20in%20${encodeURIComponent(city.name)}.%20What%27s%20available%3F`, '_blank')}
                className="luxury-button"
              >
                Inquire About {city.name}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car.id} className="luxury-card group relative overflow-hidden">
                  {car.dailyPrice >= 1000 && (
                    <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}

                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <img
                      loading="lazy"
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

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
                        {car.dailyPrice > 0 ? (
                          <>
                            <div className="text-xl font-bold text-luxury-gold">
                              ${car.dailyPrice.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400">per day</div>
                          </>
                        ) : (
                          <>
                            <div className="text-xl font-bold text-luxury-gold">Inquire</div>
                            <div className="text-sm text-gray-400">for pricing</div>
                          </>
                        )}
                      </div>
                    </div>

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

                    <Link
                      to={`/cars/${car.citySlug}/${car.slug}`}
                      className="w-full luxury-button flex items-center justify-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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

export default CarCity
