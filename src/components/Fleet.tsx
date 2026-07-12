import React, { useState } from 'react'
import { Star, Users, Zap, Calendar, ArrowRight, Utensils, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getFeaturedItems, inventory } from '../data/inventory'

interface DisplayVehicle {
  id: string
  name: string
  category: 'cars' | 'yachts' | 'villas' | 'jetSkis'
  image: string
  price: string
  passengers?: number
  features: string[]
  rating: number
  popular?: boolean
  slug: string
}

const Fleet: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'cars' | 'yachts' | 'villas' | 'jetSkis'>('cars')
  
  // Get featured inventory items
  const featured = getFeaturedItems()
  
  // Convert inventory to display format
  const vehicles: DisplayVehicle[] = [
    // Featured cars
    ...featured.cars.slice(0, 3).map(car => ({
      id: car.id,
      name: car.title,
      category: 'cars' as const,
      image: car.image,
      price: car.priceDisplay,
      passengers: 2, // Default for most luxury cars
      features: [
        car.subcategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        'Premium Interior',
        'Advanced Tech',
        'Luxury Experience'
      ],
      rating: 4.9,
      popular: car.dailyPrice >= 1000,
      slug: car.slug
    })),
    
    // Featured yachts
    ...featured.yachts.slice(0, 3).map(yacht => ({
      id: yacht.id,
      name: yacht.title,
      category: 'yachts' as const,
      image: yacht.image,
      price: yacht.priceDisplay,
      passengers: yacht.maxGuests,
      features: [
        `${yacht.maxGuests} Guests Max`,
        'Full Crew Included',
        'Premium Amenities',
        'Water Sports Ready'
      ],
      rating: 4.9,
      popular: yacht.startingPrice >= 2000,
      slug: yacht.slug
    })),
    
    // Featured villas
    ...featured.villas.slice(0, 3).map(villa => ({
      id: villa.id,
      name: villa.title,
      category: 'villas' as const,
      image: villa.image,
      price: villa.priceDisplay,
      passengers: villa.sleeps,
      features: [
        `${villa.bedrooms} Bedrooms`,
        `${villa.bathrooms} Bathrooms`,
        `Sleeps ${villa.sleeps}`,
        'Luxury Amenities'
      ],
      rating: 4.8,
      popular: villa.nightlyPrice >= 4000,
      slug: villa.slug
    })),
    
    // Featured jet skis
    ...featured.jetSkis.slice(0, 3).map(jetski => ({
      id: jetski.id,
      name: jetski.title,
      category: 'jetSkis' as const,
      image: jetski.image,
      price: jetski.priceDisplay,
      passengers: 3, // Default for jet skis
      features: [
        'High Performance',
        'Easy Handling',
        'Water Sports',
        'Adventure Ready'
      ],
      rating: 4.7,
      popular: jetski.hourlyPrice >= 150,
      slug: jetski.slug
    }))
  ]

  const filteredVehicles = vehicles.filter(vehicle => vehicle.category === activeCategory)

  const categories = [
    { key: 'cars' as const, label: 'Exotic Cars', count: inventory.cars.length, route: '/cars' },
    { key: 'yachts' as const, label: 'Luxury Yachts', count: inventory.yachts.length, route: '/yachts' },
    { key: 'villas' as const, label: 'Luxury Villas', count: inventory.villas.length, route: '/villas' },
    { key: 'jetSkis' as const, label: 'Jet Skis', count: inventory.jetSkis.length, route: '/jet-skis' }
  ]

  const getCategoryTitle = () => {
    switch(activeCategory) {
      case 'cars': return 'Exotic Car Collection'
      case 'yachts': return 'Luxury Yacht Fleet'
      case 'villas': return 'Premium Villa Collection'
      case 'jetSkis': return 'High-Performance Jet Skis'
      default: return 'Our Fleet'
    }
  }
  
  const getCategoryRoute = (category: string) => {
    switch(category) {
      case 'jetSkis': return '/jet-skis'
      default: return `/${category}`
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
          <h3 className="text-2xl md:text-3xl font-luxury font-semibold text-white mb-4">
            {getCategoryTitle()}
          </h3>
          <Link 
            to={getCategoryRoute(activeCategory)}
            className="luxury-button-outline inline-flex items-center space-x-2"
          >
            <span>View All {categories.find(c => c.key === activeCategory)?.label}</span>
            <ArrowRight size={16} />
          </Link>
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
                          <span>{vehicle.passengers} {vehicle.category === 'villas' ? 'sleeps' : vehicle.category === 'yachts' ? 'guests' : 'passengers'}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-luxury-gold">
                      {vehicle.price}
                    </div>
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

                {/* View Details Button */}
                <Link
                  to={vehicle.category === 'yachts'
                    ? `/yachts/detail/${vehicle.slug}`
                    : `${getCategoryRoute(vehicle.category)}/${vehicle.slug}`}
                  className="w-full luxury-button flex items-center justify-center space-x-2"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences Showcase */}
        <div className="mt-16 mb-16">
          <div className="luxury-card max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-gold-400 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-luxury-black" />
            </div>
            <h4 className="text-2xl font-luxury font-bold text-white mb-4">
              Miami <span className="text-gradient">Experiences</span>
            </h4>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Beyond vehicle rentals — discover Miami's exclusive nightlife, private dining, luxury transportation, and custom celebrations. AuraPex is your gateway to unforgettable experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4 text-luxury-gold" />
                <span>VIP Nightlife Access</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Utensils className="w-4 h-4 text-luxury-gold" />
                <span>Private Chef Services</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Camera className="w-4 h-4 text-luxury-gold" />
                <span>Special Celebrations</span>
              </div>
            </div>
            <Link
              to="/experiences"
              className="luxury-button inline-flex items-center space-x-2"
            >
              <span>Explore Experiences</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Can't find what you're looking for? We have access to exclusive vehicles not shown here.</p>
          <button 
            onClick={() => window.open('https://wa.me/15617774360?text=Hi%2C%20I%27m%20looking%20for%20a%20specific%20vehicle%20not%20listed%20on%20your%20site.%20Can%20you%20help%20source%20it%3F', '_blank')}
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