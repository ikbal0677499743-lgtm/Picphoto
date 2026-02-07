import { Star } from 'lucide-react'
import { reviews } from '@/lib/constants'

export default function ReviewsSection() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-black text-4xl mb-4">
            Rated Excellent on Trustpilot
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg font-semibold">4.8/5.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted">{review.country}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
