'use client'

import { useRef, DragEvent, useState } from 'react'
import { BookOpen, Image as ImageIcon } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  
  const pages = useEditorStore(state => state.pages)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const zoom = useEditorStore(state => state.zoom)
  const selectedElementId = useEditorStore(state => state.selectedElementId)
  const selectElement = useEditorStore(state => state.selectElement)
  const updateElement = useEditorStore(state => state.updateElement)
  const addElement = useEditorStore(state => state.addElement)
  const templateTheme = useEditorStore(state => state.templateTheme)
  
  const currentPage = pages[currentPageIndex]
  const scale = zoom / 100
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const data = e.dataTransfer.getData('application/json')
      if (data) {
        const image = JSON.parse(data)
        
        // Get drop position relative to canvas
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / scale
        const y = (e.clientY - rect.top) / scale
        
        // Add image element at drop position
        const element = {
          id: Math.random().toString(36).substring(2),
          type: 'image' as const,
          x: x - 100, // Center the image on cursor
          y: y - 100,
          width: 200,
          height: 200,
          rotation: 0,
          opacity: 1,
          zIndex: 50,
          imageUrl: image.url,
          placeholder: false,
        }
        addElement(currentPageIndex, element)
      }
    } catch (error) {
      console.error('Error dropping image:', error)
    }
  }
  
  const handleTextDoubleClick = (element: any) => {
    setEditingTextId(element.id)
    setEditingText(element.content || 'Text')
  }
  
  const handleTextBlur = (elementId: string) => {
    if (editingText.trim()) {
      updateElement(currentPageIndex, elementId, { content: editingText })
    }
    setEditingTextId(null)
  }
  
  const handleTextKeyDown = (e: React.KeyboardEvent, elementId: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTextBlur(elementId)
    } else if (e.key === 'Escape') {
      setEditingTextId(null)
      setEditingText('')
    }
  }
  
  const renderCoverPage = () => {
    const theme = templateTheme || 'Travel Book'
    
    return (
      <div className="flex gap-0.5">
        {/* Back Cover */}
        <div className="w-[400px] h-[540px] bg-white shadow-xl rounded-l flex items-center justify-center">
          <span className="text-gray-400 font-medium">Back Cover</span>
        </div>
        
        {/* Spine */}
        <div className="w-0.5 bg-gray-300" />
        
        {/* Front Cover */}
        <div
          className="w-[400px] h-[540px] bg-white shadow-xl rounded-r flex flex-col items-center justify-center gap-4 p-8"
          style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
        >
          <BookOpen className="w-16 h-16 text-accent" />
          <h1 className="font-serif font-black text-3xl text-center">{theme}</h1>
          <p className="text-xl text-gray-600">2025</p>
        </div>
      </div>
    )
  }
  
  const renderGuardPage = () => {
    const theme = templateTheme || 'Travel Book'
    
    return (
      <div className="flex gap-0.5">
        {/* Left page */}
        <div className="w-[400px] h-[540px] bg-white shadow-xl rounded-l" />
        
        {/* Spine */}
        <div className="w-0.5 bg-gray-300" />
        
        {/* Right page - Title page */}
        <div
          className="w-[400px] h-[540px] bg-white shadow-xl rounded-r flex flex-col items-center justify-center gap-4 p-8"
          style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
        >
          <h2 className="font-serif font-black text-4xl text-center">Title Page</h2>
          <p className="text-lg text-gray-600 text-center">{theme}</p>
        </div>
      </div>
    )
  }
  
  const renderInnerSpread = () => {
    const spreadNum = currentPageIndex - 1
    const leftPageNum = spreadNum * 2
    const rightPageNum = spreadNum * 2 + 1
    
    return (
      <div className="flex gap-0.5">
        {/* Left page */}
        <div
          className="w-[400px] h-[540px] bg-white shadow-xl rounded-l relative"
          style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Page number */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-400">
            Page {leftPageNum}
          </div>
          
          {/* Render elements for left page */}
          {currentPage?.elements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-move ${
                selectedElementId === element.id ? 'ring-2 ring-accent' : ''
              }`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                transform: `rotate(${element.rotation}deg)`,
                opacity: element.opacity,
                zIndex: element.zIndex,
              }}
              onClick={(e) => {
                e.stopPropagation()
                selectElement(element.id)
              }}
            >
              {element.type === 'image' && element.placeholder && (
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center gap-2 bg-gray-50">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-400">Drop photo here</span>
                </div>
              )}
              
              {element.type === 'image' && !element.placeholder && element.imageUrl && (
                <img
                  src={element.imageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              )}
              
              {element.type === 'text' && (
                editingTextId === element.id ? (
                  <textarea
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleTextBlur(element.id)}
                    onKeyDown={(e) => handleTextKeyDown(e, element.id)}
                    className="w-full h-full p-2 border-2 border-accent rounded resize-none bg-white"
                    style={{
                      fontFamily: element.fontFamily || 'DM Sans',
                      fontSize: `${element.fontSize || 24}px`,
                      color: element.fontColor || '#000000',
                      fontWeight: element.fontWeight || 'normal',
                      textAlign: element.textAlign || 'left',
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full p-2 cursor-text"
                    style={{
                      fontFamily: element.fontFamily || 'DM Sans',
                      fontSize: `${element.fontSize || 24}px`,
                      color: element.fontColor || '#000000',
                      fontWeight: element.fontWeight || 'normal',
                      textAlign: element.textAlign || 'left',
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      handleTextDoubleClick(element)
                    }}
                  >
                    {element.content || 'Text'}
                  </div>
                )
              )}
              
              {element.type === 'sticker' && element.stickerUrl && (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {element.stickerUrl}
                </div>
              )}
              
              {element.type === 'shape' && (
                <div
                  className={`w-full h-full ${
                    element.shapeType === 'ellipse' ? 'rounded-full' : 'rounded'
                  }`}
                  style={{
                    backgroundColor: element.fillColor || '#E5E7EB',
                    border: element.strokeColor ? `2px solid ${element.strokeColor}` : 'none',
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Spine */}
        <div className="w-0.5 bg-gray-300" />
        
        {/* Right page */}
        <div
          className="w-[400px] h-[540px] bg-white shadow-xl rounded-r relative"
          style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Page number */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-400">
            Page {rightPageNum}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      <div
        ref={canvasRef}
        className="transition-transform"
        style={{ transform: `scale(${scale})` }}
      >
        {currentPage?.type === 'cover' && renderCoverPage()}
        {currentPage?.type === 'guard' && renderGuardPage()}
        {currentPage?.type === 'inner' && renderInnerSpread()}
      </div>
    </div>
  )
}
