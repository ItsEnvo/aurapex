import React from 'react'
import { Zap, MapPin, Users, Clock, Shield, Star, Waves, Phone } from 'lucide-react'

const JetSkisPage: React.FC = () => {
  const handleBooking = (pkg: string) => {
    const msg = encodeURIComponent(`Hi, I'm interested in the ${pkg} jet ski rental. Can you help me book?`)
    window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  const packages = [
    {
      name: '1 Hour Ride',
      price: '$125',
      priceNote: 'per jet ski',
      location: 'Fort Lauderdale / Deerfield',
      features: ['Yamaha WaveRunner', 'Safety briefing included', 'Life jackets provided', 'Perfect for beginners'],
      popular: false,
    },
    {
      name: '1 Hour Ride',
      price: '$150',
      priceNote: 'per jet ski',
      location: 'Miami',
      features: ['Yamaha WaveRunner', 'Ride along Miami coastline', 'Star Island & skyline views', 'Photo opportunities'],
      popular: true,
    },
    {
      name: '2 Jet Skis — Full Day',
      price: '$1,100',
      priceNote: 'for both',
      location: 'South Florida',
      features: ['2 Yamaha WaveRunners', 'Full day adventure', 'Multiple locations available', 'Best value for groups'],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1626954079979-5e8003659536?w=1600&h=900&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-max section-padding relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              Jet Ski <span className="text-gradient">Rentals</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Hit the waves on high-performance Yamaha WaveRunners across South Florida's most iconic waterways
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-luxury-gold" />
                <span>High Performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span>3 Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-luxury-gold" />
                <span>Safety Equipment Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-4">
              Choose Your <span className="text-gradient">Package</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              All rentals include safety equipment, briefing, and fuel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`luxury-card relative ${pkg.popular ? 'ring-2 ring-luxury-gold' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-luxury-gold mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-400">{pkg.priceNote}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center space-x-3 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBooking(pkg.name + ' - ' + pkg.location)}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-luxury-gold text-luxury-black hover:bg-gold-400'
                      : 'border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10'
                  }`}
                >
                  <Phone size={16} />
                  <span>Book Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-luxury font-bold text-white mb-4">
              Available <span className="text-gradient">Locations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { city: 'Miami', desc: 'Ride past Star Island, South Beach, and the Miami skyline', rate: '$150/hr' },
              { city: 'Fort Lauderdale', desc: 'Cruise the Intracoastal Waterway and explore the Venice of America', rate: '$125/hr' },
              { city: 'Deerfield Beach', desc: 'Crystal clear waters with less crowds, great for beginners', rate: '$125/hr' },
            ].map((loc, i) => (
              <div key={i} className="luxury-card text-center">
                <MapPin className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{loc.city}</h3>
                <p className="text-gray-400 text-sm mb-4">{loc.desc}</p>
                <div className="text-luxury-gold font-semibold">{loc.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-luxury font-bold text-white mb-4">
              What's <span className="text-gradient">Included</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Zap, label: 'Yamaha WaveRunners' },
              { icon: Shield, label: 'Life Jackets' },
              { icon: Users, label: 'Safety Briefing' },
              { icon: Waves, label: 'Fuel Included' },
              { icon: Clock, label: 'Flexible Times' },
              { icon: MapPin, label: 'Multiple Locations' },
              { icon: Star, label: 'Photo Stops' },
              { icon: Phone, label: '24/7 Support' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <item.icon className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group CTA */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center">
            <h3 className="text-3xl font-luxury font-bold text-white mb-6">
              Planning a <span className="text-gradient">Group Ride</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Need multiple jet skis for a party, bachelor/bachelorette, or corporate event? We offer custom group packages at discounted rates.
            </p>
            <button
              onClick={() => handleBooking('Group jet ski package')}
              className="luxury-button"
            >
              Get Group Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JetSkisPage
