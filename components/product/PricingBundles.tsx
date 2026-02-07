'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { bundles } from '@/lib/constants'

interface PricingBundlesProps {
  selectedBundle: string
  onSelectBundle: (bundleId: string) => void
}

export default function PricingBundles({ selectedBundle, onSelectBundle }: PricingBundlesProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {bundles.map((bundle) => (
          <button
            key={bundle.id}
            onClick={() => onSelectBundle(bundle.id)}
            className={cn(
              "relative p-4 border-2 rounded-xl transition-all hover:border-black",
              selectedBundle === bundle.id
                ? "border-black bg-gray-50"
                : "border-gray-300"
            )}
          >
            {selectedBundle === bundle.id && (
              <div className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div className="text-center">
              <div className="font-bold text-lg capitalize">{bundle.name}</div>
              <div className="text-xs text-muted mt-1">Save {bundle.discount}%</div>
              {bundle.freeShipping && (
                <div className="text-xs text-accent font-medium mt-1">+ Free Shipping</div>
              )}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted text-center">*discounts will apply in cart</p>
    </div>
  )
}
