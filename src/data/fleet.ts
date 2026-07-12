import fleetData from './yacht_fleet.json'
import { yachts as curatedYachts } from './inventory'
import { createSlug } from './inventory'

export interface FleetCity {
  name: string
  slug: string
  count: number
  cover: string | null
}

export interface FleetYacht {
  kind: 'fleet' | 'curated'
  city: string
  citySlug: string
  name: string
  slug: string
  lengthFt: number
  image: string
  detailPath: string
}

const rawCities = fleetData.cities as { name: string; slug: string; count: number; cover: string | null }[]
const rawYachts = fleetData.yachts as { city: string; citySlug: string; name: string; slug: string; lengthFt: number; image: string }[]

const parseLength = (s: string): number => {
  const m = s.match(/(\d{2,3})/)
  return m ? parseInt(m[1], 10) : 0
}

// Fleet yachts (partner catalog): single hero + inquire
const fleetPart: FleetYacht[] = rawYachts.map(y => ({
  kind: 'fleet',
  city: y.city,
  citySlug: y.citySlug,
  name: y.name,
  slug: y.slug,
  lengthFt: y.lengthFt,
  image: y.image,
  detailPath: `/yachts/${y.citySlug}/${y.slug}`,
}))

// Curated yachts (our own, with galleries + pricing): keep their rich detail page
const curatedPart: FleetYacht[] = curatedYachts.map(y => {
  const city = (y.departure || '').toLowerCase().includes('lauderdale') ? 'Fort Lauderdale' : 'Miami'
  return {
    kind: 'curated' as const,
    city,
    citySlug: createSlug(city),
    name: y.title,
    slug: y.slug,
    lengthFt: parseLength(y.title),
    image: y.image,
    detailPath: `/yachts/detail/${y.slug}`,
  }
})

export const allFleetYachts: FleetYacht[] = [...curatedPart, ...fleetPart]

// Build the city list dynamically so curated yachts are counted too
const coverByName: Record<string, string | null> = {}
rawCities.forEach(c => { coverByName[c.name] = c.cover })

const cityOrder = rawCities.map(c => c.name)
const grouped: Record<string, FleetYacht[]> = {}
allFleetYachts.forEach(y => { (grouped[y.city] = grouped[y.city] || []).push(y) })

export const fleetCities: FleetCity[] = Object.keys(grouped)
  .sort((a, b) => {
    const ia = cityOrder.indexOf(a), ib = cityOrder.indexOf(b)
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
  })
  .map(name => {
    const list = grouped[name]
    let cover = coverByName[name] || null
    if (!cover) {
      const longest = [...list].sort((a, b) => b.lengthFt - a.lengthFt)[0]
      cover = longest ? longest.image : null
    }
    return { name, slug: list[0].citySlug, count: list.length, cover }
  })

export const findFleetCity = (citySlug: string): FleetCity | undefined =>
  fleetCities.find(c => c.slug === citySlug)

export const yachtsInCity = (citySlug: string): FleetYacht[] =>
  allFleetYachts
    .filter(y => y.citySlug === citySlug)
    .sort((a, b) => b.lengthFt - a.lengthFt)

export const findFleetYacht = (citySlug: string, yachtSlug: string): FleetYacht | undefined =>
  allFleetYachts.find(y => y.citySlug === citySlug && y.slug === yachtSlug && y.kind === 'fleet')
