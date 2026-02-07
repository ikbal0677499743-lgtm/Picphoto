'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft, ShoppingCart, Truck, Shield, Heart, Edit } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SummaryPage() {
  const router = useRouter()
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  
  const pages = useEditorStore(state => state.pages)
  const templateTheme = useEditorStore(state => state.templateTheme)
  const projectName = useEditorStore(state => state.projectName)

  const handleAddToCart = () => {
    setShowSuccessToast(true)
    
    // Redirect to homepage after 2 seconds
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Added to cart!
        </div>
      )}

      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* Two column grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
            {/* LEFT COLUMN - Preview */}
            <div>
              {/* Title */}
              <h1 className="font-cursive text-3xl text-accent mb-2">
                preview your design
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Final checks before adding to cart — printed exactly as shown
              </p>
              
              {/* Book cover preview */}
              <div className="aspect-[3/4] max-w-md bg-white rounded-2xl shadow-xl mx-auto p-8 flex flex-col items-center justify-center gap-4">
                <BookOpen className="w-16 h-16 text-accent" />
                <h2 className="font-serif font-black text-3xl text-center">
                  {templateTheme || 'Travel Book'}
                </h2>
                <p className="text-xl text-gray-600">2025</p>
              </div>
              
              {/* Page thumbnails */}
              <div className="mt-6 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {pages.map((page, index) => (
                    <div
                      key={page.id}
                      className="flex-shrink-0 w-20 h-14 rounded-lg bg-white border shadow-sm flex items-center justify-center"
                    >
                      <span className="text-[9px] font-medium text-gray-600">
                        {index === 0 ? 'Cover' : 
                         index === 1 ? 'P1' : 
                         `P${(index - 1) * 2}-${(index - 1) * 2 + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Back to editor link */}
              <Link 
                href="/editor"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mt-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Editor
              </Link>
            </div>
            
            {/* RIGHT COLUMN - Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 sticky top-4">
                <h2 className="font-serif text-xl font-black mb-4">Order Summary</h2>
                
                {/* Product details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Book type & size</span>
                    <span className="font-medium">11.5" × 8.5" Vertical Hardcover</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Pages</span>
                    <span className="font-medium flex items-center gap-1">
                      24 pages
                      <Edit className="w-3 h-3 text-gray-400" />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cover theme</span>
                    <span className="font-medium">{templateTheme || 'Travel Book'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paper type</span>
                    <span className="font-medium">Gloss Paper</span>
                  </div>
                </div>
                
                <div className="border-t my-4" />
                
                {/* Pricing */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Original price</span>
                    <span className="text-gray-400 line-through">$65.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-accent font-bold">-50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Additional pages</span>
                    <span className="text-gray-500">0 × gloss paper</span>
                  </div>
                </div>
                
                <div className="border-t my-4" />
                
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-black">Subtotal</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black">$32.99</span>
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full font-bold">
                      Save 50%
                    </span>
                  </div>
                </div>
                
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                
                {/* Trust badges */}
                <div className="mt-4 space-y-2 text-center">
                  <p className="text-xs text-gray-500">🛡 30-day satisfaction guarantee</p>
                  <p className="text-xs text-gray-500">⭐ Rated Excellent 4.8/5 on Trustpilot</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom trust section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <Truck className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-bold mb-1">Fast Shipping</h3>
              <p className="text-sm text-gray-500">Worldwide in 5-15 days</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <Shield className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-bold mb-1">100% Satisfaction</h3>
              <p className="text-sm text-gray-500">30-day money-back guarantee</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <Heart className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-bold mb-1">100,000+ Customers</h3>
              <p className="text-sm text-gray-500">Loved by travelers</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
