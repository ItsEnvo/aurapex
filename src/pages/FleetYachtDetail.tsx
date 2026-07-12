import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Ruler, Anchor, Users, Star, Calendar, MapPin } from 'lucide-react'
import { findFleetYacht, findFleetCity } from '../data/fleet'

const FleetYachtDetail: React.FC = () => {
  const { citySlug, yachtSlug } = useParams<{ citySlug: string; yachtSlug: string }>()
  if (!citySlug || !yachtSlug) return <Navigate to="/destinations" replace />

  const yacht = findFleetYacht(citySlug, yachtSlug)
  const city = findFleetCity(citySlug)
  if (!yacht || !city) return <Navigate to="/destinations" replace />

  const handleInquire = () => {
    const msg = encodeURIComponent(
      `Hi, I'm interested in chartering the ${yacht.name} in ${city.name}. Can you help with availability and pricing?`
    )
    window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back */}
      <section className="pt-24 pb-6 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to={`/destinations/${city.slug}`}
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to {city.name}</span>
          </Link>
        </div>
      </section>

      {/* Hero image + details */}
      <section className="pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="rounded-2xl overflow-hidden mb-10 max-h-[70vh]">
            <img src={yacht.image} alt={yacht.name} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white">{yacht.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                {yacht.lengthFt > 0 && (
                  <span className="flex items-center gap-2"><Ruler className="w-5 h-5 text-luxury-gold" /> {yacht.lengthFt} ft</span>
                )}
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-luxury-gold" /> {city.name}</span>
                <span className="flex items-center gap-2"><Anchor className="w-5 h-5 text-luxury-gold" /> Crewed charter</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-gray-300"><Users className="w-5 h-5 text-luxury-gold" /> Professional crew</div>
                <div className="flex items-center gap-3 text-gray-300"><Star className="w-5 h-5 text-luxury-gold" /> Premium amenities</div>
                <div className="flex items-center gap-3 text-gray-300"><Anchor className="w-5 h-5 text-luxury-gold" /> Water toys</div>
                <div className="flex items-center gap-3 text-gray-300"><Calendar className="w-5 h-5 text-luxury-gold" /> Flexible itinerary</div>
              </div>
            </div>

            {/* Inquire card */}
            <div className="luxury-card h-fit">
              <div className="text-2xl font-bold text-luxury-gold mb-1">Inquire for pricing</div>
              <p className="text-gray-400 text-sm mb-6">Custom quote based on your dates, duration and group size.</p>
              <button onClick={handleInquire} className="w-full luxury-button flex items-center justify-center gap-2">
                <Calendar size={18} /> Request a Quote
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">Crew &amp; fuel included · Gratuity appreciated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding text-center">
          <h3 className="text-3xl font-luxury font-bold text-white mb-6">
            Ready to charter <span className="text-gradient">{yacht.name}</span>?
          </h3>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Our charter specialists will check availability in {city.name} and build your perfect day on the water.
          </p>
          <button onClick={handleInquire} className="luxury-button">Request a Quote</button>
        </div>
      </section>
    </div>
  )
}

export default FleetYachtDetail
