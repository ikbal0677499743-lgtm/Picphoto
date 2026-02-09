'use client'

import { Truck, Star, Shield } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Fast Shipping Worldwide</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Over 10,000 Five-Star Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>30-Day Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}
