import fleetData from './yacht_fleet.json'

export interface FleetCity {
  name: string
  slug: string
  count: number
  cover: string | null
}

export interface FleetYacht {
  city: string
  citySlug: string
  name: string
  slug: string
  lengthFt: number
  image: string
}

export const fleetCities: FleetCity[] = fleetData.cities as FleetCity[]
export const fleetYachts: FleetYacht[] = fleetData.yachts as FleetYacht[]

export const findFleetCity = (citySlug: string): FleetCity | undefined =>
  fleetCities.find(c => c.slug === citySlug)

export const yachtsInCity = (citySlug: string): FleetYacht[] =>
  fleetYachts
    .filter(y => y.citySlug === citySlug)
    .sort((a, b) => b.lengthFt - a.lengthFt)

export const findFleetYacht = (citySlug: string, yachtSlug: string): FleetYacht | undefined =>
  fleetYachts.find(y => y.citySlug === citySlug && y.slug === yachtSlug)
