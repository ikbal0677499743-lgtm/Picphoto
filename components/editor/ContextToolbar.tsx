'use client'

import { Trash2, Copy, Eye, EyeOff, Crop, Maximize2, Minimize2, FlipHorizontal, FlipVertical } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function ContextToolbar() {
  const selectedElementId = useEditorStore(state => state.selectedElementId)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const pages = useEditorStore(state => state.pages)
  const deleteElement = useEditorStore(state => state.deleteElement)
  const updateElement = useEditorStore(state => state.updateElement)
  const selectElement = useEditorStore(state => state.selectElement)
  const setCropMode = useEditorStore(state => state.setCropMode)
  
  if (!selectedElementId) return null
  
  const currentPage = pages[currentPageIndex]
  const element = currentPage?.elements.find(el => el.id === selectedElementId)
  
  if (!element) return null
  
  const isImage = element.type === 'image' && !element.placeholder
  
  const handleDelete = () => {
    deleteElement(currentPageIndex, selectedElementId)
  }
  
  const handleDuplicate = () => {
    // TODO: Implement duplicate
    console.log('Duplicate element')
  }
  
  const handleToggleVisibility = () => {
    updateElement(currentPageIndex, selectedElementId, {
      opacity: element.opacity === 1 ? 0.5 : 1,
    })
  }
  
  const handleCrop = () => {
    setCropMode(selectedElementId)
  }
  
  const handleFlipHorizontal = () => {
    updateElement(currentPageIndex, selectedElementId, {
      flipX: !element.flipX,
    })
  }
  
  const handleFlipVertical = () => {
    updateElement(currentPageIndex, selectedElementId, {
      flipY: !element.flipY,
    })
  }

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-200 px-2 py-1.5 flex items-center gap-1 z-50">
      {isImage && (
        <>
          <button
            onClick={handleCrop}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Crop Image"
          >
            <Crop className="w-4 h-4 text-gray-700" />
          </button>
          
          <button
            onClick={handleFlipHorizontal}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Flip Horizontal"
          >
            <FlipHorizontal className="w-4 h-4 text-gray-700" />
          </button>
          
          <button
            onClick={handleFlipVertical}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Flip Vertical"
          >
            <FlipVertical className="w-4 h-4 text-gray-700" />
          </button>
          
          <div className="w-px h-4 bg-gray-200 mx-1" />
        </>
      )}
      
      <button
        onClick={handleDuplicate}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Duplicate"
      >
        <Copy className="w-4 h-4 text-gray-700" />
      </button>
      
      <button
        onClick={handleToggleVisibility}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title={element.opacity === 1 ? 'Hide' : 'Show'}
      >
        {element.opacity === 1 ? (
          <Eye className="w-4 h-4 text-gray-700" />
        ) : (
          <EyeOff className="w-4 h-4 text-gray-700" />
        )}
      </button>
      
      <div className="w-px h-4 bg-gray-200 mx-1" />
      
      <button
        onClick={handleDelete}
        className="p-1.5 hover:bg-red-50 rounded transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  )
}
