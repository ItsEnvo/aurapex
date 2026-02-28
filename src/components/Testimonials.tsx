import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  location: string
  vehicle: string
  rating: number
  text: string
  avatar: string
  occasion: string
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      location: 'Miami Beach, FL',
      vehicle: 'Lamborghini Huracán',
      rating: 5,
      text: 'AuraPex made my wedding weekend unforgettable. The Lamborghini was pristine and the service was impeccable. From booking to return, everything was seamless. The team even provided champagne for the celebration. Truly a world-class experience.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      occasion: 'Wedding Weekend'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      location: 'Fort Lauderdale, FL',
      vehicle: 'Azimut 60 Flybridge',
      rating: 5,
      text: 'The yacht rental for our corporate retreat exceeded all expectations. Professional crew, stunning vessel, and AuraPex handled every detail flawlessly. Our clients were impressed and the event was a huge success. Will definitely book again.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face',
      occasion: 'Corporate Event'
    },
    {
      id: 3,
      name: 'James Thompson',
      location: 'Boca Raton, FL',
      vehicle: 'Rolls-Royce Phantom',
      rating: 5,
      text: 'Exceptional service from start to finish. The Rolls-Royce was delivered spotless and on time for our anniversary dinner. The chauffeur was professional and knowledgeable. AuraPex understands luxury and delivers it perfectly.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      occasion: 'Anniversary Celebration'
    },
    {
      id: 4,
      name: 'Isabella Martinez',
      location: 'Aventura, FL',
      vehicle: 'Ferrari F8 Tributo',
      rating: 5,
      text: 'Living out my dream of driving a Ferrari through Miami! AuraPex made it so easy and stress-free. The car was absolutely perfect and the staff was incredibly helpful with recommendations for the best driving routes.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      occasion: 'Birthday Gift'
    },
    {
      id: 5,
      name: 'David Park',
      location: 'Palm Beach, FL',
      vehicle: 'Sea-Doo GTX 300',
      rating: 5,
      text: 'Amazing jet ski experience! The equipment was top-notch and the safety briefing was thorough. Perfect for exploring the South Florida waterways. AuraPex really knows how to deliver quality and fun.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      occasion: 'Vacation Adventure'
    },
    {
      id: 6,
      name: 'Amanda Foster',
      location: 'Key Biscayne, FL',
      vehicle: 'Mercedes S-Class',
      rating: 5,
      text: 'Professional and reliable service for our business meetings. The Mercedes was comfortable and elegant, perfect for impressing clients. AuraPex understands the importance of making the right impression.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      occasion: 'Business Trip'
    }
  ]

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 bg-gradient-to-b from-luxury-charcoal to-luxury-black">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover why discerning clients across South Florida choose AuraPex for their luxury rental needs
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote size={80} className="text-luxury-gold" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${
                      i < currentTestimonial.rating 
                        ? 'text-luxury-gold fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-white text-center font-light leading-relaxed mb-8">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-luxury-gold"
                  />
                  <div className="text-center md:text-left">
                    <div className="font-semibold text-white text-lg">{currentTestimonial.name}</div>
                    <div className="text-gray-400 text-sm">{currentTestimonial.location}</div>
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-12 bg-gray-600"></div>
                
                <div className="text-center md:text-left">
                  <div className="text-luxury-gold font-medium">{currentTestimonial.vehicle}</div>
                  <div className="text-gray-400 text-sm">{currentTestimonial.occasion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-luxury-gold hover:bg-gold-400 rounded-full flex items-center justify-center text-luxury-black transition-colors duration-300 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-luxury-gold hover:bg-gold-400 rounded-full flex items-center justify-center text-luxury-black transition-colors duration-300 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-luxury-gold scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-luxury-gold mb-2">4.9</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-luxury-gold mb-2">500+</div>
            <div className="text-sm text-gray-400">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-luxury-gold mb-2">99%</div>
            <div className="text-sm text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-luxury-gold mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support Available</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="luxury-button"
          >
            Join Our Happy Clients
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials