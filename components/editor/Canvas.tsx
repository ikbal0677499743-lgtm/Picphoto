'use client'

import { useRef, useEffect, useCallback, DragEvent } from 'react'
import { Canvas as FabricCanvas, FabricImage, Textbox, Rect, Circle, Group, FabricObject } from 'fabric'
import { BookOpen, Image as ImageIcon } from 'lucide-react'
import { useEditorStore, CanvasElement } from '@/lib/store/editorStore'

// Extend FabricObject type to include our custom data
interface CustomFabricObject extends FabricObject {
  data?: {
    elementId: string
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<FabricCanvas | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isUpdatingFromStore = useRef(false)
  const isUpdatingStore = useRef(false)
  
  const pages = useEditorStore(state => state.pages)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const zoom = useEditorStore(state => state.zoom)
  const selectedElementId = useEditorStore(state => state.selectedElementId)
  const selectElement = useEditorStore(state => state.selectElement)
  const updateElement = useEditorStore(state => state.updateElement)
  const deleteElement = useEditorStore(state => state.deleteElement)
  const addElement = useEditorStore(state => state.addElement)
  const templateTheme = useEditorStore(state => state.templateTheme)
  
  const currentPage = pages[currentPageIndex]
  
  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return
    
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 540,
      backgroundColor: currentPage?.backgroundColor || '#FFFFFF',
      selection: true,
      preserveObjectStacking: true,
    })
    
    fabricCanvasRef.current = canvas
    
    // Handle object selection
    canvas.on('selection:created', (e) => {
      if (isUpdatingFromStore.current) return
      const selected = e.selected?.[0] as CustomFabricObject
      if (selected && selected.data?.elementId) {
        selectElement(selected.data.elementId)
      }
    })
    
    canvas.on('selection:updated', (e) => {
      if (isUpdatingFromStore.current) return
      const selected = e.selected?.[0] as CustomFabricObject
      if (selected && selected.data?.elementId) {
        selectElement(selected.data.elementId)
      }
    })
    
    canvas.on('selection:cleared', () => {
      if (isUpdatingFromStore.current) return
      selectElement(null)
    })
    
    // Handle object modifications
    canvas.on('object:modified', (e) => {
      if (isUpdatingStore.current) return
      const obj = e.target as CustomFabricObject
      if (obj && obj.data?.elementId) {
        isUpdatingStore.current = true
        updateElement(currentPageIndex, obj.data.elementId, {
          x: obj.left || 0,
          y: obj.top || 0,
          width: (obj.width || 0) * (obj.scaleX || 1),
          height: (obj.height || 0) * (obj.scaleY || 1),
          rotation: obj.angle || 0,
        })
        isUpdatingStore.current = false
      }
    })
    
    // Handle double-click for text editing
    canvas.on('mouse:dblclick', (e) => {
      const target = e.target
      if (target && target.type === 'textbox') {
        canvas.setActiveObject(target)
        ;(target as Textbox).enterEditing()
        canvas.renderAll()
      }
    })
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObject = canvas.getActiveObject() as CustomFabricObject
        if (activeObject && activeObject.data?.elementId) {
          e.preventDefault()
          deleteElement(currentPageIndex, activeObject.data.elementId)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      canvas.dispose()
      fabricCanvasRef.current = null
    }
  }, []) // Only run once on mount
  
  // Update canvas background when page changes
  useEffect(() => {
    if (fabricCanvasRef.current && currentPage) {
      fabricCanvasRef.current.backgroundColor = currentPage.backgroundColor || '#FFFFFF'
      fabricCanvasRef.current.renderAll()
    }
  }, [currentPage?.backgroundColor])
  
  // Sync store elements to Fabric canvas
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas || !currentPage) return
    
    isUpdatingFromStore.current = true
    
    // Clear existing objects
    canvas.clear()
    canvas.backgroundColor = currentPage.backgroundColor || '#FFFFFF'
    
    // Add elements from store
    const promises = currentPage.elements.map(element => createFabricObject(element))
    
    Promise.all(promises).then(objects => {
      objects.forEach(obj => {
        if (obj) {
          canvas.add(obj)
          const customObj = obj as CustomFabricObject
          if (customObj.data?.elementId === selectedElementId) {
            canvas.setActiveObject(obj)
          }
        }
      })
      canvas.renderAll()
      isUpdatingFromStore.current = false
    })
    
  }, [currentPage?.elements, currentPageIndex])
  
  // Handle zoom
  useEffect(() => {
    if (containerRef.current) {
      const scale = zoom / 100
      containerRef.current.style.transform = `scale(${scale})`
    }
  }, [zoom])
  
  // Create Fabric object from store element
  const createFabricObject = useCallback(async (element: CanvasElement): Promise<CustomFabricObject | null> => {
    try {
      let obj: CustomFabricObject | null = null
      
      switch (element.type) {
        case 'image':
          if (element.placeholder) {
            // Create placeholder rectangle
            obj = new Rect({
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              fill: '#F9FAFB',
              stroke: '#D1D5DB',
              strokeWidth: 2,
              strokeDashArray: [5, 5],
              rx: 8,
              ry: 8,
            })
          } else if (element.imageUrl) {
            // Load actual image
            try {
              const img = await FabricImage.fromURL(element.imageUrl, {
                crossOrigin: 'anonymous',
              })
              obj = img
              obj.scaleToWidth(element.width)
              obj.scaleToHeight(element.height)
              obj.set({
                left: element.x,
                top: element.y,
              })
            } catch (error) {
              console.error('Error loading image:', error)
              // Fallback to placeholder
              obj = new Rect({
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                fill: '#F9FAFB',
                stroke: '#D1D5DB',
                strokeWidth: 2,
              })
            }
          }
          break
          
        case 'text':
          obj = new Textbox(element.content || 'Text', {
            left: element.x,
            top: element.y,
            width: element.width,
            fontSize: element.fontSize || 24,
            fontFamily: element.fontFamily || 'DM Sans',
            fill: element.fontColor || '#000000',
            fontWeight: element.fontWeight || 'normal',
            textAlign: element.textAlign || 'left',
          })
          break
          
        case 'shape':
          if (element.shapeType === 'ellipse') {
            obj = new Circle({
              left: element.x,
              top: element.y,
              radius: element.width / 2,
              fill: element.fillColor || '#E5E7EB',
              stroke: element.strokeColor,
              strokeWidth: element.strokeColor ? 2 : 0,
            })
          } else {
            obj = new Rect({
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              fill: element.fillColor || '#E5E7EB',
              stroke: element.strokeColor,
              strokeWidth: element.strokeColor ? 2 : 0,
              rx: 4,
              ry: 4,
            })
          }
          break
          
        case 'sticker':
          // Create text object for emoji stickers
          obj = new Textbox(element.stickerUrl || '🎨', {
            left: element.x,
            top: element.y,
            width: element.width,
            fontSize: 60,
            textAlign: 'center',
            selectable: true,
          })
          break
      }
      
      if (obj) {
        obj.set({
          angle: element.rotation,
          opacity: element.opacity,
        })
        obj.data = { elementId: element.id }
        obj.setCoords()
      }
      
      return obj
    } catch (error) {
      console.error('Error creating fabric object:', error)
      return null
    }
  }, [])
  
  // Handle drag over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  // Handle drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const data = e.dataTransfer.getData('application/json')
      if (data && canvasRef.current) {
        const image = JSON.parse(data)
        
        // Get drop position relative to canvas
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Add image element at drop position
        const element: CanvasElement = {
          id: Math.random().toString(36).substring(2),
          type: 'image',
          x: x - 100,
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
  
  // Render cover/guard pages (non-editable)
  const renderSpecialPage = () => {
    if (currentPage?.type === 'cover') {
      const theme = templateTheme || 'Travel Book'
      return (
        <div className="flex gap-0.5">
          <div className="w-[400px] h-[540px] bg-white shadow-xl rounded-l flex items-center justify-center">
            <span className="text-gray-400 font-medium">Back Cover</span>
          </div>
          <div className="w-0.5 bg-gray-300" />
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
    
    if (currentPage?.type === 'guard') {
      const theme = templateTheme || 'Travel Book'
      return (
        <div className="flex gap-0.5">
          <div className="w-[400px] h-[540px] bg-white shadow-xl rounded-l" />
          <div className="w-0.5 bg-gray-300" />
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
    
    return null
  }
  
  // For inner pages, show Fabric canvas
  if (currentPage?.type !== 'inner') {
    return (
      <div className="w-full h-full flex items-center justify-center overflow-auto">
        <div
          ref={containerRef}
          className="transition-transform"
        >
          {renderSpecialPage()}
        </div>
      </div>
    )
  }
  
  const spreadNum = currentPageIndex - 1
  const leftPageNum = spreadNum * 2
  const rightPageNum = spreadNum * 2 + 1
  
  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      <div
        ref={containerRef}
        className="transition-transform"
      >
        <div className="flex gap-0.5">
          {/* Left page - Fabric canvas */}
          <div 
            className="relative"
            style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <canvas ref={canvasRef} className="shadow-xl rounded-l" />
            <div className="absolute bottom-4 left-4 text-xs text-gray-400 pointer-events-none">
              Page {leftPageNum}
            </div>
          </div>
          
          {/* Spine */}
          <div className="w-0.5 bg-gray-300" />
          
          {/* Right page */}
          <div
            className="w-[400px] h-[540px] bg-white shadow-xl rounded-r relative"
            style={{ backgroundColor: currentPage?.backgroundColor || '#FFFFFF' }}
          >
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              Page {rightPageNum}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
