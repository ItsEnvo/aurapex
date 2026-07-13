import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Star, Users, Zap, MapPin, Calendar, Shield } from 'lucide-react'
import { findItemBySlug } from '../data/inventory'
import type { Car } from '../data/inventory'
import ImageGallery from '../components/ImageGallery'

const CarDetail: React.FC = () => {
  const { citySlug, carSlug } = useParams<{ citySlug: string; carSlug: string }>()

  if (!carSlug) {
    return <Navigate to="/cars" replace />
  }

  const car = findItemBySlug('cars', carSlug) as Car | null

  if (!car) {
    return <Navigate to="/cars" replace />
  }

  const backTo = citySlug ? `/cars/${citySlug}` : '/cars'

  const handleBooking = () => {
    // Navigate to home and scroll to contact
    const msg = encodeURIComponent(`Hi, I'm interested in renting the ${car.title}. Can you help?`); window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Back Navigation */}
      <section className="pt-24 pb-8 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <Link
            to={backTo}
            className="inline-flex items-center space-x-2 text-luxury-gold hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Cars</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          {/* Image Gallery — Full Width */}
          <div className="mb-12">
            <ImageGallery images={car.images} title={car.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-4">
                  {car.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span className="capitalize">{car.subcategory.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="luxury-card">
                <div className="flex items-center justify-between">
                  <div>
                    {car.dailyPrice > 0 ? (
                      <>
                        <div className="text-3xl font-bold text-luxury-gold">
                          ${car.dailyPrice.toLocaleString()}
                        </div>
                        <div className="text-gray-400">per day</div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-luxury-gold">Inquire</div>
                        <div className="text-gray-400">for pricing</div>
                      </>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>Full coverage insurance required</div>
                    <div>+$100/day (optional)</div>
                  </div>
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
                    <Star className="w-5 h-5 text-luxury-gold" />
                    <span>Premium Interior</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>Luxury Experience</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Shield className="w-5 h-5 text-luxury-gold" />
                    <span>Advanced Safety</span>
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

      {/* Details Section */}
      <section className="py-16 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">Rental Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Valid Driver's License</h4>
                    <p className="text-gray-400 text-sm">Must be 25+ years old with clean driving record</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Insurance Required</h4>
                    <p className="text-gray-400 text-sm">You must provide proof of full coverage auto insurance before pickup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Security Deposit</h4>
                    <p className="text-gray-400 text-sm">Refundable deposit required at pickup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Delivery Available</h4>
                    <p className="text-gray-400 text-sm">Miami / Fort Lauderdale area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="luxury-card">
              <h3 className="text-2xl font-semibold text-white mb-6">What's Included</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Concierge Service</h4>
                    <p className="text-gray-400 text-sm">Personalized pickup and delivery coordination</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Full Tank of Gas</h4>
                    <p className="text-gray-400 text-sm">Vehicle delivered with full tank, return empty</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">24/7 Roadside Support</h4>
                    <p className="text-gray-400 text-sm">Emergency assistance throughout your rental</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Detailed Orientation</h4>
                    <p className="text-gray-400 text-sm">Complete vehicle walkthrough and instructions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center">
            <h3 className="text-3xl font-luxury font-bold text-white mb-6">
              Ready to Experience <span className="text-gradient">{car.title}</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact our concierge team to check availability and customize your luxury car rental experience
            </p>
            <button
              onClick={handleBooking}
              className="luxury-button"
            >
              Contact Us Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CarDetail