'use client'

import { useEditorStore } from '@/lib/store/editorStore'

// Define layout configurations
const layouts = [
  {
    id: 'full',
    name: 'Full Page',
    slots: [{ x: 0, y: 0, width: 100, height: 100 }],
  },
  {
    id: 'vertical-2',
    name: '2 Vertical',
    slots: [
      { x: 0, y: 0, width: 49, height: 100 },
      { x: 51, y: 0, width: 49, height: 100 },
    ],
  },
  {
    id: 'horizontal-2',
    name: '2 Horizontal',
    slots: [
      { x: 0, y: 0, width: 100, height: 49 },
      { x: 0, y: 51, width: 100, height: 49 },
    ],
  },
  {
    id: 'grid-2x2',
    name: 'Grid 2×2',
    slots: [
      { x: 0, y: 0, width: 49, height: 49 },
      { x: 51, y: 0, width: 49, height: 49 },
      { x: 0, y: 51, width: 49, height: 49 },
      { x: 51, y: 51, width: 49, height: 49 },
    ],
  },
  {
    id: 'big-left',
    name: 'Big Left',
    slots: [
      { x: 0, y: 0, width: 64, height: 100 },
      { x: 66, y: 0, width: 34, height: 49 },
      { x: 66, y: 51, width: 34, height: 49 },
    ],
  },
  {
    id: 'big-right',
    name: 'Big Right',
    slots: [
      { x: 0, y: 0, width: 34, height: 49 },
      { x: 0, y: 51, width: 34, height: 49 },
      { x: 36, y: 0, width: 64, height: 100 },
    ],
  },
  {
    id: 'big-top',
    name: 'Big Top',
    slots: [
      { x: 0, y: 0, width: 100, height: 64 },
      { x: 0, y: 66, width: 49, height: 34 },
      { x: 51, y: 66, width: 49, height: 34 },
    ],
  },
  {
    id: 'columns-3',
    name: '3 Columns',
    slots: [
      { x: 0, y: 0, width: 32, height: 100 },
      { x: 34, y: 0, width: 32, height: 100 },
      { x: 68, y: 0, width: 32, height: 100 },
    ],
  },
  {
    id: 'grid-3x2',
    name: 'Grid 3×2',
    slots: [
      { x: 0, y: 0, width: 32, height: 49 },
      { x: 34, y: 0, width: 32, height: 49 },
      { x: 68, y: 0, width: 32, height: 49 },
      { x: 0, y: 51, width: 32, height: 49 },
      { x: 34, y: 51, width: 32, height: 49 },
      { x: 68, y: 51, width: 32, height: 49 },
    ],
  },
  {
    id: 'center-feature',
    name: 'Center Feature',
    slots: [
      { x: 10, y: 5, width: 80, height: 60 },
      { x: 0, y: 70, width: 49, height: 30 },
      { x: 51, y: 70, width: 49, height: 30 },
    ],
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    slots: [
      { x: 0, y: 0, width: 49, height: 49 },
      { x: 51, y: 0, width: 49, height: 32 },
      { x: 51, y: 34, width: 49, height: 32 },
      { x: 0, y: 51, width: 32, height: 49 },
      { x: 34, y: 68, width: 66, height: 32 },
    ],
  },
  {
    id: 'passport',
    name: 'Passport',
    slots: [
      { x: 20, y: 15, width: 60, height: 70 },
    ],
  },
]

export default function LayoutsPanel() {
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const pages = useEditorStore(state => state.pages)
  const addElement = useEditorStore(state => state.addElement)
  
  const applyLayout = (layout: typeof layouts[0]) => {
    // Clear current page elements and add placeholder images based on layout
    const currentPage = pages[currentPageIndex]
    if (!currentPage || currentPage.type !== 'inner') return
    
    // For simplicity, we'll just add the layout as placeholder elements
    // In a real implementation, you'd replace existing elements
    const canvasWidth = 400
    const canvasHeight = 540
    
    layout.slots.forEach((slot, index) => {
      const element = {
        id: Math.random().toString(36).substring(2),
        type: 'image' as const,
        x: (slot.x / 100) * canvasWidth,
        y: (slot.y / 100) * canvasHeight,
        width: (slot.width / 100) * canvasWidth,
        height: (slot.height / 100) * canvasHeight,
        rotation: 0,
        opacity: 1,
        zIndex: index,
        placeholder: true,
      }
      addElement(currentPageIndex, element)
    })
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h3 className="font-bold text-sm">Page Layouts</h3>
        <p className="text-xs text-gray-500 mt-1">Click to apply to current page</p>
      </div>
      
      {/* Layouts grid */}
      <div className="grid grid-cols-3 gap-2">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => applyLayout(layout)}
            className="cursor-pointer group"
          >
            {/* Layout visual */}
            <div className="aspect-[4/3] bg-gray-50 border rounded-lg p-2 hover:border-black transition-colors relative">
              <div className="w-full h-full relative">
                {layout.slots.map((slot, i) => (
                  <div
                    key={i}
                    className="absolute bg-gray-200 rounded"
                    style={{
                      left: `${slot.x}%`,
                      top: `${slot.y}%`,
                      width: `${slot.width}%`,
                      height: `${slot.height}%`,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Layout name */}
            <p className="text-[10px] text-gray-500 text-center mt-1">{layout.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
