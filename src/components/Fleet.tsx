import React, { useState } from 'react'
import { Star, Users, Zap, Calendar } from 'lucide-react'

interface Vehicle {
  id: number
  name: string
  category: 'cars' | 'yachts' | 'jetskis'
  image: string
  price: number
  passengers?: number
  features: string[]
  rating: number
  popular?: boolean
}

const Fleet: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'cars' | 'yachts' | 'jetskis'>('cars')

  const vehicles: Vehicle[] = [
    // Cars
    {
      id: 1,
      name: 'Lamborghini Huracán',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      price: 1500,
      passengers: 2,
      features: ['V10 Engine', '630 HP', '0-60 in 3.2s', 'All-Wheel Drive'],
      rating: 5.0,
      popular: true
    },
    {
      id: 2,
      name: 'Rolls-Royce Phantom',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
      price: 1200,
      passengers: 4,
      features: ['V12 Engine', 'Chauffeur Available', 'Starlight Ceiling', 'Ultimate Luxury'],
      rating: 5.0
    },
    {
      id: 3,
      name: 'Ferrari F8 Tributo',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
      price: 1300,
      passengers: 2,
      features: ['V8 Twin-Turbo', '710 HP', '0-60 in 2.9s', 'Italian Excellence'],
      rating: 4.9
    },
    {
      id: 4,
      name: 'Mercedes S-Class',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      price: 500,
      passengers: 5,
      features: ['Luxury Interior', 'Massage Seats', 'Executive Class', 'Business Ready'],
      rating: 4.8
    },
    {
      id: 5,
      name: 'McLaren 720S',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      price: 1400,
      passengers: 2,
      features: ['V8 Twin-Turbo', '720 HP', 'Carbon Fiber', 'Track Ready'],
      rating: 4.9,
      popular: true
    },
    {
      id: 6,
      name: 'BMW i8',
      category: 'cars',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      price: 800,
      passengers: 2,
      features: ['Hybrid Power', 'Gullwing Doors', 'Futuristic Design', 'Eco-Luxury'],
      rating: 4.7
    },

    // Yachts
    {
      id: 7,
      name: 'Azimut 60 Flybridge',
      category: 'yachts',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      price: 3500,
      passengers: 12,
      features: ['60ft Luxury', '3 Staterooms', 'Full Crew', 'Flybridge'],
      rating: 5.0,
      popular: true
    },
    {
      id: 8,
      name: 'Sunseeker Manhattan 52',
      category: 'yachts',
      image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop',
      price: 2800,
      passengers: 10,
      features: ['52ft Cruiser', '2 Cabins', 'Spacious Deck', 'Premium Amenities'],
      rating: 4.9
    },
    {
      id: 9,
      name: 'Sea Ray Sundancer 320',
      category: 'yachts',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop',
      price: 1500,
      passengers: 8,
      features: ['32ft Sport Yacht', '1 Cabin', 'Entertainment System', 'Water Sports Ready'],
      rating: 4.8
    },
    {
      id: 10,
      name: 'Princess V40',
      category: 'yachts',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      price: 2200,
      passengers: 10,
      features: ['40ft Sport Cruiser', '2 Cabins', 'High Performance', 'British Luxury'],
      rating: 4.9
    },

    // Jet Skis
    {
      id: 11,
      name: 'Sea-Doo GTX 300',
      category: 'jetskis',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      price: 400,
      passengers: 3,
      features: ['300 HP', 'Luxury Touring', 'GPS Navigation', 'Premium Audio'],
      rating: 4.8,
      popular: true
    },
    {
      id: 12,
      name: 'Yamaha VX Cruiser',
      category: 'jetskis',
      image: 'https://images.unsplash.com/photo-1530961371816-eb43933e95bf?w=800&h=600&fit=crop',
      price: 300,
      passengers: 3,
      features: ['Comfortable Cruising', 'Fuel Efficient', 'Easy Handling', 'Family Friendly'],
      rating: 4.7
    },
    {
      id: 13,
      name: 'Kawasaki Ultra 310X',
      category: 'jetskis',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      price: 450,
      passengers: 2,
      features: ['310 HP', 'High Performance', 'Racing Capable', 'Supercharged'],
      rating: 4.9
    }
  ]

  const filteredVehicles = vehicles.filter(vehicle => vehicle.category === activeCategory)

  const categories = [
    { key: 'cars' as const, label: 'Exotic Cars', count: vehicles.filter(v => v.category === 'cars').length },
    { key: 'yachts' as const, label: 'Luxury Yachts', count: vehicles.filter(v => v.category === 'yachts').length },
    { key: 'jetskis' as const, label: 'Jet Skis', count: vehicles.filter(v => v.category === 'jetskis').length }
  ]

  const getCategoryTitle = () => {
    switch(activeCategory) {
      case 'cars': return 'Exotic Car Collection'
      case 'yachts': return 'Luxury Yacht Fleet'
      case 'jetskis': return 'High-Performance Jet Skis'
      default: return 'Our Fleet'
    }
  }

  return (
    <section id="fleet" className="py-24 bg-luxury-black">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            Our <span className="text-gradient">Premium Fleet</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover South Florida's most exclusive collection of exotic cars, luxury yachts, and high-performance watercraft
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row justify-center mb-12">
          <div className="glass-effect rounded-full p-2 inline-flex">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-luxury-gold text-luxury-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Category Title */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-luxury font-semibold text-white">
            {getCategoryTitle()}
          </h3>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="luxury-card group relative overflow-hidden">
              {/* Popular Badge */}
              {vehicle.popular && (
                <div className="absolute top-4 right-4 z-10 bg-luxury-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              {/* Vehicle Image */}
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{vehicle.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-luxury-gold fill-current" />
                      <span>{vehicle.rating}</span>
                      {vehicle.passengers && (
                        <>
                          <span>•</span>
                          <Users className="w-4 h-4" />
                          <span>{vehicle.passengers} passengers</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-luxury-gold">
                      ${vehicle.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">per day</div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                      <Zap className="w-3 h-3 text-luxury-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Reserve Button */}
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full luxury-button flex items-center justify-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>Reserve Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Can't find what you're looking for? We have access to exclusive vehicles not shown here.</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="luxury-button-outline"
          >
            Request Custom Vehicle
          </button>
        </div>
      </div>
    </section>
  )
}

export default Fleet