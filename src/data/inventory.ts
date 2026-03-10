import fleetData from './fleet.json'

// Helper function to create URL-friendly slugs
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Customer-safe inventory types (NO cost/profit/partner data exposed)
export interface InventoryItem {
  id: string
  slug: string
  title: string
  category: 'cars' | 'yachts' | 'villas' | 'jet_skis'
  subcategory?: string
  location?: string
  priceDisplay: string // Formatted for customer display
  image: string // Primary image (first from images array, or Unsplash fallback)
  images: string[] // All available images
}

export interface Car extends InventoryItem {
  category: 'cars'
  subcategory: string
  dailyPrice: number
}

export interface Yacht extends InventoryItem {
  category: 'yachts'
  departure: string
  maxGuests: number
  startingPrice: number // Calculated Aurapex price for shortest duration
  pricing: {
    halfDay?: number
    fullDay?: number
    overnight?: number
    weekly?: number
  }
}

export interface Villa extends InventoryItem {
  category: 'villas'
  bedrooms: number
  bathrooms: number
  sleeps: number
  nightlyPrice: number
}

export interface JetSki extends InventoryItem {
  category: 'jet_skis'
  locations: string[]
  hourlyPrice: number
  dailyPrice?: number
}

// Generate Unsplash image URLs based on category
const getImageUrl = (category: string, title: string): string => {
  const baseUrl = 'https://images.unsplash.com/photo-'
  
  switch (category) {
    case 'cars':
      // Use specific images for luxury cars
      if (title.toLowerCase().includes('lamborghini')) return `${baseUrl}1544636331-e26879cd4d9b?w=800&h=600&fit=crop`
      if (title.toLowerCase().includes('ferrari')) return `${baseUrl}1583121274602-3e2820c69888?w=800&h=600&fit=crop`
      if (title.toLowerCase().includes('rolls')) return `${baseUrl}1563720223185-11003d516935?w=800&h=600&fit=crop`
      if (title.toLowerCase().includes('mercedes')) return `${baseUrl}1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop`
      if (title.toLowerCase().includes('bmw')) return `${baseUrl}1555215695-3004980ad54e?w=800&h=600&fit=crop`
      if (title.toLowerCase().includes('mclaren')) return `${baseUrl}1544636331-e26879cd4d9b?w=800&h=600&fit=crop`
      // Default luxury car
      return `${baseUrl}1563720223185-11003d516935?w=800&h=600&fit=crop`
    
    case 'yachts':
      return `${baseUrl}1544551763-46a013bb70d5?w=800&h=600&fit=crop`
    
    case 'villas':
      return `${baseUrl}1613490493192-bf5730000ea4?w=800&h=600&fit=crop`
    
    case 'jet_skis':
      return `${baseUrl}1551698618-1dfe5d97d256?w=800&h=600&fit=crop`
    
    default:
      return `${baseUrl}1544636331-e26879cd4d9b?w=800&h=600&fit=crop`
  }
}

// Calculate Aurapex pricing for yachts (broker price + minimum markup)
const calculateYachtPricing = (brokerPricing: any) => {
  const aurapexPricing: { [key: string]: number } = {}
  if (!brokerPricing) return aurapexPricing
  const markupPercent = 0.25 // 25% minimum markup
  
  if (brokerPricing.half_day) {
    aurapexPricing.halfDay = Math.round(brokerPricing.half_day * (1 + markupPercent))
  }
  if (brokerPricing.full_day) {
    aurapexPricing.fullDay = Math.round(brokerPricing.full_day * (1 + markupPercent))
  }
  if (brokerPricing.overnight) {
    aurapexPricing.overnight = Math.round(brokerPricing.overnight * (1 + markupPercent))
  }
  if (brokerPricing.weekly) {
    aurapexPricing.weekly = Math.round(brokerPricing.weekly * (1 + markupPercent))
  }
  
  return aurapexPricing
}

// Process cars
export const cars: Car[] = fleetData.inventory.cars.map((car: any) => {
  const slug = createSlug(car.title)
  return {
    id: car.asset_id,
    slug,
    title: car.title,
    category: 'cars' as const,
    subcategory: car.subcategory || car.category,
    location: car.location,
    dailyPrice: car.retail_price_per_day || 0,
    priceDisplay: car.retail_price_per_day ? `From $${car.retail_price_per_day.toLocaleString()}/day` : 'Contact for pricing',
    image: getImageUrl('cars', car.title),
    images: [getImageUrl('cars', car.title)]
  }
})

// Process yachts
export const yachts: Yacht[] = fleetData.inventory.yachts.map((yacht: any) => {
  const slug = createSlug(yacht.title)
  // Try multiple pricing structures
  const brokerPricing = yacht.broker_pricing || yacht.pricing?.broker || {}
  const aurapexPricingData = yacht.pricing?.aurapex || {}
  const aurapexPricing = calculateYachtPricing(brokerPricing)
  
  // Use Aurapex pricing if available, otherwise calculated from broker
  const startingAurapex = aurapexPricingData.starting_4hr || aurapexPricingData.half_day || 0
  const prices = Object.values(aurapexPricing).filter(p => typeof p === 'number')
  const startingPrice = startingAurapex || (prices.length > 0 ? Math.min(...(prices as number[])) : 0)
  
  // Use real photos if available, fallback to Unsplash
  const realImages: string[] = yacht.images && yacht.images.length > 0 ? yacht.images : []
  const primaryImage = realImages.length > 0 ? realImages[0] : getImageUrl('yachts', yacht.title)
  
  return {
    id: yacht.asset_id,
    slug,
    title: yacht.title,
    category: 'yachts' as const,
    departure: yacht.departure,
    maxGuests: yacht.max_guests || fleetData.global_policies.yachts.default_max_guests,
    startingPrice,
    pricing: aurapexPricing,
    priceDisplay: startingPrice > 0 ? `From $${startingPrice.toLocaleString()}` : 'Contact for pricing',
    image: primaryImage,
    images: realImages.length > 0 ? realImages : [getImageUrl('yachts', yacht.title)]
  }
})

// Process villas
export const villas: Villa[] = fleetData.inventory.villas.map((villa: any) => {
  const slug = createSlug(villa.title)
  return {
    id: villa.asset_id,
    slug,
    title: villa.title,
    category: 'villas' as const,
    location: villa.location,
    bedrooms: villa.bedrooms,
    bathrooms: villa.bathrooms,
    sleeps: villa.sleeps,
    nightlyPrice: villa.retail_price_per_night || 0,
    priceDisplay: villa.retail_price_per_night ? `From $${villa.retail_price_per_night.toLocaleString()}/night` : 'Contact for pricing',
    image: getImageUrl('villas', villa.title),
    images: [getImageUrl('villas', villa.title)]
  }
})

// Process jet skis
export const jetSkis: JetSki[] = fleetData.inventory.jet_skis.map((jetski: any) => {
  const slug = createSlug(jetski.title)
  
  // Use Miami pricing as default hourly rate (higher rate)
  const hourlyPrice = jetski.retail_price_per_hour_miami || 150
  
  return {
    id: jetski.asset_id,
    slug,
    title: jetski.title,
    category: 'jet_skis' as const,
    locations: jetski.locations,
    hourlyPrice,
    dailyPrice: jetski.retail_price_per_day,
    priceDisplay: `From $${hourlyPrice}/hour`,
    image: getImageUrl('jet_skis', jetski.title),
    images: [getImageUrl('jet_skis', jetski.title)]
  }
})

// Export all inventory
export const inventory = {
  cars,
  yachts,
  villas,
  jetSkis
}

// Helper functions for finding items
export const findItemBySlug = (category: string, slug: string) => {
  switch (category) {
    case 'cars':
      return cars.find(car => car.slug === slug)
    case 'yachts':
      return yachts.find(yacht => yacht.slug === slug)
    case 'villas':
      return villas.find(villa => villa.slug === slug)
    case 'jet-skis':
      return jetSkis.find(jetski => jetski.slug === slug)
    default:
      return null
  }
}

// Get featured items (most premium ones)
export const getFeaturedItems = () => {
  // Sort by price and take top items from each category
  const featuredCars = [...cars].sort((a, b) => b.dailyPrice - a.dailyPrice).slice(0, 4)
  const featuredYachts = [...yachts].sort((a, b) => b.startingPrice - a.startingPrice).slice(0, 4)
  const featuredVillas = [...villas].sort((a, b) => b.nightlyPrice - a.nightlyPrice).slice(0, 4)
  const featuredJetSkis = [...jetSkis].sort((a, b) => b.hourlyPrice - a.hourlyPrice).slice(0, 4)
  
  return {
    cars: featuredCars,
    yachts: featuredYachts,
    villas: featuredVillas,
    jetSkis: featuredJetSkis
  }
}