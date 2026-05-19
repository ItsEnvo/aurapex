import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Star, Users, Zap, MapPin, Calendar, Clock, Shield } from 'lucide-react'
import { findItemBySlug } from '../data/inventory'
import type { JetSki } from '../data/inventory'
import ImageGallery from '../components/ImageGallery'

const JetSkiDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/jet-skis" replace />
  }

  const jetski = findItemBySlug('jet-skis', slug) as JetSki | null
  
  if (!jetski) {
    return <Navigate to="/jet-skis" replace />
  }

  const handleBooking = () => {
    // Navigate to home and scroll to contact
    const msg = encodeURIComponent(`Hi, I'm interested in jet ski rentals. Can you help?`); window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to="/jet-skis"
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Jet Skis</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          {/* Image Gallery — Full Width */}
          <div className="mb-12">
            <ImageGallery images={jetski.images} title={jetski.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Jet Ski Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-4">
                  {jetski.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                    <span>{jetski.locations.length} Locations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Up to 3 riders</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="luxury-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-luxury-gold">
                      ${jetski.hourlyPrice}
                    </div>
                    <div className="text-gray-400">per hour</div>
                  </div>
                  {jetski.dailyPrice && (
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        ${jetski.dailyPrice}
                      </div>
                      <div className="text-sm text-gray-400">full day</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Zap className="w-5 h-5 text-luxury-gold" />
                    <span>High Performance</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Easy Handling</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span>Water Sports</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Shield className="w-5 h-5 text-luxury-gold" />
                    <span>Safety Equipment</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBooking}
                className="w-full luxury-button flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Reserve Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="luxury-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Available Locations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jetski.locations.map((location, index) => (
                <div key={index} className="bg-luxury-charcoal/50 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-luxury-gold mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">{location}</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-luxury-gold" />
                          <span>
                            {location.includes('Miami') 
                              ? `$${jetski.hourlyPrice}/hour` 
                              : '$100-120/hour'}
                          </span>
                        </div>
                        {jetski.dailyPrice && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-luxury-gold" />
                            <span>${jetski.dailyPrice}/day</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                Pricing may vary by location and season. Contact us for current rates and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What's Included */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">What's Included</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Safety Equipment</h4>
                    <p className="text-gray-400 text-sm">Life jackets and safety whistle provided</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Safety Briefing</h4>
                    <p className="text-gray-400 text-sm">Complete orientation before departure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Full Tank of Gas</h4>
                    <p className="text-gray-400 text-sm">Ready to ride with full fuel tank</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Waterproof Storage</h4>
                    <p className="text-gray-400 text-sm">Secure compartment for personal items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">Rental Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Age Requirements</h4>
                    <p className="text-gray-400 text-sm">Minimum 18 years old to operate, 16+ with guardian</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Valid ID Required</h4>
                    <p className="text-gray-400 text-sm">Government-issued photo ID for all renters</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Security Deposit</h4>
                    <p className="text-gray-400 text-sm">Refundable deposit required at pickup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Advance Booking</h4>
                    <p className="text-gray-400 text-sm">24 hours advance booking recommended</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="text-center">
            <h3 className="text-3xl font-luxury font-bold text-white mb-6">
              Ready for Adventure on <span className="text-gradient">{jetski.title}</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact us to check availability at your preferred location and book your jet ski adventure
            </p>
            <button
              onClick={handleBooking}
              className="luxury-button"
            >
              Book Your Adventure
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JetSkiDetail