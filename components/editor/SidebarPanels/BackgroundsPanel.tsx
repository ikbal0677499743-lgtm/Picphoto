'use client'

import { useEditorStore } from '@/lib/store/editorStore'

const colors = [
  '#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#000000', '#1F2937', '#374151',
  '#FEF2F2', '#FEE2E2', '#FECACA', '#EF4444', '#DC2626',
  '#FFFBEB', '#FEF3C7', '#FDE68A', '#F59E0B', '#D97706',
  '#ECFDF5', '#D1FAE5', '#10B981', '#059669',
  '#EFF6FF', '#DBEAFE', '#3B82F6', '#1D4ED8',
  '#F5F3FF', '#EDE9FE', '#8B5CF6', '#6D28D9',
  '#FDF2F8', '#FCE7F3', '#EC4899', '#BE185D',
]

const patterns = [
  { id: 'dots', name: 'Dots' },
  { id: 'stripes', name: 'Stripes' },
  { id: 'grid', name: 'Grid' },
  { id: 'waves', name: 'Waves' },
  { id: 'chevron', name: 'Chevron' },
  { id: 'diamonds', name: 'Diamonds' },
  { id: 'circles', name: 'Circles' },
  { id: 'confetti', name: 'Confetti' },
]

export default function BackgroundsPanel() {
  const currentPageIndex = useEditorStore(state => state.currentPageIndex)
  const pages = useEditorStore(state => state.pages)
  const setPageBackground = useEditorStore(state => state.setPageBackground)
  
  const currentPage = pages[currentPageIndex]
  const currentBg = currentPage?.backgroundColor || '#FFFFFF'
  
  // Extract unique colors used in project
  const usedColors = Array.from(new Set(pages.map(p => p.backgroundColor)))

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h3 className="font-bold text-sm">Backgrounds</h3>
      
      {/* Used in Project */}
      {usedColors.length > 0 && (
        <div>
          <h4 className="text-xs text-gray-500 mb-2">Used in Project</h4>
          <div className="flex flex-wrap gap-2">
            {usedColors.map((color) => (
              <button
                key={color}
                onClick={() => setPageBackground(currentPageIndex, color)}
                className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform ${
                  currentBg === color ? 'ring-2 ring-black ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Colors */}
      <div>
        <h4 className="text-xs text-gray-500 mb-2">Colors</h4>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setPageBackground(currentPageIndex, color)}
              className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform ${
                currentBg === color ? 'ring-2 ring-black ring-offset-2' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
      
      {/* Patterns */}
      <div>
        <h4 className="text-xs text-gray-500 mb-2">Patterns</h4>
        <div className="grid grid-cols-3 gap-2">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => {
                // TODO: Implement pattern setting
                console.log('Set pattern:', pattern.id)
              }}
              className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <span className="text-[10px] text-gray-600 text-center">{pattern.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
