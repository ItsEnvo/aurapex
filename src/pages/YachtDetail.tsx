import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Star, Users, Anchor, MapPin, Calendar, Clock } from 'lucide-react'
import { findItemBySlug } from '../data/inventory'
import type { Yacht } from '../data/inventory'
import ImageGallery from '../components/ImageGallery'
import YachtAddOns from '../components/YachtAddOns'

const YachtDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/yachts" replace />
  }

  const yacht = findItemBySlug('yachts', slug) as Yacht | null
  
  if (!yacht) {
    return <Navigate to="/yachts" replace />
  }

  const handleBooking = () => {
    const msg = encodeURIComponent(`Hi, I'm interested in chartering the ${yacht.title}. Can you help me with availability and pricing?`)
    window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to="/yachts"
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Yachts</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          {/* Image Gallery — Full Width */}
          <div className="mb-12">
            <ImageGallery images={yacht.images} title={yacht.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Yacht Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-4">
                  {yacht.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Up to {yacht.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Anchor className="w-5 h-5 text-luxury-gold" />
                    <span>{(yacht.departure || 'Miami, FL').includes('Miami') ? 'Miami' : 'Fort Lauderdale'}</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Professional Crew</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span>Premium Amenities</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Anchor className="w-5 h-5 text-luxury-gold" />
                    <span>Water Sports</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Clock className="w-5 h-5 text-luxury-gold" />
                    <span>Full Service</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBooking}
                className="w-full luxury-button flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Book Charter</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="luxury-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Charter Pricing</h3>
            
            {yacht.startingPrice > 0 ? (
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Starting From</div>
                <div className="text-4xl font-bold text-white mb-1">${yacht.startingPrice.toLocaleString()}</div>
                <div className="text-luxury-gold font-medium">for 4 hours</div>
                <p className="text-sm text-gray-400 mt-4">Pricing varies by day of week. Contact us for a custom quote.</p>
                <button
                  onClick={handleBooking}
                  className="mt-6 luxury-button inline-flex items-center gap-2"
                >
                  <Calendar size={18} />
                  Get Exact Quote
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-gold mb-2">Contact for Pricing</div>
                <p className="text-gray-400">Custom charter pricing available based on your needs</p>
                <button
                  onClick={handleBooking}
                  className="mt-6 luxury-button inline-flex items-center gap-2"
                >
                  <Calendar size={18} />
                  Request Quote
                </button>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
                <div className="text-center">
                  <Star className="w-5 h-5 text-luxury-gold mx-auto mb-2" />
                  <div>Crew & fuel included</div>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 text-luxury-gold mx-auto mb-2" />
                  <div>Gratuity appreciated</div>
                </div>
                <div className="text-center">
                  <Anchor className="w-5 h-5 text-luxury-gold mx-auto mb-2" />
                  <div>Departure location included</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yacht Add-Ons */}
      <YachtAddOns />

      {/* Details Section */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What's Included */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">What's Included</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Professional Crew</h4>
                    <p className="text-gray-400 text-sm">Experienced captain and crew for safe navigation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Anchor className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Fuel & Marina Fees</h4>
                    <p className="text-gray-400 text-sm">All fuel and standard marina costs included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Water Sports Equipment</h4>
                    <p className="text-gray-400 text-sm">Snorkeling gear, water toys, and more</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Sound System</h4>
                    <p className="text-gray-400 text-sm">Premium audio system with Bluetooth connectivity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charter Details */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">Charter Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Departure Location</h4>
                    <p className="text-gray-400 text-sm">{yacht.departure || 'Miami, FL'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Guest Capacity</h4>
                    <p className="text-gray-400 text-sm">Maximum {yacht.maxGuests} guests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Booking Requirements</h4>
                    <p className="text-gray-400 text-sm">24-48 hours advance booking recommended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Custom Itineraries</h4>
                    <p className="text-gray-400 text-sm">Personalized routes and destinations available</p>
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
              Ready to Charter <span className="text-gradient">{yacht.title}</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact our charter specialists to check availability and plan your perfect day on the water
            </p>
            <button
              onClick={handleBooking}
              className="luxury-button"
            >
              Book Your Charter
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default YachtDetail