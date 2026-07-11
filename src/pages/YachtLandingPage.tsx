import React, { useState } from 'react'
import { Star, Shield, Users, Music, CheckCircle, Send } from 'lucide-react'
import { yachts } from '../data/inventory'

interface FormData {
  name: string
  email: string
  phone: string
  startDate: string
  endDate: string
  message: string
}

const YachtLandingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Select featured mid-range yachts for landing page
  const featuredYachts = yachts.filter(yacht => 
    yacht.startingPrice >= 800 && yacht.startingPrice <= 1500
  ).slice(0, 4)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create WhatsApp message
    const whatsappMessage = `New Aurapex Yacht Charter Lead: ${formData.name}, ${formData.phone}, ${formData.email}, interested in yacht charter, dates ${formData.startDate} - ${formData.endDate}, message: ${formData.message || 'No additional message'}`

    // Open WhatsApp first, while we still have the user gesture (an await before
    // window.open lets popup blockers kill the hand-off and drop the lead).
    const whatsappUrl = `https://wa.me/15617774360?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')

    // Also send to Web3Forms as an email backup so no lead is lost.
    try {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // Replace with actual key later
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          start_date: formData.startDate,
          end_date: formData.endDate,
          message: formData.message,
          subject: 'New Yacht Charter Inquiry - Landing Page'
        })
      })
    } catch (error) {
      console.log('Web3Forms backup failed:', error)
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/yachts/82ft-sunseeker-predator/1.jpg" 
            alt="Luxury Yacht"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-luxury font-bold mb-6">
            Luxury Yacht Charters<br />
            <span className="text-gradient">Miami & Fort Lauderdale</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-light">
            Starting from $670 | Professional Crew | Up to 13+ Guests
          </p>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <Star className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-medium">5-Star Reviews</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-medium">Professional Crew</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Music className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-medium">Premium Amenities</span>
            </div>
          </div>
          
          <button 
            onClick={scrollToBooking}
            className="luxury-button text-xl px-12 py-4 mb-4"
          >
            Book Your Charter
          </button>
          
          <p className="text-lg text-gray-300">
            Or call <a href="tel:+15617774360" className="text-luxury-gold hover:underline">(561) 777-4360</a> for immediate assistance
          </p>
        </div>
      </section>

      {/* Featured Yachts Section */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-6">
              Featured <span className="text-gradient">Yacht Fleet</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our premium collection of luxury yachts, each equipped with professional crew and premium amenities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredYachts.map((yacht) => (
              <div key={yacht.id} className="glass-effect rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={yacht.image || '/images/yachts/default-yacht.jpg'} 
                    alt={yacht.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-luxury-gold text-luxury-black px-3 py-1 rounded-full text-sm font-bold">
                      {yacht.priceDisplay}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{yacht.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Up to {yacht.maxGuests} guests • Professional crew included</p>
                  <button 
                    onClick={scrollToBooking}
                    className="luxury-button-outline w-full"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-6">
              What Our Guests Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"Absolutely incredible experience! The crew was professional, the yacht was pristine, and the Miami coastline views were breathtaking. Worth every penny!"</p>
              <div className="font-semibold text-white">- Sarah M.</div>
              <div className="text-sm text-gray-400">Miami Bachelor Party</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"Booked for our company event and it was flawless. The team handled everything professionally and our clients were thoroughly impressed."</p>
              <div className="font-semibold text-white">- Michael R.</div>
              <div className="text-sm text-gray-400">Corporate Event</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">"The perfect way to celebrate our anniversary. Beautiful yacht, amazing crew, and unforgettable sunset cruise. Highly recommend Aurapex!"</p>
              <div className="font-semibold text-white">- Jennifer & David L.</div>
              <div className="text-sm text-gray-400">Anniversary Celebration</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">What's included in my charter?</h3>
              <p className="text-gray-400">All yacht charters include professional crew, fuel, sound system, and basic amenities. Food and beverages can be arranged separately or you're welcome to bring your own.</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">How far in advance should I book?</h3>
              <p className="text-gray-400">We recommend booking at least 48-72 hours in advance, especially for weekends and holidays. However, we can often accommodate last-minute bookings based on availability.</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">What happens if there's bad weather?</h3>
              <p className="text-gray-400">Safety is our priority. If weather conditions are unsafe, we'll work with you to reschedule or provide a full refund. Our experienced captains monitor conditions closely.</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Can I bring my own food and drinks?</h3>
              <p className="text-gray-400">Absolutely! You're welcome to bring your own catering. We also offer catering services and can stock the yacht with your preferred beverages for an additional fee.</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Where do you pick up and drop off?</h3>
              <p className="text-gray-400">Most of our yachts depart from convenient marinas in Miami and Fort Lauderdale. The exact location will be confirmed when you book and depends on your chosen yacht.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-20 bg-luxury-black">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-luxury font-bold text-white mb-4">
                  Thank You!
                </h2>
                <p className="text-xl text-gray-400 mb-6">
                  Your yacht charter inquiry has been received. Our concierge team will contact you within 30 minutes to confirm availability and finalize details.
                </p>
                <p className="text-lg text-luxury-gold mb-8">
                  For immediate assistance, call us at <a href="tel:+15617774360" className="underline">(561) 777-4360</a>
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="luxury-button-outline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div className="glass-effect rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-luxury font-bold text-white mb-4">
                    Ready to Set Sail?
                  </h2>
                  <p className="text-xl text-gray-400">
                    Book your luxury yacht charter now and create unforgettable memories on the water.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Charter Date *
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
                        End Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Special Requests or Questions
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-luxury-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors resize-none"
                      placeholder="Tell us about your event, number of guests, catering needs, or any special requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full luxury-button flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-luxury-black border-t-transparent"></div>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Book Your Charter</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm">
                    Need to speak with someone immediately?<br />
                    <a href="tel:+15617774360" className="text-luxury-gold hover:underline text-lg font-semibold">
                      Call (561) 777-4360
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-luxury-gold to-yellow-400 text-luxury-black">
        <div className="container-max section-padding text-center">
          <h2 className="text-4xl font-luxury font-bold mb-4">
            Ready to Set Sail? Contact Us Now
          </h2>
          <p className="text-xl mb-8">
            Don't wait – your perfect yacht charter experience is just a call away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+15617774360" 
              className="bg-luxury-black text-luxury-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Call (561) 777-4360
            </a>
            <a 
              href="https://wa.me/15617774360" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-luxury-black text-luxury-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-luxury-black hover:text-luxury-gold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/15617774360" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
        </svg>
      </a>
    </div>
  )
}

export default YachtLandingPage