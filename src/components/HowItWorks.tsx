import React from 'react'
import { Search, Calendar, Key, CheckCircle, Clock, Shield } from 'lucide-react'

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Browse & Select',
      description: 'Explore our premium fleet of exotic cars, luxury yachts, and jet skis. Filter by category, price, or specific features to find your perfect rental.',
      details: ['View detailed specifications', 'Check real-time availability', 'Compare pricing options']
    },
    {
      number: 2,
      icon: Calendar,
      title: 'Reserve & Confirm',
      description: 'Submit your booking request with preferred dates and vehicle. Our concierge team will confirm availability and handle all arrangements.',
      details: ['Flexible date selection', '24/7 concierge support', 'Secure booking process']
    },
    {
      number: 3,
      icon: Key,
      title: 'Drive & Enjoy',
      description: 'Pick up your vehicle at our convenient locations or enjoy complimentary delivery. Experience luxury with our full support throughout your rental.',
      details: ['Convenient pickup locations', 'Delivery service available', 'Full insurance coverage']
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Verified Fleet',
      description: 'Every vehicle is meticulously maintained and verified for safety and performance'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock concierge service for any assistance you need'
    },
    {
      icon: Shield,
      title: 'Full Insurance',
      description: 'Comprehensive coverage included with every rental for peace of mind'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-luxury-black to-luxury-charcoal">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience seamless luxury rental with our simple 3-step process. 
            From selection to delivery, we handle every detail.
          </p>
        </div>

        {/* Steps Process */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-gold via-gold-400 to-luxury-gold transform -translate-y-1/2 mx-32"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className="luxury-card text-center relative">
                    {/* Step Number Circle */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-luxury-gold to-gold-400 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-luxury-black font-bold text-lg">{step.number}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="mt-8 mb-6 flex justify-center">
                      <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-luxury-gold" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
                    
                    {/* Details List */}
                    <ul className="space-y-2 text-sm">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-luxury-gold mr-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Mobile Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-luxury-gold to-gold-400"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-luxury font-bold text-center text-white mb-12">
            Why Choose <span className="text-gradient">AuraPex</span>?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{benefit.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-luxury font-bold text-white mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-gray-400 mb-6">
              Start your premium rental journey today. Our team is standing by to make your luxury dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
                className="luxury-button"
              >
                Browse Fleet
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="luxury-button-outline"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks