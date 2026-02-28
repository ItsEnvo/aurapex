import React from 'react'
import { Award, Users, Car, Anchor, Zap, Heart } from 'lucide-react'

const About: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: 'Satisfied Clients',
      description: 'Trusted by discerning customers across South Florida'
    },
    {
      icon: Car,
      number: '50+',
      label: 'Premium Vehicles',
      description: 'Exotic cars, luxury yachts, and performance watercraft'
    },
    {
      icon: Award,
      number: '5',
      label: 'Years Experience',
      description: 'Established reputation in luxury rental market'
    },
    {
      icon: Heart,
      number: '99%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding expectations with every rental'
    }
  ]

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in every aspect of our service, from vehicle condition to customer experience.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Our fleet represents the pinnacle of automotive and marine engineering, delivering unmatched performance.'
    },
    {
      icon: Users,
      title: 'Service',
      description: 'Personalized concierge service ensures every detail is handled with care and professionalism.'
    }
  ]

  return (
    <section id="about" className="py-24 bg-luxury-black">
      <div className="container-max section-padding">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              Why <span className="text-gradient">AuraPex</span> Rentals?
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              AuraPex Rentals is South Florida's premier luxury vehicle rental service, 
              specializing in exotic cars, luxury yachts, and high-performance watercraft. 
              Based in Fort Lauderdale with operations in Miami, we've built our reputation 
              on delivering exceptional experiences to our discerning clientele.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-luxury-gold rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Brokered Excellence</h4>
                  <p className="text-gray-400">
                    Through our exclusive partnerships with premier fleet owners, we access 
                    the finest vehicles at competitive rates, passing the savings to you.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-luxury-gold rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Local Expertise</h4>
                  <p className="text-gray-400">
                    Deep knowledge of South Florida's luxury scene ensures perfect 
                    vehicle matches for every occasion, from Miami Beach to Fort Lauderdale.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-luxury-gold rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Concierge Service</h4>
                  <p className="text-gray-400">
                    24/7 dedicated support team handles every detail, from delivery 
                    arrangements to special requests, ensuring seamless experiences.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="luxury-button"
            >
              Experience the Difference
            </button>
          </div>
          
          {/* Image/Visual */}
          <div className="relative">
            <div className="glass-effect rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-luxury-gold" />
                      </div>
                      <div className="text-2xl font-bold text-luxury-gold mb-1">{stat.number}</div>
                      <div className="text-sm font-semibold text-white mb-2">{stat.label}</div>
                      <div className="text-xs text-gray-400">{stat.description}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-luxury-gold/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-luxury font-bold mb-6">
            Our <span className="text-gradient">Values</span>
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built on a foundation of excellence, performance, and unmatched service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="luxury-card text-center">
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-luxury-gold" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">{value.title}</h4>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-luxury font-bold text-white mb-6">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              To provide South Florida's most discerning clients with unparalleled access 
              to the world's finest luxury vehicles, backed by exceptional service and 
              unwavering commitment to excellence. Every rental is not just a transaction, 
              but a curated luxury experience that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-luxury-gold">
                <Anchor className="w-5 h-5" />
                <span className="font-medium">Fort Lauderdale • Miami</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-luxury-gold rounded-full self-center"></div>
              <div className="flex items-center space-x-2 text-luxury-gold">
                <Award className="w-5 h-5" />
                <span className="font-medium">Premium Service Since 2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About