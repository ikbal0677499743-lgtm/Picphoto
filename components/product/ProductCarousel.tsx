'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCarouselProps {
  themeName: string
}

export default function ProductCarousel({ themeName }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const totalImages = 8

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <BookOpen className="w-24 h-24 text-accent mx-auto mb-4" />
            <h3 className="font-serif font-black text-2xl">{themeName}</h3>
            <p className="text-muted mt-2">Custom Travel Photobook</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all",
              activeIndex === index
                ? "border-black"
                : "border-transparent bg-surface hover:border-gray-300"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
