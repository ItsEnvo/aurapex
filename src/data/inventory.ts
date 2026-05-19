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

// Function to get local images based on vehicle title mapping
const getLocalImages = (category: string, title: string): string[] => {
  const baseUrl = '/images'
  const lowerTitle = title.toLowerCase()
  
  if (category === 'cars') {
    // Map titles to their correct image folders
    if (lowerTitle.includes('audi r8 gray')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/audi-r8-gray/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('bmw m4 competition purple')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/bmw-m4-competition-purple/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('corvette stingray c8') || lowerTitle.includes('chevrolet corvette c8 red')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/corvette-c8-red/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('chevrolet corvette c8 white')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/corvette-c8-white/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('lamborghini urus black')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/cars/lamborghini-urus-black/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('lamborghini urus mansory yellow')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/cars/lamborghini-urus-mansory-yellow/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('lamborghini urus s orange')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/cars/lamborghini-urus-s-orange/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('mercedes g63 brabus black') || lowerTitle.includes('mercedes g550 amg')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/mercedes-g63-brabus-black/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('mercedes maybach gls') || lowerTitle.includes('maybach gls')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/cars/mercedes-maybach-gls/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('porsche 911 white')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/porsche-911-white/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('porsche gt3rs gray')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/cars/porsche-gt3rs-gray/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('porsche gt3rs red')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/porsche-gt3rs-red/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('rolls royce cullinan mansory black')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/rolls-royce-cullinan-mansory-black/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('rolls royce cullinan mansory white') || lowerTitle.includes('rolls royce cullinan')) {
      return Array.from({length: 4}, (_, i) => `${baseUrl}/cars/rolls-royce-cullinan-mansory-white/${i + 1}.jpg`)
    }
  }
  
  if (category === 'yachts') {
    // Map yacht titles to their correct image folders (only folders with actual images)
    if (lowerTitle.includes('26ft searay sundeck')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/26ft-searay-sundeck/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('48ft cranchi')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/48ft-cranchi/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('48ft silverton flybridge')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/48ft-silverton-flybridge/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('48ft silverton sportbridge')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/48ft-silverton-sportbridge/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('50ft sunseeker manhattan')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/50ft-sunseeker-manhattan/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('53ft azimut')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/53ft-azimut/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('60ft sunseeker predator')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/60ft-sunseeker-predator/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('65ft viking flybridge') || lowerTitle.includes('65ft viking')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/65ft-viking/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('82ft sunseeker predator')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/82ft-sunseeker-predator/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('110ft maiora')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/110ft-maiora/${i + 1}.jpg`)
    }
    // Handle the newer yachts with different naming convention
    if (lowerTitle.includes('90\' deep blue') || lowerTitle.includes('deep blue')) {
      return Array.from({length: 13}, (_, i) => `${baseUrl}/yachts/deep-blue/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('90\' acqua') || lowerTitle.includes('acqua')) {
      return Array.from({length: 12}, (_, i) => `${baseUrl}/yachts/acqua/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('85\' del mar') || lowerTitle.includes('del mar')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/del-mar/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('70\' money waves') || lowerTitle.includes('money waves')) {
      return Array.from({length: 6}, (_, i) => `${baseUrl}/yachts/money-waves/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('70\' sky') || lowerTitle.includes('sky')) {
      return Array.from({length: 5}, (_, i) => `${baseUrl}/yachts/sky/${i + 1}.jpg`)
    }
    if (lowerTitle.includes('62\' anvera') || lowerTitle.includes('anvera')) {
      return Array.from({length: 3}, (_, i) => `${baseUrl}/yachts/anvera/${i + 1}.jpg`)
    }
  }
  
  return [] // Return empty array if no local images found
}

// Generate Unsplash image URLs based on category (fallback only)
const getUnsplashImageUrl = (category: string, title: string): string => {
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
      return `${baseUrl}1567899378494-47b22a2ae96a?w=800&h=600&fit=crop`
    
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
  
  // Use images from fleet.json if available, otherwise try our mapping, otherwise fallback to Unsplash
  let carImages: string[] = []
  if (car.images && car.images.length > 0) {
    carImages = car.images
  } else {
    const localImages = getLocalImages('cars', car.title)
    if (localImages.length > 0) {
      carImages = localImages
    } else {
      carImages = [getUnsplashImageUrl('cars', car.title)]
    }
  }
  
  return {
    id: car.asset_id,
    slug,
    title: car.title,
    category: 'cars' as const,
    subcategory: car.subcategory || car.category,
    location: car.location,
    dailyPrice: car.retail_price_per_day || 0,
    priceDisplay: car.retail_price_per_day ? `From $${car.retail_price_per_day.toLocaleString()}/day` : 'Contact for pricing',
    image: carImages[0],
    images: carImages
  }
})

// Process yachts
export const yachts: Yacht[] = fleetData.inventory.yachts.map((yacht: any) => {
  const slug = createSlug(yacht.title)
  
  // Try multiple pricing structures
  const brokerPricing = yacht.broker_pricing || yacht.pricing?.broker || {}
  const aurapexPricingData = yacht.pricing?.aurapex || {}
  const aurapexPricing = calculateYachtPricing(brokerPricing)
  
  // Use Aurapex pricing if available, otherwise calculated from broker, otherwise base_rate_4hr
  const startingAurapex = aurapexPricingData.starting_4hr || aurapexPricingData.half_day || 0
  const directRate = yacht.pricing?.base_rate_4hr || 0
  const prices = Object.values(aurapexPricing).filter(p => typeof p === 'number')
  const startingPrice = startingAurapex || directRate || (prices.length > 0 ? Math.min(...(prices as number[])) : 0)
  
  // Use images from fleet.json if available, otherwise try our mapping, otherwise fallback to Unsplash
  let yachtImages: string[] = []
  if (yacht.images && yacht.images.length > 0) {
    yachtImages = yacht.images
  } else {
    const localImages = getLocalImages('yachts', yacht.title)
    if (localImages.length > 0) {
      yachtImages = localImages
    } else {
      yachtImages = [getUnsplashImageUrl('yachts', yacht.title)]
    }
  }
  
  return {
    id: yacht.asset_id,
    slug,
    title: yacht.title,
    category: 'yachts' as const,
    departure: yacht.departure,
    maxGuests: yacht.max_guests || yacht.capacity || fleetData.global_policies.yachts.default_max_guests,
    startingPrice,
    pricing: aurapexPricing,
    priceDisplay: startingPrice > 0 ? `From $${startingPrice.toLocaleString()}${directRate ? '/4hr' : ''}` : 'Contact for pricing',
    image: yachtImages[0],
    images: yachtImages
  }
})

// Process villas
export const villas: Villa[] = fleetData.inventory.villas.map((villa: any) => {
  const slug = createSlug(villa.title)
  const baseRate = villa.pricing?.base_rate_per_night || villa.retail_price_per_night || 0
  return {
    id: villa.asset_id,
    slug,
    title: villa.title,
    category: 'villas' as const,
    location: villa.location,
    bedrooms: villa.bedrooms || 0,
    bathrooms: villa.bathrooms || 0,
    sleeps: villa.sleeps || 0,
    nightlyPrice: baseRate,
    priceDisplay: baseRate ? `From $${baseRate.toLocaleString()}/night` : 'Contact for pricing',
    image: getUnsplashImageUrl('villas', villa.title),
    images: [getUnsplashImageUrl('villas', villa.title)]
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
    image: getUnsplashImageUrl('jet_skis', jetski.title),
    images: [getUnsplashImageUrl('jet_skis', jetski.title)]
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