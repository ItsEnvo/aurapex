import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Star } from 'lucide-react'

const FRAME_COUNT = 138
const frameSrc = (i: number) => `/images/scroll/${String(i + 1).padStart(3, '0')}.webp`

// Each beat fades in over [in, peakStart] and out over [peakEnd, out], in scroll progress 0..1
const BEATS = [
  { range: [0, 0, 0.1, 0.17] },
  { range: [0.19, 0.24, 0.32, 0.37], word: 'Drive', line: 'Exotic cars delivered to your door in Miami and Fort Lauderdale.', to: '/cars', cta: 'View cars' },
  { range: [0.4, 0.45, 0.58, 0.63], word: 'Sail', line: 'Private yacht charters, from day cruisers to 110-foot superyachts.', to: '/yachts', cta: 'View yachts' },
  { range: [0.67, 0.72, 0.8, 0.85], word: 'Stay', line: 'Waterfront villas with room for the whole crew.', to: '/villas', cta: 'View villas' },
  { range: [0.88, 0.94, 1, 1] },
] as const

const beatOpacity = ([a, b, c, d]: readonly number[], p: number) => {
  if (p < a || p > d) return 0
  if (p < b) return (p - a) / (b - a)
  if (p > c) return d === c ? 1 : 1 - (p - c) / (d - c)
  return 1
}

const Beat: React.FC<{ opacity: number; lift?: boolean; children: React.ReactNode }> = ({ opacity, lift, children }) => (
  <div className="absolute inset-0 flex items-end md:items-center" style={{ opacity, pointerEvents: opacity > 0.5 ? 'auto' : 'none' }}>
    <div className="w-full" style={lift ? { transform: `translateY(${(1 - opacity) * 24}px)` } : undefined}>{children}</div>
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
      target = p * (FRAME_COUNT - 1)
      if (Math.abs(target - current) > 20) {
        current = target
        draw()
      }
      setProgress(p)
    }

    const tick = () => {
      current += (target - current) * 0.18
      if (Math.abs(target - current) < 0.01) current = target
      draw()
      raf = requestAnimationFrame(tick)
    }

    const first = new Image()
    first.onload = () => draw(true)
    first.src = frameSrc(0)
    images[0] = first
    if (!reduced) {
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(i)
        images[i] = img
      }
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
  const op = BEATS.map(b => (reduced ? 0 : beatOpacity(b.range, p)))
  if (reduced) op[0] = 1

  return (
    <section ref={sectionRef} className={`relative bg-luxury-black ${reduced ? 'h-[100svh]' : 'h-[500svh]'}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden md:grid md:grid-cols-2 md:items-center md:gap-12 container-max md:px-8">
        {/* Media: full-bleed on phones, framed panel on desktop */}
        <div className="absolute inset-0 md:relative md:inset-auto md:order-2 md:h-[78svh] md:max-h-[860px] md:aspect-[720/1030] md:mx-auto md:rounded-3xl md:overflow-hidden md:border md:border-luxury-gold/20 md:shadow-2xl">
          <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 md:from-black/30 md:via-transparent md:to-transparent pointer-events-none" />
        </div>

        {/* Copy: overlaid at the bottom on phones, left column on desktop */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-24 md:relative md:order-1 md:px-0 md:pb-0 md:h-[60svh]">
          <div className="relative h-56 md:h-full">
            <Beat opacity={op[0]}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <Star className="text-luxury-gold" size={14} />
                <span className="text-xs font-medium text-white">South Florida's #1 Luxury Rental</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold leading-tight mb-4">
                <span className="text-white">Experience</span>
                <br />
                <span className="text-gradient">Ultimate Luxury</span>
              </h1>
              <p className="text-base md:text-xl text-gray-300 max-w-md">Exotic cars, yachts and villas in Miami and Fort Lauderdale.</p>
              {!reduced && (
                <div className="mt-6 flex items-center gap-2 text-luxury-gold text-sm uppercase tracking-widest">
                  <ChevronDown size={18} className="animate-bounce" /> Scroll
                </div>
              )}
              {reduced && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => scrollToId('fleet')} className="luxury-button px-8 py-3">Browse Our Fleet</button>
                  <button onClick={() => scrollToId('contact')} className="luxury-button-outline px-8 py-3">Get Quote Now</button>
                </div>
              )}
            </Beat>

            {BEATS.slice(1, 4).map((b, i) => 'word' in b && (
              <Beat key={b.word} opacity={op[i + 1]} lift>
                <div className="text-luxury-gold text-xs md:text-sm uppercase tracking-[0.3em] mb-3">0{i + 1} / 03</div>
                <h2 className="text-6xl md:text-8xl font-luxury font-bold text-white mb-4">{b.word}</h2>
                <p className="text-lg md:text-2xl text-gray-300 max-w-md mb-6">{b.line}</p>
                <Link to={b.to} className="inline-block luxury-button-outline px-8 py-3">{b.cta}</Link>
              </Beat>
            ))}

            <Beat opacity={op[4]}>
              <h2 className="text-4xl md:text-6xl font-luxury font-bold leading-tight mb-4">
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
            </Beat>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollStory
