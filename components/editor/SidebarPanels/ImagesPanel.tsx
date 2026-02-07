'use client'

import { useRef, useState, DragEvent } from 'react'
import { Monitor, Smartphone, FolderOpen, Info, ImageIcon } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function ImagesPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const uploadedImages = useEditorStore(state => state.uploadedImages)
  const addUploadedImage = useEditorStore(state => state.addUploadedImage)
  const addElement = useEditorStore(state => state.addElement)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
          addUploadedImage({
            id: Math.random().toString(36).substring(2),
            url,
            name: file.name,
            width: img.width,
            height: img.height,
          })
        }
        img.src = url
      }
    })
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
    handleFileSelect(e.dataTransfer.files)
  }
  
  const handleImageClick = (image: any) => {
    // Add image to current page on click
    const element = {
      id: Math.random().toString(36).substring(2),
      type: 'image' as const,
      x: 50,
      y: 50,
      width: 300,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 50,
      imageUrl: image.url,
      placeholder: false,
    }
    addElement(currentPageIndex, element)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm">Add Photos</h3>
        <Info className="w-4 h-4 text-gray-400" />
      </div>
      
      {/* Source buttons */}
      <div className="space-y-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border rounded-xl p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <Monitor className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">From Computer</span>
        </button>
        
        <button
          className="w-full border rounded-xl p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
          title="Scan QR code"
        >
          <Smartphone className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">From Phone</span>
        </button>
        
        <button
          className="w-full border rounded-xl p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <FolderOpen className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">My Photos</span>
        </button>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      
      {/* Drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          isDragging
            ? 'border-accent bg-accent/5'
            : 'border-gray-300'
        }`}
      >
        <p className="text-sm text-gray-500">or drag & drop here</p>
      </div>
      
      {/* Uploaded images grid */}
      {uploadedImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {uploadedImages.map((image) => (
            <div
              key={image.id}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-accent transition-all"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(image))
              }}
              onClick={() => handleImageClick(image)}
              title="Click to add to canvas or drag to position"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 text-sm">
          <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No photos yet</p>
        </div>
      )}
    </div>
  )
}
