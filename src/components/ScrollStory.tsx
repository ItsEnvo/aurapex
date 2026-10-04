import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Star } from 'lucide-react'

const FRAME_COUNT = 253
// The film finishes here; the rest of the scroll holds the last frame under the closing CTA
const FILM_END = 0.92
// Widescreen frames for landscape screens, a center-cropped portrait set for phones
const frameSrc = (set: 'd' | 'm', i: number) => `/images/scroll/${set}/${String(i + 1).padStart(3, '0')}.webp`

// Fade in over [a, b], hold, fade out over [c, d], in scroll progress 0..1.
// Film timeline: car → rise over Miami → down to yacht → sunset bay → into the villa.
const INTRO = [0, 0, 0.03, 0.06]
const SCENES = [
  { range: [0.06, 0.08, 0.12, 0.15], word: 'Drive', line: 'Exotic cars delivered to your door in Miami and Fort Lauderdale.', to: '/cars', cta: 'View cars' },
  { range: [0.39, 0.42, 0.5, 0.53], word: 'Sail', line: 'Private yacht charters, from day cruisers to 110-foot superyachts.', to: '/yachts', cta: 'View yachts' },
  { range: [0.79, 0.82, 0.88, 0.91], word: 'Stay', line: 'Waterfront villas with room for the whole crew.', to: '/villas', cta: 'View villas' },
]
const CAPTIONS = [
  { range: [0.2, 0.23, 0.31, 0.34], text: 'Over Biscayne Bay' },
  { range: [0.6, 0.63, 0.7, 0.73], text: 'Golden hour, Miami' },
]
const OUTRO = [0.92, 0.95, 1, 1]

const fade = ([a, b, c, d]: number[], p: number) => {
  if (p < a || p > d) return 0
  if (p < b) return (p - a) / (b - a)
  if (p > c) return d === c ? 1 : 1 - (p - c) / (d - c)
  return 1
}

// Full-screen layer whose content rises and sharpens in as it fades up
const Layer: React.FC<{ opacity: number; className?: string; children: React.ReactNode }> = ({ opacity, className = '', children }) => (
  <div
    className={`absolute inset-0 flex ${className}`}
    style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden', pointerEvents: opacity > 0.5 ? 'auto' : 'none' }}
  >
    <div className="w-full" style={{ transform: `translateY(${(1 - opacity) * 32}px)`, filter: opacity < 1 ? `blur(${(1 - opacity) * 10}px)` : undefined }}>
      {children}
    </div>
  </div>
)

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const ScrollStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const set = window.innerWidth / window.innerHeight < 1 ? 'm' : 'd'
    const images: HTMLImageElement[] = []
    let current = 0
    let target = 0
    let drawn = -1
    let raf = 0

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (images[i - d]?.complete && images[i - d].naturalWidth) return images[i - d]
        if (images[i + d]?.complete && images[i + d].naturalWidth) return images[i + d]
      }
      return null
    }

    const draw = (force = false) => {
      const i = Math.round(current)
      if (i === drawn && !force) return
      const img = nearestLoaded(i)
      if (!img) return
      drawn = i
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    const load = (i: number) => {
      if (images[i]) return
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => draw(true)
      img.src = frameSrc(set, i)
      images[i] = img
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      draw(true)
    }

    const onScroll = () => {
      const el = sectionRef.current!
      const scrollable = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable))
      target = Math.min(1, p / FILM_END) * (FRAME_COUNT - 1)
      if (Math.abs(target - current) > 20) {
        current = target
        draw()
      }
      setProgress(p)
    }

    const tick = () => {
      current += (target - current) * 0.16
      if (Math.abs(target - current) < 0.01) current = target
      draw()
      raf = requestAnimationFrame(tick)
    }

    load(0)
    if (!reduced) {
      // Coarse pass first so the whole flight scrubs within a second or two, then fill the gaps
      for (const step of [8, 4, 2, 1]) for (let i = 0; i < FRAME_COUNT; i += step) load(i)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      raf = requestAnimationFrame(tick)
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  const p = reduced ? 0 : progress
  const intro = reduced ? 1 : fade(INTRO, p)
  const outro = reduced ? 0 : fade(OUTRO, p)

  return (
    <section ref={sectionRef} className={`relative bg-luxury-black ${reduced ? 'h-[100svh]' : 'h-[900svh]'}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />

        {/* Cinematic grade: vignette plus a darker floor where the copy sits */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-black/30 md:bg-gradient-to-r md:from-black/70 md:via-black/15 md:to-transparent" />

        {/* Desktop progress rail */}
        {!reduced && (
          <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-5 z-10">
            {SCENES.map((s, i) => {
              const active = i === (p < 0.27 ? 0 : p < 0.66 ? 1 : 2)
              return (
                <div key={s.word} className="flex items-center gap-3">
                  <span className={`text-xs uppercase tracking-[0.3em] transition-colors duration-300 ${active ? 'text-luxury-gold' : 'text-white/40'}`}>{s.word}</span>
                  <span className={`block h-px transition-all duration-300 ${active ? 'w-10 bg-luxury-gold' : 'w-5 bg-white/40'}`} />
                </div>
              )
            })}
            <div className="mt-2 h-24 w-px bg-white/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-luxury-gold" style={{ height: `${p * 100}%` }} />
            </div>
          </div>
        )}

        {/* Copy */}
        <div className="absolute inset-0 container-max px-6 md:px-12 pb-24 md:pb-0 pt-28">
          <div className="relative h-full">
            <Layer opacity={intro} className="items-end md:items-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <Star className="text-luxury-gold" size={14} />
                <span className="text-xs font-medium text-white">South Florida's #1 Luxury Rental</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury font-bold leading-[1.05] mb-5">
                <span className="text-white">Experience</span>
                <br />
                <span className="text-gradient">Ultimate Luxury</span>
              </h1>
              <p className="text-base md:text-xl text-gray-200 max-w-md">Exotic cars, yachts and villas in Miami and Fort Lauderdale.</p>
              {reduced ? (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => scrollToId('fleet')} className="luxury-button px-8 py-3">Browse Our Fleet</button>
                  <button onClick={() => scrollToId('contact')} className="luxury-button-outline px-8 py-3">Get Quote Now</button>
                </div>
              ) : (
                <div className="mt-8 flex items-center gap-2 text-luxury-gold text-sm uppercase tracking-widest">
                  <ChevronDown size={18} className="animate-bounce" /> Scroll to explore
                </div>
              )}
            </Layer>

            {SCENES.map((s, i) => (
              <Layer key={s.word} opacity={fade(s.range, p)} className="items-end md:items-center">
                <div className="text-luxury-gold text-xs md:text-sm uppercase tracking-[0.35em] mb-3">0{i + 1} / 03</div>
                <h2 className="text-7xl md:text-9xl font-luxury font-bold text-white leading-none mb-5">{s.word}</h2>
                <p className="text-lg md:text-2xl text-gray-200 max-w-md mb-7">{s.line}</p>
                <Link to={s.to} className="inline-block luxury-button-outline px-8 py-3">{s.cta}</Link>
              </Layer>
            ))}

            {CAPTIONS.map(c => (
              <Layer key={c.text} opacity={fade(c.range, p)} className="items-end">
                <div className="flex items-center gap-4 text-white/85 text-xs md:text-sm uppercase tracking-[0.4em] md:pb-12">
                  <span className="block w-10 h-px bg-luxury-gold" /> {c.text}
                </div>
              </Layer>
            ))}

            <Layer opacity={outro} className="items-end md:items-center">
              <h2 className="text-5xl md:text-7xl font-luxury font-bold leading-[1.05] mb-6">
                <span className="text-white">Drive. Sail. Stay.</span>
                <br />
                <span className="text-gradient">All in one call.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button onClick={() => scrollToId('fleet')} className="luxury-button px-8 py-3">Browse Our Fleet</button>
                <button onClick={() => scrollToId('contact')} className="luxury-button-outline px-8 py-3">Get Quote Now</button>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div><div className="text-2xl md:text-3xl font-bold text-luxury-gold">500+</div><div className="text-xs text-gray-400 uppercase tracking-wider">Happy Clients</div></div>
                <div><div className="text-2xl md:text-3xl font-bold text-luxury-gold">250+</div><div className="text-xs text-gray-400 uppercase tracking-wider">Luxury Vehicles</div></div>
                <div><div className="text-2xl md:text-3xl font-bold text-luxury-gold">24/7</div><div className="text-xs text-gray-400 uppercase tracking-wider">Concierge</div></div>
              </div>
            </Layer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollStory
