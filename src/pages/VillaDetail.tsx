import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Star, Users, Home, MapPin, Calendar, Bed, Wifi, Car } from 'lucide-react'
import { findItemBySlug } from '../data/inventory'
import type { Villa } from '../data/inventory'
import ImageGallery from '../components/ImageGallery'

const VillaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/villas" replace />
  }

  const villa = findItemBySlug('villas', slug) as Villa | null
  
  if (!villa) {
    return <Navigate to="/villas" replace />
  }

  const handleBooking = () => {
    // Navigate to home and scroll to contact
    const msg = encodeURIComponent(`Hi, I'm interested in the ${villa.title} villa. Can you help?`); window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to="/villas"
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Villas</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          {/* Image Gallery — Full Width */}
          <div className="mb-12">
            <ImageGallery images={villa.images} title={villa.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Villa Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-4">
                  {villa.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                    <span>{villa.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-lg text-white">
                  {villa.bedrooms > 0 && (
                    <div className="flex items-center space-x-2">
                      <Bed className="w-5 h-5 text-luxury-gold" />
                      <span>{villa.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {villa.bathrooms > 0 && (
                    <div className="flex items-center space-x-2">
                      <Home className="w-5 h-5 text-luxury-gold" />
                      <span>{villa.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {villa.sleeps > 0 && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-luxury-gold" />
                      <span>Sleeps {villa.sleeps}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="luxury-card">
                <div className="flex items-center justify-between">
                  <div>
                    {villa.nightlyPrice > 0 ? (
                      <>
                        <div className="text-3xl font-bold text-luxury-gold">
                          ${villa.nightlyPrice.toLocaleString()}
                        </div>
                        <div className="text-gray-400">per night</div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-luxury-gold">Inquire for pricing</div>
                        <div className="text-gray-400">Custom quote per dates</div>
                      </>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>Minimum 3 nights</div>
                    <div>Weekend rates may vary</div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Home className="w-5 h-5 text-luxury-gold" />
                    <span>Private Pool</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span>Ocean Views</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Concierge Service</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                    <span>Prime Location</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBooking}
                className="w-full luxury-button flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Book Villa</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Amenities */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">Villa Amenities</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Private Pool & Spa</h4>
                    <p className="text-gray-400 text-sm">Heated pool with spa and sun deck</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Gourmet Kitchen</h4>
                    <p className="text-gray-400 text-sm">Fully equipped with premium appliances</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Wifi className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">High-Speed Internet</h4>
                    <p className="text-gray-400 text-sm">Complimentary WiFi throughout the property</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Car className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Private Parking</h4>
                    <p className="text-gray-400 text-sm">Secure parking for multiple vehicles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">Concierge Services</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Personal Concierge</h4>
                    <p className="text-gray-400 text-sm">Dedicated concierge for your entire stay</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Housekeeping</h4>
                    <p className="text-gray-400 text-sm">Daily housekeeping service included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Private Chef Available</h4>
                    <p className="text-gray-400 text-sm">Chef services can be arranged upon request</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Transportation</h4>
                    <p className="text-gray-400 text-sm">Airport transfers and local transportation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Nearby */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="luxury-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Location & Nearby</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Prime Location</h4>
                <p className="text-gray-400 text-sm">
                  Located in {villa.location}, minutes from world-class dining and shopping
                </p>
              </div>
              
              <div className="text-center">
                <Star className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Beach Access</h4>
                <p className="text-gray-400 text-sm">
                  Private beach access or short walk to pristine South Florida beaches
                </p>
              </div>
              
              <div className="text-center">
                <Users className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Entertainment</h4>
                <p className="text-gray-400 text-sm">
                  Close to nightlife, restaurants, and Miami's vibrant cultural scene
                </p>
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
              Ready to Book <span className="text-gradient">{villa.title}</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact our villa specialists to check availability and customize your luxury stay experience
            </p>
            <button
              onClick={handleBooking}
              className="luxury-button"
            >
              Reserve Your Villa
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VillaDetail