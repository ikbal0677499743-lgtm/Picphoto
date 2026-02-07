'use client'

import { useState, useRef, DragEvent, ChangeEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Hand } from 'lucide-react'

function WizardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isDragging, setIsDragging] = useState(false)
  
  const theme = searchParams.get('theme') || 'paris-1'
  const mode = searchParams.get('mode') || 'template'

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log(`Selected ${files.length} photos`)
      router.push(`/editor?theme=${theme}&mode=auto`)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleManualMode = () => {
    router.push(`/editor?theme=${theme}&mode=manual`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
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

      {/* Two Column Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* Left Column - Shortcut Mode */}
        <div className="bg-[#F9FAFB] border-r border-gray-200 py-12 md:py-0 flex items-center justify-center px-6">
          <div className="max-w-sm text-center space-y-6">
            <h2 className="font-serif text-3xl font-black">Shortcut</h2>
            
            <p className="text-gray-600">
              Upload your photos, review the AI-created layout, and customize it to your liking.
            </p>
            
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-12 h-12 text-accent" />
              </div>
            </div>
            
            <button
              onClick={handleButtonClick}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors"
            >
              Add Photos
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                isDragging
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-300 bg-transparent'
              }`}
            >
              <p className="text-sm text-gray-500">
                or drag & drop your photos here
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Manual Mode */}
        <div className="bg-white py-12 md:py-0 flex items-center justify-center px-6">
          <div className="max-w-sm text-center space-y-6">
            <h2 className="font-serif text-3xl font-black">Manual Mode</h2>
            
            <p className="text-gray-600">
              Take full control of the creation process. Design every page exactly how you want.
            </p>
            
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">
                <Hand className="w-12 h-12 text-gray-600" />
              </div>
            </div>
            
            <button
              onClick={handleManualMode}
              className="w-full bg-white text-black border-2 border-black py-4 rounded-xl font-bold hover:bg-black hover:text-white transition-all"
            >
              Go to Editor →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WizardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <WizardContent />
    </Suspense>
  )
}
