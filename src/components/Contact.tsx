import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Car, Anchor, Zap } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  vehicleType: string
  specificVehicle: string
  startDate: string
  endDate: string
  message: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    specificVehicle: '',
    startDate: '',
    endDate: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const vehicleTypes = [
    { value: 'exotic-car', label: 'Exotic Car', icon: Car },
    { value: 'luxury-yacht', label: 'Luxury Yacht', icon: Anchor },
    { value: 'jet-ski', label: 'Jet Ski', icon: Zap },
    { value: 'not-sure', label: 'Not Sure / Multiple', icon: Car }
  ]

  const locations = [
    {
      city: 'Fort Lauderdale',
      address: '123 Las Olas Boulevard\nFort Lauderdale, FL 33301',
      phone: '+1 (954) 555-0123',
      email: 'fortlauderdale@aurapexrentals.com'
    },
    {
      city: 'Miami',
      address: '456 Ocean Drive\nMiami Beach, FL 33139', 
      phone: '+1 (305) 555-0124',
      email: 'miami@aurapexrentals.com'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-effect rounded-2xl p-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-luxury font-bold text-white mb-4">
                Thank You!
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                Your luxury rental inquiry has been received. Our concierge team will contact you within 30 minutes to discuss your requirements and confirm availability.
              </p>
              <p className="text-lg text-luxury-gold mb-8">
                For immediate assistance, call us at <a href="tel:+1-954-555-0123" className="underline">(954) 555-0123</a>
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="luxury-button-outline"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-luxury-black">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            Get Your <span className="text-gradient">Dream Rental</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to experience ultimate luxury? Contact our concierge team to reserve your perfect vehicle or discuss custom rental arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Booking Inquiry Form</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Vehicle Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {vehicleTypes.map((type) => {
                      const IconComponent = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, vehicleType: type.value })}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.vehicleType === type.value
                              ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                              : 'border-white/20 bg-luxury-charcoal text-gray-300 hover:border-luxury-gold/50'
                          }`}
                        >
                          <IconComponent className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Specific Vehicle (Optional)
                  </label>
                  <input
                    type="text"
                    name="specificVehicle"
                    value={formData.specificVehicle}
                    onChange={handleInputChange}
                    className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                    placeholder="e.g., Lamborghini Huracán, Azimut 60, etc."
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors resize-none"
                    placeholder="Tell us about your event, special requirements, delivery preferences, or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full luxury-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-luxury-black border-t-transparent"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Locations */}
            {locations.map((location, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-luxury-gold" />
                  <span>{location.city}</span>
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                    <div className="text-gray-300 whitespace-pre-line">{location.address}</div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                    <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-luxury-gold transition-colors">
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                    <a href={`mailto:${location.email}`} className="text-gray-300 hover:text-luxury-gold transition-colors break-all">
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-luxury-gold" />
                <span>Service Hours</span>
              </h3>
              
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-3">
                  <div className="text-luxury-gold font-medium">24/7 Emergency Support</div>
                  <div className="text-xs">For existing rentals</div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Call our concierge team for instant quotes and availability.
              </p>
              <a href="tel:+1-954-555-0123" className="luxury-button w-full text-center block">
                Call (954) 555-0123
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact