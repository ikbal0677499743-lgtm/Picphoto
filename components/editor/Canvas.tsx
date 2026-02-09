'use client'

import { useRef, useEffect, useCallback, DragEvent, useState } from 'react'
import { Canvas as FabricCanvas, FabricImage, Textbox, Rect, Circle, FabricObject } from 'fabric'
import { BookOpen, Check, X, RotateCcw } from 'lucide-react'
import { useEditorStore, CanvasElement } from '@/lib/store/editorStore'

// Extend FabricObject type to include our custom data
interface CustomFabricObject extends FabricObject {
  data?: {
    elementId: string
    historyPushed?: boolean
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<FabricCanvas | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isUpdatingFromStore = useRef(false)
  const isUpdatingStore = useRef(false)
  
  // Crop mode state
  const [cropZoom, setCropZoom] = useState(100)
  const [originalCropData, setOriginalCropData] = useState<{offsetX: number, offsetY: number, zoom: number} | null>(null)
  
  const pages = useEditorStore(state => state.pages)
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const zoom = useEditorStore(state => state.zoom)
  const selectedElementId = useEditorStore(state => state.selectedElementId)
  const selectElement = useEditorStore(state => state.selectElement)
  const updateElement = useEditorStore(state => state.updateElement)
  const deleteElement = useEditorStore(state => state.deleteElement)
  const addElement = useEditorStore(state => state.addElement)
  const templateTheme = useEditorStore(state => state.templateTheme)
  const cropModeElementId = useEditorStore(state => state.cropModeElementId)
  const setCropMode = useEditorStore(state => state.setCropMode)
  const pushHistory = useEditorStore(state => state.pushHistory)
  
  const currentPage = pages[currentPageIndex]
  const cropElement = currentPage?.elements.find(el => el.id === cropModeElementId)
  
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
      if (isUpdatingFromStore.current || cropModeElementId) return
      const selected = e.selected?.[0] as CustomFabricObject
      if (selected && selected.data?.elementId) {
        selectElement(selected.data.elementId)
      }
    })
    
    canvas.on('selection:updated', (e) => {
      if (isUpdatingFromStore.current || cropModeElementId) return
      const selected = e.selected?.[0] as CustomFabricObject
      if (selected && selected.data?.elementId) {
        selectElement(selected.data.elementId)
      }
    })
    
    canvas.on('selection:cleared', () => {
      if (isUpdatingFromStore.current || cropModeElementId) return
      selectElement(null)
    })
    
    // Push history before object modifications start
    canvas.on('object:moving', (e) => {
      const obj = e.target as CustomFabricObject
      if (obj && obj.data?.elementId && !obj.data.historyPushed) {
        // Mark that we've pushed history for this modification session
        obj.data.historyPushed = true
        pushHistory()
      }
    })
    
    canvas.on('object:scaling', (e) => {
      const obj = e.target as CustomFabricObject
      if (obj && obj.data?.elementId && !obj.data.historyPushed) {
        obj.data.historyPushed = true
        pushHistory()
      }
    })
    
    canvas.on('object:rotating', (e) => {
      const obj = e.target as CustomFabricObject
      if (obj && obj.data?.elementId && !obj.data.historyPushed) {
        obj.data.historyPushed = true
        pushHistory()
      }
    })
    
    // Handle object modifications
    canvas.on('object:modified', (e) => {
      if (isUpdatingStore.current) return
      const obj = e.target as CustomFabricObject
      if (obj && obj.data?.elementId) {
        isUpdatingStore.current = true
        
        // Clear the history flag for next modification
        if (obj.data) {
          obj.data.historyPushed = false
        }
        
        // If in crop mode, save crop data
        if (cropModeElementId && obj.data.elementId === cropModeElementId) {
          const element = currentPage?.elements.find(el => el.id === cropModeElementId)
          if (element && element.type === 'image') {
            updateElement(currentPageIndex, obj.data.elementId, {
              cropData: {
                offsetX: obj.left || 0,
                offsetY: obj.top || 0,
                zoom: cropZoom,
              }
            })
          }
        } else {
          updateElement(currentPageIndex, obj.data.elementId, {
            x: obj.left || 0,
            y: obj.top || 0,
            width: (obj.width || 0) * (obj.scaleX || 1),
            height: (obj.height || 0) * (obj.scaleY || 1),
            rotation: obj.angle || 0,
          })
        }
        isUpdatingStore.current = false
      }
    })
    
    // Handle double-click
    canvas.on('mouse:dblclick', (e) => {
      if (cropModeElementId) return // Don't handle double-click in crop mode
      
      const target = e.target as CustomFabricObject
      if (target) {
        if (target.type === 'textbox') {
          // Text editing
          canvas.setActiveObject(target)
          ;(target as Textbox).enterEditing()
          canvas.renderAll()
        } else if (target.type === 'image' && target.data?.elementId) {
          // Enter crop mode for images
          const element = currentPage?.elements.find(el => el.id === target.data?.elementId)
          if (element && element.type === 'image' && !element.placeholder) {
            setCropMode(target.data.elementId)
            // Save original crop data for cancel
            setOriginalCropData(element.cropData || { offsetX: element.x, offsetY: element.y, zoom: 100 })
            setCropZoom(element.cropData?.zoom || 100)
          }
        }
      }
    })
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cropModeElementId) {
        // In crop mode, Escape cancels
        if (e.key === 'Escape') {
          handleCropCancel()
        } else if (e.key === 'Enter') {
          handleCropDone()
        }
        return
      }
      
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
          if (customObj.data?.elementId === selectedElementId && !cropModeElementId) {
            canvas.setActiveObject(obj)
          }
        }
      })
      
      // If in crop mode, add overlay
      if (cropModeElementId) {
        addCropModeOverlay(canvas)
      }
      
      canvas.renderAll()
      isUpdatingFromStore.current = false
    })
    
  }, [currentPage?.elements, currentPageIndex, cropModeElementId])
  
  // Handle zoom
  useEffect(() => {
    if (containerRef.current) {
      const scale = zoom / 100
      containerRef.current.style.transform = `scale(${scale})`
    }
  }, [zoom])
  
  // Add crop mode overlay
  const addCropModeOverlay = (canvas: FabricCanvas) => {
    if (!cropElement) return
    
    // Create dark overlay
    const overlay = new Rect({
      left: 0,
      top: 0,
      width: canvas.width || 800,
      height: canvas.height || 540,
      fill: 'rgba(0, 0, 0, 0.6)',
      selectable: false,
      evented: false,
      name: 'crop-overlay',
    })
    
    // Create clear area for the crop frame
    const cropFrame = new Rect({
      left: cropElement.x,
      top: cropElement.y,
      width: cropElement.width,
      height: cropElement.height,
      fill: 'transparent',
      stroke: '#E91E63',
      strokeWidth: 3,
      selectable: false,
      evented: false,
      name: 'crop-frame',
    })
    
    canvas.add(overlay)
    canvas.add(cropFrame)
    
    // Make only the crop image movable
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      const customObj = obj as CustomFabricObject
      if (customObj.data?.elementId === cropModeElementId) {
        customObj.selectable = true
        customObj.evented = true
        canvas.setActiveObject(customObj)
      } else {
        customObj.selectable = false
        customObj.evented = false
      }
    })
  }
  
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
              
              // Apply crop data or default scaling
              if (element.cropData) {
                const scale = element.cropData.zoom / 100
                obj.set({
                  left: element.cropData.offsetX,
                  top: element.cropData.offsetY,
                  scaleX: scale,
                  scaleY: scale,
                })
              } else {
                // Default: scale to fill
                const scaleX = element.width / (img.width || 1)
                const scaleY = element.height / (img.height || 1)
                const scale = Math.max(scaleX, scaleY)
                obj.set({
                  left: element.x,
                  top: element.y,
                  scaleX: scale,
                  scaleY: scale,
                })
              }
              
              // Apply flip
              if (element.flipX) obj.set({ flipX: true })
              if (element.flipY) obj.set({ flipY: true })
              
              // Create clipPath for cropping
              const clipRect = new Rect({
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                absolutePositioned: true,
              })
              obj.clipPath = clipRect
              
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
  
  // Handle crop zoom change
  const handleCropZoomChange = (newZoom: number) => {
    setCropZoom(newZoom)
    const canvas = fabricCanvasRef.current
    if (!canvas || !cropElement) return
    
    const obj = canvas.getObjects().find(o => {
      const customObj = o as CustomFabricObject
      return customObj.data?.elementId === cropModeElementId
    })
    
    if (obj) {
      const scale = newZoom / 100
      obj.set({ scaleX: scale, scaleY: scale })
      canvas.renderAll()
    }
  }
  
  // Handle crop done
  const handleCropDone = () => {
    if (!cropElement || !fabricCanvasRef.current) return
    
    const obj = fabricCanvasRef.current.getObjects().find(o => {
      const customObj = o as CustomFabricObject
      return customObj.data?.elementId === cropModeElementId
    })
    
    if (obj) {
      // Save crop data
      updateElement(currentPageIndex, cropModeElementId!, {
        cropData: {
          offsetX: obj.left || 0,
          offsetY: obj.top || 0,
          zoom: cropZoom,
        }
      })
    }
    
    setCropMode(null)
    setOriginalCropData(null)
  }
  
  // Handle crop cancel
  const handleCropCancel = () => {
    if (originalCropData && cropElement) {
      // Restore original crop data
      updateElement(currentPageIndex, cropModeElementId!, {
        cropData: originalCropData,
      })
    }
    setCropMode(null)
    setOriginalCropData(null)
  }
  
  // Handle crop reset
  const handleCropReset = () => {
    if (!cropElement) return
    
    setCropZoom(100)
    
    // Reset to center position
    const canvas = fabricCanvasRef.current
    if (!canvas) return
    
    const obj = canvas.getObjects().find(o => {
      const customObj = o as CustomFabricObject
      return customObj.data?.elementId === cropModeElementId
    })
    
    if (obj) {
      obj.set({
        left: cropElement.x,
        top: cropElement.y,
        scaleX: 1,
        scaleY: 1,
      })
      canvas.renderAll()
    }
  }
  
  // Handle drag over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  // Handle drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (cropModeElementId) return // Don't allow drops in crop mode
    
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
        className="transition-transform relative"
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
        
        {/* Crop Mode Toolbar */}
        {cropModeElementId && cropElement && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-3 flex items-center gap-4 z-[100]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">Zoom:</span>
              <input
                type="range"
                min="50"
                max="200"
                value={cropZoom}
                onChange={(e) => handleCropZoomChange(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-xs font-medium text-gray-700 w-12">{cropZoom}%</span>
            </div>
            
            <div className="w-px h-6 bg-gray-200" />
            
            <button
              onClick={handleCropReset}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5"
              title="Reset crop"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            
            <button
              onClick={handleCropCancel}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5"
              title="Cancel (Esc)"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            
            <button
              onClick={handleCropDone}
              className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-1.5"
              title="Done (Enter)"
            >
              <Check className="w-3.5 h-3.5" />
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
