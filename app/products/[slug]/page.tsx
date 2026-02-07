'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Heart, Truck, Shield, Users } from 'lucide-react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import CountdownTimer from '@/components/layout/CountdownTimer'
import Footer from '@/components/layout/Footer'
import ProductCarousel from '@/components/product/ProductCarousel'
import PricingBundles from '@/components/product/PricingBundles'
import ThemeSelector from '@/components/product/ThemeSelector'
import TrustBadges from '@/components/product/TrustBadges'
import FAQSection from '@/components/product/FAQSection'
import VideoSection from '@/components/product/VideoSection'
import StepsSection from '@/components/product/StepsSection'
import ReviewsSection from '@/components/product/ReviewsSection'
import { themes } from '@/lib/constants'

export default function ProductPage() {
  const router = useRouter()
  const [selectedBundle, setSelectedBundle] = useState('single')
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id)

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  const handleStartDesign = () => {
    router.push(`/editor/wizard?theme=${selectedTheme}&mode=template`)
  }

  const handleStartFromScratch = () => {
    router.push(`/editor/wizard?theme=${selectedTheme}&mode=scratch`)
  }

  return (
    <main>
      <AnnouncementBar />
      <Header />
      <CountdownTimer />

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left Column - Carousel */}
            <div>
              <ProductCarousel themeName={selectedThemeData?.name || 'Paris 1'} />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Title */}
              <h1 className="font-serif font-black text-3xl md:text-4xl">
                custom travel book
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted">4.99 / 5.00 (72 Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-muted">24 pages for</span>
                <span className="text-3xl font-bold">$32.99</span>
                <span className="text-xl text-muted line-through">$65.98</span>
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -50%
                </span>
              </div>

              {/* Valentine's Day Sale */}
              <div className="flex items-center gap-2 text-accent">
                <Heart className="w-5 h-5 fill-accent" />
                <span className="font-semibold">Valentine&apos;s Day Sale</span>
              </div>

              {/* Pricing Bundles */}
              <div>
                <PricingBundles
                  selectedBundle={selectedBundle}
                  onSelectBundle={setSelectedBundle}
                />
              </div>

              {/* Theme Selector */}
              <div>
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onSelectTheme={setSelectedTheme}
                />
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleStartDesign}
                  className="w-full py-4 bg-white border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all"
                >
                  Start My Design
                </button>
                <p className="text-center text-sm text-muted">OR</p>
                <button
                  onClick={handleStartFromScratch}
                  className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                >
                  Start From Scratch
                </button>
              </div>

              {/* Trust Badges */}
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Video Section */}
      <VideoSection />

      {/* Steps Section */}
      <StepsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Bottom Trust Strip */}
      <section className="py-12 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-accent" />
              <span className="font-semibold">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <span className="font-semibold">100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              <span className="font-semibold">100,000+ Customers</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
