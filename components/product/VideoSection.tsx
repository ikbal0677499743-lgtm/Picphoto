import { Play } from 'lucide-react'

export default function VideoSection() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-serif font-black text-4xl text-center mb-8">
          See how it works
        </h2>
        
        <div className="relative aspect-video bg-surface rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-accent hover:bg-accent-dark rounded-full flex items-center justify-center transition-colors shadow-lg">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
