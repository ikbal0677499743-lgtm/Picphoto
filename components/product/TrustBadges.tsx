import { Award, Shield, Truck } from 'lucide-react'

export default function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <div className="flex items-center gap-2 text-sm">
        <Award className="w-5 h-5 text-accent" />
        <span className="font-medium">High Quality</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Shield className="w-5 h-5 text-accent" />
        <span className="font-medium">2-Year Warranty</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Truck className="w-5 h-5 text-accent" />
        <span className="font-medium">Fast Shipping</span>
      </div>
    </div>
  )
}
