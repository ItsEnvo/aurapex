import { cars as allCars, Car, createSlug } from './inventory'

export interface CarCity {
  name: string
  slug: string
  count: number
  cover: string | null
}

export interface CarWithCity extends Car {
  city: string
  citySlug: string
}

// Featured markets, in display order. Cities with no inventory yet render as
// "Coming soon" tiles and fill in as vehicles are added.
const CITY_ORDER = ['Miami', 'New York City', 'Los Angeles', 'Dubai', 'Colombia']

const cityForLocation = (location?: string): string => {
  const loc = (location || '').toLowerCase()
  const match = CITY_ORDER.find(name => loc.includes(name.toLowerCase()))
  return match || 'Miami'
}

export const carsWithCity: CarWithCity[] = allCars.map(car => {
  const city = cityForLocation(car.location)
  return { ...car, city, citySlug: createSlug(city) }
})

const grouped: Record<string, CarWithCity[]> = {}
carsWithCity.forEach(car => {
  ;(grouped[car.city] = grouped[car.city] || []).push(car)
})

export const carCities: CarCity[] = CITY_ORDER.map(name => {
  const list = grouped[name] || []
  return {
    name,
    slug: createSlug(name),
    count: list.length,
    cover: list[0]?.image || null,
  }
})

export const carCityBySlug = (slug: string): CarCity | undefined =>
  carCities.find(c => c.slug === slug)

export const carsByCitySlug = (slug: string): CarWithCity[] =>
  carsWithCity.filter(c => c.citySlug === slug)

export const carBySlug = (slug: string): CarWithCity | undefined =>
  carsWithCity.find(c => c.slug === slug)
