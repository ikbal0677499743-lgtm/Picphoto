'use client'

import { Type, Square, Circle, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function FloatingToolbar() {
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const pages = useEditorStore(state => state.pages)
  const addElement = useEditorStore(state => state.addElement)
  
  const currentPage = pages[currentPageIndex]
  const canEdit = currentPage?.type === 'inner'
  
  if (!canEdit) return null
  
  const handleAddText = () => {
    const element = {
      id: Math.random().toString(36).substring(2),
      type: 'text' as const,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 100,
      content: 'Double click to edit',
      fontFamily: 'DM Sans',
      fontSize: 24,
      fontColor: '#000000',
      fontWeight: 'normal' as const,
      textAlign: 'left' as const,
    }
    addElement(currentPageIndex, element)
  }
  
  const handleAddShape = (shapeType: 'rectangle' | 'ellipse') => {
    const element = {
      id: Math.random().toString(36).substring(2),
      type: 'shape' as const,
      x: 150,
      y: 150,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 50,
      shapeType,
      fillColor: '#E5E7EB',
      strokeColor: '#9CA3AF',
    }
    addElement(currentPageIndex, element)
  }
  
  const handleAddImagePlaceholder = () => {
    const element = {
      id: Math.random().toString(36).substring(2),
      type: 'image' as const,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 50,
      placeholder: true,
    }
    addElement(currentPageIndex, element)
  }

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
      <div className="flex flex-col gap-1">
        <button
          onClick={handleAddText}
          className="w-full p-2 flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="Add text"
        >
          <Type className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={() => handleAddShape('rectangle')}
          className="w-full p-2 flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="Add rectangle"
        >
          <Square className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={() => handleAddShape('ellipse')}
          className="w-full p-2 flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="Add circle"
        >
          <Circle className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={handleAddImagePlaceholder}
          className="w-full p-2 flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="Add image placeholder"
        >
          <ImageIcon className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="h-px bg-gray-200 my-1" />
        
        <button
          className="w-full p-2 flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="AI suggestions"
        >
          <Sparkles className="w-5 h-5 text-accent" />
        </button>
      </div>
    </div>
  )
}
