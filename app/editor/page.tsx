'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

function EditorContent() {
  const searchParams = useSearchParams()
  
  const theme = searchParams.get('theme') || 'unknown'
  const mode = searchParams.get('mode') || 'unknown'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link 
            href="/products/travel-photobook" 
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          
          <h1 className="font-serif font-black text-xl">pixory</h1>
          
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif font-black text-4xl mb-4">Editor (Coming Soon)</h1>
          <p className="text-gray-600 mb-6">
            The full editor will be implemented here.
          </p>
          <div className="bg-gray-100 rounded-xl p-6 space-y-2 text-left">
            <p className="text-sm">
              <span className="font-semibold">Theme:</span> {theme}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Mode:</span> {mode}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  )
}
