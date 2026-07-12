import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Ruler, MapPin } from 'lucide-react'
import { findFleetCity, yachtsInCity } from '../data/fleet'

const DestinationCity: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>()
  if (!citySlug) return <Navigate to="/yachts" replace />

  const city = findFleetCity(citySlug)
  if (!city) return <Navigate to="/yachts" replace />

  const yachts = yachtsInCity(citySlug)

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back */}
      <section className="pt-24 pb-6 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to="/yachts"
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>All Destinations</span>
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="pb-10 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="flex items-center gap-2 text-luxury-gold text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{city.count} {city.count === 1 ? 'yacht' : 'yachts'} available</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white">
            {city.name}
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {yachts.map((y) => (
              <Link
                key={`${y.kind}-${y.slug}`}
                to={y.detailPath}
                className="group luxury-card !p-0 overflow-hidden rounded-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    loading="lazy"
                    src={y.image}
                    alt={y.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{y.name}</h3>
                  <div className="flex items-center justify-between">
                    {y.lengthFt > 0 ? (
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <Ruler className="w-3 h-3" /> {y.lengthFt} ft
                      </span>
                    ) : <span />}
                    <span className="flex items-center gap-1 text-sm text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DestinationCity
