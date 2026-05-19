import React from 'react'
import { ArrowRight, Star, Users, Music, Camera, Utensils, Plane } from 'lucide-react'

const ExperiencesPage: React.FC = () => {
  const openWhatsApp = (experienceName: string) => {
    const msg = encodeURIComponent(`Hi, I'm interested in the ${experienceName} experience. Can you help me with details and booking?`)
    window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  const experiences = {
    nightlife: [
      {
        name: 'VIP Nightclub Table (LIV, E11EVEN, Story)',
        description: 'Premium table service at Miami\'s most exclusive nightclubs with bottle service for up to 10 guests',
        price: 'From $2,500/table',
        icon: Music
      },
      {
        name: 'VIP Club Crawl Package',
        description: '3 venues, VIP entry, personal host, and luxury transportation between clubs',
        price: 'From $1,500/person',
        icon: Star
      },
      {
        name: 'Private Rooftop Party',
        description: 'Exclusive venue, DJ, professional bartender, and setup for up to 30 guests',
        price: 'From $5,000',
        icon: Users
      }
    ],
    transportation: [
      {
        name: 'Luxury Limousine (Stretch)',
        description: 'Classic stretch limousine service with professional chauffeur, 3-hour minimum',
        price: 'From $250/hour',
        icon: Star
      },
      {
        name: 'Party Bus (up to 30 guests)',
        description: 'Full-size party bus with sound system, lighting, and bar setup',
        price: 'From $350/hour',
        icon: Users
      },
      {
        name: 'Luxury Sprinter Van',
        description: 'Mercedes Sprinter with premium interior and amenities',
        price: 'From $200/hour',
        icon: Star
      },
      {
        name: 'Airport VIP Transfer (Black Car)',
        description: 'Premium black car service to/from Miami International Airport',
        price: 'From $150 one-way',
        icon: Plane
      }
    ],
    dining: [
      {
        name: 'Private Chef Experience',
        description: 'Personal chef creates multi-course meal at your location, minimum 6 guests',
        price: 'From $150/person',
        icon: Utensils
      },
      {
        name: 'Yacht Catering Package',
        description: 'Full catering service with appetizers, entrees, and dessert delivered to your yacht',
        price: 'From $75/person',
        icon: Utensils
      },
      {
        name: 'Private Dining at Top Restaurant',
        description: 'Exclusive dining arrangements at Miami\'s finest restaurants',
        price: 'From $500 setup fee + menu prices',
        icon: Star
      }
    ],
    celebrations: [
      {
        name: 'Birthday Yacht Package',
        description: 'Complete birthday setup with balloons, cake, champagne, and decorations',
        price: 'From $500 add-on',
        icon: Star
      },
      {
        name: 'Proposal Package',
        description: 'Romantic proposal setup with photographer, flowers, champagne, and private setting',
        price: 'From $750',
        icon: Camera
      },
      {
        name: 'Bachelor/Bachelorette Package',
        description: 'Complete party package including yacht, club access, and luxury transportation',
        price: 'From $2,000',
        icon: Users
      },
      {
        name: 'Anniversary/Holiday Package',
        description: 'Special occasion decorations, champagne service, and custom cake',
        price: 'From $400 add-on',
        icon: Star
      }
    ],
    wellness: [
      {
        name: 'Private Helicopter Tour',
        description: '30-minute scenic tour of Miami skyline and coastline with professional pilot',
        price: 'From $350/person',
        icon: Plane
      },
      {
        name: 'Deep Sea Fishing Charter',
        description: 'Half-day deep sea fishing experience for up to 6 guests with equipment',
        price: 'From $1,200',
        icon: Star
      },
      {
        name: 'Spa Day at Luxury Resort',
        description: 'Full spa day access at premier Miami Beach resort with treatments',
        price: 'From $300/person',
        icon: Star
      },
      {
        name: 'Scuba/Snorkeling Excursion',
        description: 'Guided underwater adventure with equipment and instruction included',
        price: 'From $150/person',
        icon: Star
      }
    ]
  }

  const categories = [
    { key: 'nightlife', title: 'Nightlife & VIP', subtitle: 'Miami\'s exclusive club scene' },
    { key: 'transportation', title: 'Transportation', subtitle: 'Luxury ground transportation' },
    { key: 'dining', title: 'Dining & Chef', subtitle: 'Culinary experiences' },
    { key: 'celebrations', title: 'Celebrations & Events', subtitle: 'Special occasions' },
    { key: 'wellness', title: 'Wellness & Adventure', subtitle: 'Unique Miami experiences' }
  ]

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              Miami <span className="text-gradient">Experiences</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
              Beyond rentals — AuraPex is your gateway to Miami's most exclusive experiences. 
              From VIP nightlife to private dining, we curate unforgettable moments in paradise.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-luxury-gold" />
                <span>Exclusive Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-luxury-gold" />
                <span>Personal Concierge</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-luxury-gold" />
                <span>Luxury Experiences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Categories */}
      {categories.map((category) => (
        <section key={category.key} className="py-16 bg-luxury-black">
          <div className="container-max section-padding">
            {/* Category Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-4">
                {category.title}
              </h2>
              <p className="text-lg text-gray-400">{category.subtitle}</p>
            </div>

            {/* Experience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences[category.key as keyof typeof experiences].map((experience, index) => (
                <div key={index} className="luxury-card group relative overflow-hidden">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-gold-400 rounded-lg flex items-center justify-center mb-6">
                    <experience.icon className="w-6 h-6 text-luxury-black" />
                  </div>

                  {/* Experience Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{experience.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{experience.description}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-luxury-gold">
                        {experience.price}
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={() => openWhatsApp(experience.name)}
                      className="w-full luxury-button flex items-center justify-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="py-16 bg-luxury-charcoal">
        <div className="container-max section-padding">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-6">
              Ready for Your <span className="text-gradient">Miami Adventure</span>?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Our concierge team is standing by to create the perfect Miami experience tailored to your desires. 
              From intimate dinners to epic celebrations, we make it happen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => openWhatsApp('custom experience planning')}
                className="luxury-button"
              >
                Plan My Experience
              </button>
              <button
                onClick={() => window.open('https://wa.me/15617774360?text=Hi%2C%20I%27d%20like%20to%20combine%20vehicle%20rentals%20with%20experiences.%20Can%20you%20help%20create%20a%20package%3F', '_blank')}
                className="luxury-button-outline"
              >
                Create Package Deal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExperiencesPage