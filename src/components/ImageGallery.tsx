import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
  externalGalleryUrl?: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, externalGalleryUrl }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }, [images.length])

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, prevImage, nextImage])

  // Touch swipe for mobile lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage()
      else prevImage()
    }
    setTouchStart(null)
  }

  if (images.length === 0) return null

  // Grid layout: 1 hero + up to 4 thumbnails
  const heroImage = images[0]
  const gridImages = images.slice(1, 5)
  const remainingCount = images.length - 5

  return (
    <>
      {/* Airbnb-style Grid */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className={`grid gap-2 ${gridImages.length > 0 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`} style={{ height: gridImages.length > 0 ? '480px' : '400px' }}>
          {/* Hero Image */}
          <div 
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(0)}
            style={{ gridRow: gridImages.length >= 2 ? 'span 2' : 'span 1' }}
          >
            <img 
              src={heroImage} 
              alt={`${title} - Main`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Thumbnail Grid */}
          {gridImages.length > 0 && (
            <div className={`hidden md:grid gap-2 ${gridImages.length === 1 ? 'grid-rows-1' : 'grid-rows-2'}`}>
              {gridImages.map((img, i) => (
                <div 
                  key={i}
                  className="relative cursor-pointer group overflow-hidden"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img 
                    src={img} 
                    alt={`${title} - Photo ${i + 2}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Show remaining count on last thumbnail */}
                  {i === gridImages.length - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">+{remainingCount} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Photos Button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/90 transition-colors border border-white/10"
        >
          <Camera size={16} />
          View all {images.length} photos
        </button>

        {/* Mobile: swipe hint */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
            {images.length} photos — tap to browse
          </div>
        )}
      </div>

      {/* External Gallery Link */}
      {externalGalleryUrl && (
        <a
          href={externalGalleryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm text-luxury-gold hover:text-gold-400 transition-colors"
        >
          <Maximize2 size={14} />
          View Full Gallery →
        </a>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div className="w-full h-full flex items-center justify-center p-4 md:p-16">
            <img
              src={images[lightboxIndex]}
              alt={`${title} - Photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              draggable={false}
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Thumbnail strip at bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2 px-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? 'border-luxury-gold opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageGallery
